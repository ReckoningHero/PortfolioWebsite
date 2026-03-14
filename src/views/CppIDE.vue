<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import HoverTabs from '@/components/common/HoverTabs.vue'
import CommentSection from '@/components/common/CommentSection.vue'

const code = ref(`#include <iostream>
int main() {
    std::cout << "Hello, World!";
    return 0;
}`)

const stdinText = ref("")
const isRunning = ref(false)
const result = ref(null)
const error = ref("")

// Piston API base
const API_BASE = ref(localStorage.getItem('piston-api-url') || 'https://emkc.org/api/v2/piston')
const API_KEY = ref(localStorage.getItem('piston-api-key') || '')
const EXEC_ENGINE = ref(localStorage.getItem('exec-engine') || 'wandbox') // Default to working Wandbox engine

// Cache the latest available C++ version from runtimes
const cppVersion = ref(null)

async function resolveCppVersion() {
  if (EXEC_ENGINE.value === 'wandbox') {
    return 'gcc-head' // Default for Wandbox
  }
  if (cppVersion.value) return cppVersion.value
  try {
    const res = await fetch(`${API_BASE.value}/runtimes`)
    if (!res.ok) throw new Error('Failed to fetch runtimes')
    const runtimes = await res.json()
    // Piston may expose language id as 'cpp' or 'c++' depending on runtime
    const langs = runtimes.filter(r => r.language === 'cpp' || r.language === 'c++')
    if (langs.length) {
      // Pick the highest version
      const sorted = [...langs].sort((a, b) => {
        const vA = (a.version || (a.versions ? a.versions.slice(-1)[0] : '0.0.0')).split(/[\.-]/).map(v => isNaN(v) ? v : Number(v))
        const vB = (b.version || (b.versions ? b.versions.slice(-1)[0] : '0.0.0')).split(/[\.-]/).map(v => isNaN(v) ? v : Number(v))
        for (let i = 0; i < Math.max(vA.length, vB.length); i++) {
          const partA = vA[i] ?? -1
          const partB = vB[i] ?? -1
          if (typeof partA === 'number' && typeof partB === 'number') {
            if (partA > partB) return -1
            if (partA < partB) return 1
          } else {
            if (String(partA) > String(partB)) return -1
            if (String(partA) < String(partB)) return 1
          }
        }
        return 0
      })
      const best = sorted[0]
      cppVersion.value = best.version || (best.versions ? best.versions.slice(-1)[0] : null)
    }
  } catch (_) {
    // Fallback to a commonly available version if runtime discovery fails
    cppVersion.value = '10.2.0'
  }
  return cppVersion.value
}

async function runCode() {
  isRunning.value = true
  error.value = ""
  result.value = null
  try {
    const version = await resolveCppVersion()

    if (EXEC_ENGINE.value === 'wandbox') {
      const res = await fetch('https://wandbox.org/api/compile.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          compiler: version, // e.g. 'gcc-head'
          code: code.value,
          stdin: stdinText.value,
          save: false
        })
      })
      if (!res.ok) throw new Error(`Wandbox API error: ${res.status} ${res.statusText}`)
      const data = await res.json()
      // Map Wandbox result to similar format as Piston for UI compatibility
      result.value = {
        run: {
          stdout: data.program_output,
          stderr: data.program_error,
          code: parseInt(data.status) || 0,
          signal: data.signal
        },
        compile: {
          stderr: data.compiler_error || data.compiler_message,
          code: (data.compiler_error) ? 1 : 0
        }
      }
      return
    }

    // Piston execution flow
    const headers = { 'Content-Type': 'application/json' }
    if (API_KEY.value) {
      headers['Authorization'] = API_KEY.value
    }

    const res = await fetch(`${API_BASE.value}/execute`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        language: 'cpp',
        version,
        files: [{ name: 'main.cpp', content: code.value }],
        stdin: stdinText.value,
      })
    })
    if (!res.ok) {
      // Try to surface API-provided error details
      try {
        const errJson = await res.json()
        let msg = errJson?.message || errJson?.error || JSON.stringify(errJson)
        
        if (res.status === 401 && API_BASE.value.includes('emkc.org')) {
          msg = "The public Piston API is now whitelist-only (as of Feb 2026). Please provide a custom Piston URL or API Key in the settings below, or contact the site owner to request whitelisting. Alternatively, switch to the Wandbox engine."
        }
        
        throw new Error(`Execution API error: ${res.status} ${res.statusText}${msg ? ' — ' + msg : ''}`)
      } catch (inner) {
        if (inner instanceof Error && inner.message.includes("whitelist-only")) throw inner
        const txt = await res.text().catch(() => '')
        throw new Error(`Execution API error: ${res.status} ${res.statusText}${txt ? ' — ' + txt : ''}`)
      }
    }
    const data = await res.json()
    result.value = data
  } catch (e) {
    error.value = e?.message || String(e)
  } finally {
    isRunning.value = false
  }
}

function saveSettings() {
  localStorage.setItem('piston-api-url', API_BASE.value)
  localStorage.setItem('piston-api-key', API_KEY.value)
  localStorage.setItem('exec-engine', EXEC_ENGINE.value)
  cppVersion.value = null // Reset cached version to re-fetch from new URL/engine
  alert('Settings saved!')
}

// ----- Simple local comment system -----
// Logic moved to CommentSection.vue component

// ----- Tabs for C++ IDE sections -----
const ideTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'features', label: 'Features' },
  { id: 'examples', label: 'Examples' },
  { id: 'howto', label: 'How to Run' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'settings', label: 'Settings' },
]
// ----- Animated expanding panels (for the tab sections) -----
const currentTabId = ref('overview')
const panelContainer = ref(null)
const panelHeight = ref('auto')

function measureActivePanelHeight() {
  nextTick(() => {
    const wrap = panelContainer.value
    if (!wrap) return
    // Select the currently active panel by id
    const active = wrap.querySelector(`#panel-${currentTabId.value}`)
    if (!active) return
    // Temporarily ensure it's measurable (v-show keeps it display:block only when active)
    // If somehow not visible yet, schedule another tick
    const h = active.scrollHeight
    if (h > 0) {
      panelHeight.value = `${h}px`
    } else {
      // try again next frame
      requestAnimationFrame(() => {
        const h2 = active.scrollHeight
        if (h2 > 0) panelHeight.value = `${h2}px`
      })
    }
  })
}

function onTabChange(id) {
  currentTabId.value = id
  measureActivePanelHeight()
}

function onResize() {
  measureActivePanelHeight()
}

onMounted(() => {
  // Initialize height after mount
  measureActivePanelHeight()
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <div class="container mx-auto lg:px-[5em] px-[2em] py-10">
    <h1 class="text-[28px] lg:text-[36px] font-atyp-display font-medium mb-3">C++ IDE (Online Compiler)</h1>
    <p class="text-white/70 mb-6">Write and run C++ directly in your browser. Powered by <strong>Wandbox</strong> (default) or <strong>Piston</strong>. <strong>Note:</strong> If you use Piston, the public API is now restricted; you may need to provide a custom endpoint in Settings.</p>

    <!-- Hover Tabs like the reference site -->
    <HoverTabs :tabs="ideTabs" initial-id="overview" @change="onTabChange">
      <template #default="{ activeId }">
        <!-- Animated height wrapper to create a smooth 'drag down' expansion -->
        <div
          ref="panelContainer"
          class="overflow-hidden transition-[height] duration-300 ease-out"
          :style="{ height: panelHeight }"
        >
        <section
          :id="`panel-${'overview'}`"
          role="tabpanel"
          :aria-labelledby="`tab-${'overview'}`"
          v-show="activeId === 'overview'"
          class="rounded-md border border-white/10 bg-[#0b1520] p-5"
        >
          <h2 class="text-[20px] lg:text-[22px] font-atyp-display font-medium mb-2 text-[#CCF303]">Overview</h2>
          <p class="text-white/80">This page lets you edit and execute small C++ programs. By default, it uses the <strong>Wandbox API</strong> which is open and free. You can also switch to the <strong>Piston API</strong> in settings if you have a private instance or an API key.</p>
          <p class="text-white/60 mt-2">Hover the tabs above to preview different sections. The container will smoothly expand to fit the content, pushing the layout down like the example site.</p>
        </section>

        <section
          :id="`panel-${'features'}`"
          role="tabpanel"
          :aria-labelledby="`tab-${'features'}`"
          v-show="activeId === 'features'"
          class="rounded-md border border-white/10 bg-[#0b1520] p-5"
        >
          <h2 class="text-[20px] lg:text-[22px] font-atyp-display font-medium mb-2 text-[#CCF303]">Features</h2>
          <ul class="list-disc pl-5 space-y-1 text-white/80">
            <li>Run C++ code with optional stdin input</li>
            <li>Shows stdout, stderr, and compile errors separately</li>
            <li>Latest available runtime auto-detected via Piston API</li>
            <li>Local-only comments section (saved to your device)</li>
            <li>Responsive design for both desktop and mobile coding</li>
            <li>Optimized for quick prototyping and algorithm testing</li>
          </ul>
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-4">
            <div class="bg-[#081019] border border-white/10 rounded p-3">
              <div class="text-[#CCF303] font-atyp-display mb-1">Quick Run</div>
              <p class="text-white/70 text-sm">Execute small snippets instantly.</p>
            </div>
            <div class="bg-[#081019] border border-white/10 rounded p-3">
              <div class="text-[#CCF303] font-atyp-display mb-1">Inputs</div>
              <p class="text-white/70 text-sm">Provide stdin for interactive programs.</p>
            </div>
            <div class="bg-[#081019] border border-white/10 rounded p-3">
              <div class="text-[#CCF303] font-atyp-display mb-1">Outputs</div>
              <p class="text-white/70 text-sm">View stdout, stderr and compile logs.</p>
            </div>
          </div>
        </section>

        <section
          :id="`panel-${'examples'}`"
          role="tabpanel"
          :aria-labelledby="`tab-${'examples'}`"
          v-show="activeId === 'examples'"
          class="rounded-md border border-white/10 bg-[#0b1520] p-5"
        >
          <h2 class="text-[20px] lg:text-[22px] font-atyp-display font-medium mb-3 text-[#CCF303]">Examples</h2>
          <div class="space-y-4 text-white/80">
            <div>
              <div class="font-atyp-display font-medium mb-1">Echo stdin</div>
              <pre class="bg-[#081019] border border-white/10 rounded p-3 text-sm overflow-x-auto" v-pre><code>#include &lt;iostream&gt;
using namespace std;
int main(){
    string s; getline(cin, s);
    cout &lt;&lt; "You typed: " &lt;&lt; s &lt;&lt; "\n";
}</code></pre>
            </div>
            <div>
              <div class="font-atyp-display font-medium mb-1">Loop and sum</div>
              <pre class="bg-[#081019] border border-white/10 rounded p-3 text-sm overflow-x-auto" v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;
int main(){
    long long n, x, sum=0; cin&gt;&gt;n; while(n-- &amp;&amp; cin&gt;&gt;x) sum+=x; cout&lt;&lt;sum&lt;&lt;"\n";
}</code></pre>
            </div>
          </div>
        </section>

        <section
          :id="`panel-${'howto'}`"
          role="tabpanel"
          :aria-labelledby="`tab-${'howto'}`"
          v-show="activeId === 'howto'"
          class="rounded-md border border-white/10 bg-[#0b1520] p-5"
        >
          <h2 class="text-[20px] lg:text-[22px] font-atyp-display font-medium mb-2 text-[#CCF303]">How to run</h2>
          <ol class="list-decimal pl-5 space-y-1 text-white/80">
            <li>Write or paste your code in the editor below.</li>
            <li>Optionally add input in the “Standard Input (stdin)” box.</li>
            <li>Click Run. Output appears on the right.</li>
          </ol>
          <p class="text-white/60 mt-2 text-sm">Note: Execution time and memory are limited. Avoid long-running programs.</p>
          <div class="mt-4 bg-[#081019] border border-white/10 rounded p-3 text-white/70 text-sm">
            Tip: Try the "Echo stdin" example above, type something into the stdin box, then hit Run.
          </div>
        </section>

        <section
          :id="`panel-${'roadmap'}`"
          role="tabpanel"
          :aria-labelledby="`tab-${'roadmap'}`"
          v-show="activeId === 'roadmap'"
          class="rounded-md border border-white/10 bg-[#0b1520] p-5"
        >
          <h2 class="text-[20px] lg:text-[22px] font-atyp-display font-medium mb-2 text-[#CCF303]">Roadmap</h2>
          <ul class="list-disc pl-5 space-y-1 text-white/80">
            <li>Syntax highlighting and basic lint hints</li>
            <li>Save/share gists of code snippets</li>
            <li>Multiple files support</li>
          </ul>
        </section>

        <section
          :id="`panel-${'settings'}`"
          role="tabpanel"
          :aria-labelledby="`tab-${'settings'}`"
          v-show="activeId === 'settings'"
          class="rounded-md border border-white/10 bg-[#0b1520] p-5"
        >
          <h2 class="text-[20px] lg:text-[22px] font-atyp-display font-medium mb-3 text-[#CCF303]">API Settings</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm uppercase tracking-wide text-white/60 mb-2">Execution Engine</label>
              <select v-model="EXEC_ENGINE" class="w-full rounded-md bg-[#081019] text-white p-3 font-mono text-sm outline-none border border-white/10 focus:border-[#CCF303]">
                <option value="wandbox">Wandbox (Recommended - Free & Open)</option>
                <option value="piston">Piston (Custom instance or whitelisted)</option>
              </select>
            </div>
            <div v-if="EXEC_ENGINE === 'piston'">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm uppercase tracking-wide text-white/60 mb-2">Piston API URL</label>
                  <input v-model="API_BASE" type="text" class="w-full rounded-md bg-[#081019] text-white p-3 font-mono text-sm outline-none border border-white/10 focus:border-[#CCF303]" placeholder="https://emkc.org/api/v2/piston" />
                  <p class="text-white/40 text-xs mt-1">Default: emkc.org (Public API). You can use your own self-hosted Piston instance.</p>
                </div>
                <div>
                  <label class="block text-sm uppercase tracking-wide text-white/60 mb-2">API Key / Authorization (Optional)</label>
                  <input v-model="API_KEY" type="password" class="w-full rounded-md bg-[#081019] text-white p-3 font-mono text-sm outline-none border border-white/10 focus:border-[#CCF303]" placeholder="Your API Key" />
                  <p class="text-white/40 text-xs mt-1">Only required if your Piston instance requires an Authorization header.</p>
                </div>
              </div>
            </div>
            <button @click="saveSettings" class="bg-[#CCF303] text-black font-atyp-display font-medium px-5 py-2 rounded">
              Save Settings
            </button>
          </div>
        </section>
        </div>
      </template>
    </HoverTabs>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      <div>
        <label class="block text-sm uppercase tracking-wide text-white/60 mb-2">Code (main.cpp)</label>
        <textarea v-model="code" class="w-full h-[360px] rounded-md bg-[#0b1520] text-white p-4 font-mono text-sm outline-none border border-white/10 focus:border-[#CCF303]" spellcheck="false"></textarea>

        <div class="mt-4">
          <label class="block text-sm uppercase tracking-wide text-white/60 mb-2">Standard Input (stdin)</label>
          <textarea v-model="stdinText" class="w-full h-[90px] rounded-md bg-[#0b1520] text-white p-3 font-mono text-sm outline-none border border-white/10 focus:border-[#CCF303]"></textarea>
        </div>

        <div class="mt-4 flex gap-3">
          <button @click="runCode" :disabled="isRunning" class="bg-[#CCF303] text-black font-atyp-display font-medium px-5 py-2 rounded disabled:opacity-60">
            {{ isRunning ? 'Running…' : 'Run' }}
          </button>
          <button @click="() => { result=null; error=''; }" class="border border-white/15 text-white px-4 py-2 rounded">Clear Output</button>
        </div>
      </div>

      <div>
        <label class="block text-sm uppercase tracking-wide text-white/60 mb-2">Output</label>
        <div class="w-full min-h-[360px] rounded-md bg-[#0b1520] text-white p-4 font-mono text-sm border border-white/10">
          <div v-if="error" class="text-red-400">{{ error }}</div>
          <template v-else-if="result">
            <div v-if="result?.compile?.code !== 0" class="mb-3">
              <div class="text-red-400 font-semibold">Compilation Error (code {{ result.compile.code }})</div>
              <pre class="whitespace-pre-wrap">{{ (result.compile?.stderr || '').trim() }}</pre>
            </div>
            <div v-else>
              <div class="text-green-400 font-semibold mb-2">Run Finished (exit {{ result.run?.code }})</div>
              <div v-if="(result.run?.stdout || '').trim()">
                <div class="text-white/70">stdout</div>
                <pre class="whitespace-pre-wrap">{{ (result.run.stdout || '').trim() }}</pre>
              </div>
              <div v-if="(result.run?.stderr || '').trim()" class="mt-3">
                <div class="text-white/70">stderr</div>
                <pre class="whitespace-pre-wrap text-red-300">{{ (result.run.stderr || '').trim() }}</pre>
              </div>
            </div>
          </template>
          <div v-else class="text-white/50">No output yet. Click Run to execute your program.</div>
        </div>
      </div>
    </div>

    <!-- Comments Section -->
    <CommentSection slug="cpp-ide" />
  </div>
</template>

<style scoped>
</style>
