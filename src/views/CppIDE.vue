<script setup>
import { ref, onMounted } from 'vue'

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
      // Pick the last version (usually latest)
      cppVersion.value = langs[0].version || (langs[0].versions ? langs[0].versions.slice(-1)[0] : null)
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
</script>

<template>
  <div class="container mx-auto lg:px-[5em] px-[2em] py-10">
    <h1 class="text-[28px] lg:text-[36px] font-atyp-display font-medium mb-6">C++ IDE (Online Compiler)</h1>
    <p class="text-white/70 mb-8">Write and run C++ directly in your browser. This uses the public Piston execution API. Avoid sensitive code; execution is sandboxed and time-limited.</p>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
          <button @click="() => { result.value=null; error.value=''; }" class="border border-white/15 text-white px-4 py-2 rounded">Clear Output</button>
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
