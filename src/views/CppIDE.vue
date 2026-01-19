<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import HoverTabs from '@/components/common/HoverTabs.vue'

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
const API_BASE = 'https://emkc.org/api/v2/piston'

// Cache the latest available C++ version from runtimes
const cppVersion = ref(null)

async function resolveCppVersion() {
  if (cppVersion.value) return cppVersion.value
  try {
    const res = await fetch(`${API_BASE}/runtimes`)
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
    // Ensure we have a version to avoid 400 from API
    const version = await resolveCppVersion()
    const res = await fetch(`${API_BASE}/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
        const msg = errJson?.message || errJson?.error || JSON.stringify(errJson)
        throw new Error(`Execution API error: ${res.status} ${res.statusText}${msg ? ' — ' + msg : ''}`)
      } catch {
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

// ----- Simple local comment system (localStorage only) -----
const COMMENTS_STORAGE_KEY = 'comments:/cpp-ide'
const comments = ref([])
const commenterName = ref('')
const commentBody = ref('')

onMounted(() => {
  try {
    const raw = localStorage.getItem(COMMENTS_STORAGE_KEY)
    comments.value = raw ? JSON.parse(raw) : []
  } catch (_) {
    comments.value = []
  }
})

function persistComments() {
  try { localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(comments.value)) } catch (_) {}
}

function addComment() {
  const name = (commenterName.value || 'Anonymous').trim()
  const body = (commentBody.value || '').trim()
  if (!body) return
  const now = new Date()
  comments.value.unshift({
    id: `${now.getTime()}-${Math.random().toString(36).slice(2,8)}`,
    name,
    body,
    createdAt: now.toISOString(),
  })
  commenterName.value = ''
  commentBody.value = ''
  persistComments()
}

function deleteComment(id) {
  const idx = comments.value.findIndex(c => c.id === id)
  if (idx !== -1) {
    comments.value.splice(idx, 1)
    persistComments()
  }
}

// ----- Tabs for C++ IDE sections -----
const ideTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'features', label: 'Features' },
  { id: 'examples', label: 'Examples' },
  { id: 'howto', label: 'How to Run' },
  { id: 'roadmap', label: 'Roadmap' },
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
    <p class="text-white/70 mb-6">Write and run C++ directly in your browser. This uses the public Piston execution API. Avoid sensitive code; execution is sandboxed and time-limited.</p>

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
          <p class="text-white/80">This page lets you edit and execute small C++ programs without setting up a local toolchain. It’s powered by the open Piston API and runs your code in a sandbox with limited resources. Great for quick tests, learning, or sharing snippets.</p>
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
            <li>Latest available runtime auto-detected</li>
            <li>Local-only comments section (saved to your device)</li>
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

    <!-- Comments Section (local-only) -->
    <div class="mt-12">
      <h2 class="text-[22px] lg:text-[26px] font-atyp-display font-medium mb-4">Comments</h2>

      <!-- New comment form -->
      <div class="rounded-md border border-white/10 bg-[#0b1520] p-4 mb-6">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-3">
          <input v-model="commenterName" placeholder="Your name (optional)" class="w-full rounded-md bg-[#081019] text-white px-3 py-2 text-sm outline-none border border-white/10 focus:border-[#CCF303] lg:col-span-1" />
          <div class="lg:col-span-2">
            <textarea v-model="commentBody" placeholder="Write a comment..." rows="3" class="w-full rounded-md bg-[#081019] text-white px-3 py-2 text-sm outline-none border border-white/10 focus:border-[#CCF303]"></textarea>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <button @click="addComment" class="bg-[#CCF303] text-black font-atyp-display font-medium px-4 py-2 rounded">Post Comment</button>
          <span class="text-xs text-white/50">Comments are saved only on this device (localStorage).</span>
        </div>
      </div>

      <!-- Comments list -->
      <div v-if="comments.length" class="space-y-3">
        <div v-for="c in comments" :key="c.id" class="rounded-md border border-white/10 bg-[#0b1520] p-4">
          <div class="flex items-center justify-between mb-2">
            <div class="text-white/80 text-sm">
              <span class="font-atyp-display font-medium">{{ c.name || 'Anonymous' }}</span>
              <span class="text-white/40"> • {{ new Date(c.createdAt).toLocaleString() }}</span>
            </div>
            <button @click="deleteComment(c.id)" class="text-white/50 hover:text-white/80 text-xs border border-white/15 px-2 py-1 rounded">Delete</button>
          </div>
          <pre class="whitespace-pre-wrap text-white/90 text-sm">{{ c.body }}</pre>
        </div>
      </div>
      <div v-else class="text-white/50">No comments yet. Be the first to share your thoughts.</div>
    </div>
  </div>
</template>

<style scoped>
</style>
