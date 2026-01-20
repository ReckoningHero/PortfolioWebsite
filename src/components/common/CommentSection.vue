<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  slug: {
    type: String,
    required: true
  }
})

const comments = ref([])
const commenterName = ref('')
const commentBody = ref('')
const attachments = ref([])
const fileInput = ref(null)

onMounted(() => {
  // Comments are now in-memory only and reset on page refresh
  comments.value = []
})

function addComment() {
  const name = (commenterName.value || 'Anonymous').trim()
  const body = (commentBody.value || '').trim()
  if (!body && attachments.value.length === 0) return

  const now = new Date()
  const newComment = {
    id: `${now.getTime()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    body,
    attachments: [...attachments.value],
    createdAt: now.toISOString(),
  }

  comments.value.unshift(newComment)

  commenterName.value = ''
  commentBody.value = ''
  attachments.value = []
  if (fileInput.value) fileInput.value.value = ''
}

function handleFileUpload(event) {
  const files = event.target.files
  if (!files) return

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    
    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      alert(`File ${file.name} is not an image.`)
      continue
    }

    if (file.size > 1.5 * 1024 * 1024) {
      alert(`File ${file.name} is too large. Max size is 1.5MB.`)
      continue
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      attachments.value.push({
        name: file.name,
        type: file.type,
        data: e.target.result
      })
    }
    reader.onerror = () => {
      alert(`Failed to read file: ${file.name}`)
    }
    reader.readAsDataURL(file)
  }
}

function removeAttachment(index) {
  attachments.value.splice(index, 1)
}

function deleteComment(id) {
  const idx = comments.value.findIndex(c => c.id === id)
  if (idx !== -1) {
    comments.value.splice(idx, 1)
  }
}
</script>

<template>
  <div class="mt-12 font-atyp-display">
    <h2 class="text-[22px] lg:text-[26px] font-medium mb-4 text-white">Comments</h2>

    <!-- New comment form -->
    <div class="rounded-md border border-white/10 bg-[#0b1520] p-4 mb-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-3">
        <input 
          v-model="commenterName" 
          placeholder="Your name (optional)" 
          class="w-full rounded-md bg-[#081019] text-white px-3 py-2 text-sm outline-none border border-white/10 focus:border-[#CCF303] lg:col-span-1" 
        />
        <div class="lg:col-span-2">
          <textarea 
            v-model="commentBody" 
            placeholder="Write a comment..." 
            rows="3" 
            class="w-full rounded-md bg-[#081019] text-white px-3 py-2 text-sm outline-none border border-white/10 focus:border-[#CCF303]"
          ></textarea>
        </div>
      </div>
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <button 
            @click="addComment" 
            class="bg-[#CCF303] text-black font-medium px-4 py-2 rounded hover:bg-[#b8da02] transition-colors"
          >
            Post Comment
          </button>
          
          <label class="cursor-pointer flex items-center gap-2 bg-white/5 border border-white/10 hover:border-white/20 text-white/70 px-3 py-2 rounded text-sm transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
            <span>Attach</span>
            <input 
              ref="fileInput"
              type="file" 
              multiple 
              accept="image/png, image/jpeg, image/gif, image/webp" 
              class="hidden" 
              @change="handleFileUpload"
            />
          </label>
        </div>
        <span class="text-[10px] text-white/40 italic">Note: Max 1.5MB per file. In-memory storage.</span>
      </div>

      <!-- Attachment previews -->
      <div v-if="attachments.length" class="mt-4 flex flex-wrap gap-3">
        <div v-for="(file, index) in attachments" :key="index" class="relative group">
          <img 
            :src="file.data" 
            class="w-20 h-20 object-cover rounded border border-white/10"
            :alt="file.name"
          />
          <button 
            @click="removeAttachment(index)"
            class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
          >
            ✕
          </button>
        </div>
      </div>
    </div>

    <!-- Comments list -->
    <div v-if="comments.length" class="space-y-4">
      <div v-for="c in comments" :key="c.id" class="rounded-md border border-white/10 bg-[#0b1520] p-4 transition-all hover:border-white/20">
        <div class="flex items-center justify-between mb-2">
          <div class="text-white/80 text-sm">
            <span class="font-medium text-[#CCF303]">{{ c.name || 'Anonymous' }}</span>
            <span class="text-white/40 text-xs ml-2">{{ new Date(c.createdAt).toLocaleString() }}</span>
          </div>
          <button 
            @click="deleteComment(c.id)" 
            class="text-white/30 hover:text-red-400 text-[10px] border border-white/10 px-2 py-1 rounded transition-colors"
          >
            Delete
          </button>
        </div>
        <p class="whitespace-pre-wrap text-white/90 text-sm leading-relaxed mb-3">{{ c.body }}</p>
        
        <!-- Comment attachments -->
        <div v-if="c.attachments && c.attachments.length" class="flex flex-wrap gap-4 mt-4">
          <div v-for="(file, index) in c.attachments" :key="index" class="relative group">
            <a :href="file.data" target="_blank" class="block">
              <img 
                :src="file.data" 
                class="max-w-full lg:max-w-[400px] h-auto rounded-lg border border-white/10 group-hover:border-[#CCF303]/50 transition-all cursor-zoom-in shadow-lg"
                :alt="file.name"
              />
              <div v-if="file.type === 'image/gif'" class="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                GIF
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-white/40 text-center py-8 border border-dashed border-white/10 rounded-md">
      No comments yet. Be the first to share your thoughts!
    </div>
  </div>
</template>

<style scoped>
/* Scoped styles if needed */
</style>
