<script setup>
import { ref, nextTick, onMounted } from 'vue'
import gsap from 'gsap'

const isOpen = ref(false)
const isTyping = ref(false)
const provider = ref(localStorage.getItem('ai_provider') || 'ollama') // 'ollama' or 'openai'
const ollamaUrl = ref(localStorage.getItem('ollama_url') || 'http://localhost:11434')
const modelName = ref(localStorage.getItem('ollama_model') || 'Meta-Llama-3.1-8B-Instruct-Q4_K_M')
const apiKey = ref(localStorage.getItem('openai_api_key') || '')
const apiModel = ref(localStorage.getItem('openai_model') || 'gpt-4o-mini')
const apiEndpoint = ref(localStorage.getItem('openai_endpoint') || 'https://api.openai.com/v1/chat/completions')
const availableModels = ref([])
const isSettingsOpen = ref(false)
const isOnline = ref(false)

const saveSettings = () => {
  localStorage.setItem('ai_provider', provider.value)
  localStorage.setItem('ollama_model', modelName.value)
  localStorage.setItem('ollama_url', ollamaUrl.value)
  localStorage.setItem('openai_api_key', apiKey.value)
  localStorage.setItem('openai_model', apiModel.value)
  localStorage.setItem('openai_endpoint', apiEndpoint.value)
  isSettingsOpen.value = false
  checkConnection()
}

const message = ref('')
const chatHistory = ref([
  { role: 'bot', text: 'Hello! I am Josh\'s AI assistant. How can I help you today?' }
])
const chatContainer = ref(null)

const clearChat = () => {
  chatHistory.value = [
    { role: 'bot', text: 'Chat cleared. How else can I help you today?' }
  ]
}

const suggestions = [
  "Tell me about Josh's skills",
  "What projects has he worked on?",
  "How can I contact him?",
  "Show me his resume"
]

const toggleChat = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    nextTick(() => {
      scrollToBottom()
      const win = document.querySelector(".chat-window")
      if (win) {
        gsap.fromTo(win, 
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
        )
      }
    })
  }
}

const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

const handleSuggestion = (text) => {
  message.value = text
  sendMessage()
}

const formatText = (text) => {
  if (!text) return ''
  
  // Basic markdown-ish formatting
  let formatted = text
  
  // Headers
  formatted = formatted.replace(/^### (.*$)/gim, '<h3 class="text-gray-900 font-bold mt-2 mb-1">$1</h3>')
  formatted = formatted.replace(/^## (.*$)/gim, '<h2 class="text-gray-900 font-bold mt-3 mb-1 text-base">$1</h2>')
  
  // Bold
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 font-bold">$1</strong>')
  
  // Lists
  formatted = formatted.replace(/^\s*[\-\*] (.*)/gm, '<li class="ml-4 list-disc">$1</li>')
  
  // Wrap consecutive <li> tags in <ul>
  formatted = formatted.replace(/((?:<li.*<\/li>)+)/g, '<ul class="my-2">$1</ul>')
  
  // Inline code
  formatted = formatted.replace(/`(.*?)`/g, '<code class="bg-gray-200 px-1 rounded text-gray-800 text-xs font-mono font-bold">$1</code>')
  
  // Code blocks (multiline)
  formatted = formatted.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre class="bg-gray-100 p-3 rounded-lg my-2 overflow-x-auto text-xs font-mono border border-gray-200 text-gray-700"><code>${code.trim()}</code></pre>`
  })

  // Links
  formatted = formatted.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-red-500 underline hover:text-red-700 transition-colors">$1</a>')
  
  // Newlines (if not inside list or pre)
  formatted = formatted.replace(/\n(?!<li|<pre|<\/pre|<\/li)/g, '<br>')
  
  return formatted
}

onMounted(() => {
  checkConnection()
})

const checkConnection = async () => {
  if (provider.value === 'ollama') {
    try {
      const response = await fetch(`${ollamaUrl.value}/api/tags`)
      if (response.ok) {
        const data = await response.json()
        availableModels.value = data.models || []
        const hasModel = availableModels.value.some(m => 
          m.name === modelName.value || 
          m.name === `${modelName.value}:latest` ||
          m.name.includes(modelName.value)
        )
        isOnline.value = hasModel
      } else {
        isOnline.value = false
      }
    } catch (e) {
      isOnline.value = false
      availableModels.value = []
    }
  } else {
    // Basic check for OpenAI: we assume it's "online" if an API Key is present, 
    // or we could do a lightweight model fetch. For now, key presence is enough.
    isOnline.value = !!apiKey.value
  }
}

const sendMessage = async () => {
  if (!message.value.trim() || isTyping.value) return

  const userText = message.value
  chatHistory.value.push({ role: 'user', text: userText })
  message.value = ''

  await nextTick()
  scrollToBottom()

  isTyping.value = true
  await nextTick()
  scrollToBottom()

  try {
    const systemMessage = { 
      role: 'system', 
      content: `You are Josh's AI Assistant, a high-end AI.
      Josh is a Senior Gameplay Engineer specializing in C++, Unreal Engine, and Unity.

      CORE GUIDELINES:
      1. PERSONA: Professional, technical, yet helpful and enthusiastic about Josh's work.
      2. FORMATTING: ALWAYS use Markdown. Use \`code\` for technical terms, **bold** for emphasis, and structured lists for multiple points.
      3. PROJECTS: When discussing projects, emphasize the technical "why" and "how" (e.g., performance optimizations, system architecture).
      4. ACCURACY: If you don't know a specific detail, offer to let the user contact Josh directly.

      TECHNICAL BACKGROUND:
      - Shipped Titles: 'Horizon Worlds' (Meta) and 'Ghosts of Tabor'.
      - Meta (Horizon Worlds): Engineered NPC behavior tools (C++), dialogue systems, and optimized component pooling for performance.
      - Combat Waffle (Ghosts of Tabor): Online subsystems integration (AWS/Azure), VR survival mechanics, and Steam Web API implementation.
      - Expertise: C++, UE4/UE5, Unity, C#, .NET, Azure PlayFab, AWS, VR Development, AI (FSMs/Behavior Trees), Networking.
      - Recent Work: 'CyberWar' (C++ TPS), 'INFOVISIONVERSE' (VR Unity), 'Pack-Mask' (GGJ 2026), 'Two Worlds' (C++).
      - Custom Tools: Built a custom browser-based C++ IDE (available on this site) to demonstrate low-level systems knowledge.

      Josh is currently open to new opportunities in Gameplay Engineering and Systems Programming.` 
    }

    const messages = [
      systemMessage,
      ...chatHistory.value.map(msg => ({
        role: msg.role === 'bot' ? 'assistant' : 'user',
        content: msg.text
      }))
    ]

    if (provider.value === 'ollama') {
      const response = await fetch(`${ollamaUrl.value}/api/chat`, {
        method: 'POST',
        body: JSON.stringify({
          model: modelName.value,
          messages: messages,
          stream: true
        }),
      })

      if (response.ok) {
        isTyping.value = false
        isOnline.value = true
        
        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        const newMsg = { role: 'bot', text: '' }
        chatHistory.value.push(newMsg)

        let buffer = ''
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop()

          for (const line of lines) {
            if (!line.trim()) continue
            try {
              const json = JSON.parse(line)
              if (json.message && json.message.content) {
                newMsg.text += json.message.content
                await nextTick()
                scrollToBottom()
              }
            } catch (e) {
              console.warn("[DEBUG_LOG] Error parsing JSON chunk:", e)
            }
          }
        }
        if (buffer.trim()) {
          try {
            const json = JSON.parse(buffer)
            if (json.message && json.message.content) {
              newMsg.text += json.message.content
              await nextTick()
              scrollToBottom()
            }
          } catch (e) {}
        }
      } else {
        throw new Error(`Local LLM responded with status: ${response.status}`)
      }
    } else {
      // OpenAI-compatible API call
      const response = await fetch(apiEndpoint.value, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey.value}`
        },
        body: JSON.stringify({
          model: apiModel.value,
          messages: messages,
          stream: true
        })
      })

      if (response.ok) {
        isTyping.value = false
        isOnline.value = true
        
        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        const newMsg = { role: 'bot', text: '' }
        chatHistory.value.push(newMsg)

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split('\n')
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              if (data === '[DONE]') break
              try {
                const json = JSON.parse(data)
                const content = json.choices[0]?.delta?.content || ''
                if (content) {
                  newMsg.text += content
                  await nextTick()
                  scrollToBottom()
                }
              } catch (e) {}
            }
          }
        }
      } else {
        const errData = await response.json().catch(() => ({}))
        throw new Error(errData.error?.message || `API responded with status: ${response.status}`)
      }
    }
  } catch (error) {
    isOnline.value = false
    isTyping.value = false
    console.error("[DEBUG_LOG] LLM Error:", error)
    
    let errorMessage = ""
    if (provider.value === 'ollama') {
      errorMessage = `I'm sorry, I'm unable to connect to the local **${modelName.value}** model at \`${ollamaUrl.value}\`.`
      if (availableModels.value.length > 0) {
        const modelList = availableModels.value.map(m => `\`${m.name}\``).join(', ')
        errorMessage += `\n\n**Action Required:** I found these models available on your server: ${modelList}. Please select one in the settings or update your configuration.`
      } else {
        errorMessage += `\n\n**Ollama Connection Guide:**\n1. Ensure **Ollama** is installed and running.\n2. Allow website access: \`OLLAMA_ORIGINS="*" ollama serve\`\n3. Check if the API URL in settings is correct.`
      }
    } else {
      errorMessage = `I'm sorry, I'm unable to connect to the **${apiModel.value}** API.\n\n**Error:** ${error.message}\n\n**Troubleshooting:**\n1. Ensure your API Key is correct in settings.\n2. Check your internet connection.\n3. Verify the API endpoint and model name.`
    }
    
    await streamResponse(errorMessage)
  }
}

const streamResponse = async (fullText) => {
  const newMsg = { role: 'bot', text: '' }
  chatHistory.value.push(newMsg)
  
  const words = fullText.split(' ')
  for (let i = 0; i < words.length; i++) {
    newMsg.text += (i === 0 ? '' : ' ') + words[i]
    await new Promise(resolve => setTimeout(resolve, 30 + Math.random() * 40)) // Varied speed for "natural" feel
    scrollToBottom()
  }
}
</script>

<template>
  <div class="fixed bottom-6 right-6 z-50 font-atyp-display">
    <transition name="chat-fade">
      <div v-if="isOpen" class="chat-window mb-4 w-[380px] h-[650px] bg-white border border-gray-200 rounded-[32px] shadow-2xl flex flex-col overflow-hidden">
        <!-- Header -->
        <div class="bg-[#1a1a1b] p-4 flex justify-between items-center text-white">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
              <img src="/public/favicon.ico" alt="Logo" class="w-8 h-8 object-contain" />
            </div>
            <div class="flex flex-col">
              <span class="font-bold text-base leading-tight">XOTIC Assist</span>
              <span class="text-white/60 text-xs font-medium">Your personal buil...</span>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <button @click="clearChat" class="text-white/70 hover:text-white transition-colors" title="Clear Chat">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 4v6h-6"></path><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
            </button>
            <button @click="isSettingsOpen = !isSettingsOpen" class="text-white/70 hover:text-white transition-colors" title="Settings">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            </button>
            <button @click="toggleChat" class="text-white/70 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>

        <!-- Settings Panel -->
        <div v-if="isSettingsOpen" class="bg-gray-100 border-b border-gray-200 p-3 space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar">
          <div class="space-y-1">
            <label class="text-[10px] text-gray-500 uppercase font-bold tracking-wider">AI Provider</label>
            <div class="flex gap-2">
              <button 
                @click="provider = 'ollama'" 
                :class="['flex-1 py-1 rounded text-[10px] font-bold transition-colors', provider === 'ollama' ? 'bg-[#1a1a1b] text-white' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50']"
              >OLLAMA</button>
              <button 
                @click="provider = 'openai'" 
                :class="['flex-1 py-1 rounded text-[10px] font-bold transition-colors', provider === 'openai' ? 'bg-[#1a1a1b] text-white' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50']"
              >OPENAI</button>
            </div>
          </div>

          <!-- Ollama Settings -->
          <div v-if="provider === 'ollama'" class="space-y-3">
            <div class="space-y-1">
              <label class="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Ollama API URL</label>
              <input 
                v-model="ollamaUrl"
                type="text" 
                class="w-full bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-800 outline-none focus:border-red-500"
                placeholder="http://localhost:11434"
              />
            </div>
            <div class="space-y-1">
              <label class="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Model Name</label>
              <input 
                v-model="modelName"
                type="text" 
                class="w-full bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-800 outline-none focus:border-red-500"
                placeholder="e.g. llama3"
              />
            </div>
          </div>

          <!-- OpenAI Settings -->
          <div v-if="provider === 'openai'" class="space-y-3">
            <div class="space-y-1">
              <label class="text-[10px] text-gray-500 uppercase font-bold tracking-wider">API Key</label>
              <input 
                v-model="apiKey"
                type="password" 
                class="w-full bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-800 outline-none focus:border-red-500"
                placeholder="sk-..."
              />
            </div>
          </div>

          <button @click="saveSettings" class="w-full bg-[#1a1a1b] text-white py-1.5 rounded text-[10px] font-bold hover:bg-black transition-colors mt-2">SAVE CONFIGURATION</button>
        </div>

        <!-- Messages Area -->
        <div class="flex-grow flex flex-col min-h-0 bg-gray-50/50 p-4 rounded-t-[40px] mt-2">
          <div ref="chatContainer" class="flex-grow overflow-y-auto space-y-4 no-scrollbar pb-4">
            <div v-for="(msg, index) in chatHistory" :key="index" :class="['flex items-start gap-2', msg.role === 'user' ? 'justify-end' : 'justify-start']">
              <!-- Bot Icon -->
              <div v-if="msg.role === 'bot'" class="w-8 h-8 rounded-full bg-white border border-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden mt-1 shadow-sm">
                <img src="/public/favicon.ico" alt="AI" class="w-6 h-6 object-contain" />
              </div>
              
              <div :class="[
                'max-w-[80%] p-3 px-4 rounded-[20px] text-[15px] leading-relaxed transition-all duration-300 shadow-sm',
                msg.role === 'user' 
                  ? 'bg-[#2b2b2b] text-white rounded-tr-none' 
                  : 'bg-[#e9e9eb] text-gray-800 rounded-tl-none'
              ]" v-html="msg.role === 'bot' ? formatText(msg.text) : msg.text">
              </div>
            </div>
            
            <!-- Typing Indicator -->
            <div v-if="isTyping" class="flex items-start gap-2">
              <div class="w-8 h-8 rounded-full bg-white border border-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden mt-1 shadow-sm">
                <img src="/public/favicon.ico" alt="AI" class="w-6 h-6 object-contain" />
              </div>
              <div class="bg-[#e9e9eb] p-3 px-4 rounded-[20px] rounded-tl-none flex gap-1 items-center shadow-sm">
                <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0s"></div>
                <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
              </div>
            </div>
          </div>

          <!-- Suggestions -->
          <div v-if="chatHistory.length === 1 && !isTyping" class="pb-2 flex flex-wrap gap-2">
            <button 
              v-for="suggest in suggestions" 
              :key="suggest"
              @click="handleSuggestion(suggest)"
              class="text-[12px] bg-white border border-gray-200 hover:border-red-500/50 hover:bg-red-50 text-gray-600 hover:text-red-600 px-3 py-1.5 rounded-full transition-all shadow-sm"
            >
              {{ suggest }}
            </button>
          </div>

          <!-- Input Area -->
          <div class="pt-4 border-t border-gray-100 bg-transparent">
            <div class="flex items-center gap-3 mb-2 px-1">
              <button @click="toggleChat" class="text-gray-400 hover:text-gray-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              </button>
              
              <form @submit.prevent="sendMessage" class="flex-grow flex items-center relative">
                <textarea 
                  v-model="message"
                  placeholder="" 
                  rows="1"
                  @keydown.enter.prevent="!$event.shiftKey && sendMessage()"
                  class="w-full bg-white border-2 border-red-500 rounded-full px-6 py-2.5 text-[15px] text-gray-800 outline-none transition-all resize-none overflow-hidden h-[46px] shadow-sm"
                ></textarea>
                <button 
                  type="submit" 
                  :disabled="!message.trim() || isTyping" 
                  class="absolute right-3 text-gray-300 hover:text-red-500 disabled:opacity-30 disabled:hover:text-gray-300 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
              </form>
            </div>
            
            <div class="flex flex-col items-center gap-1">
              <div class="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
                <span>Powered by</span>
                <span class="flex items-center gap-0.5 font-bold text-gray-500 tracking-tighter">
                  <div class="w-3 h-3 bg-gray-500 rounded-sm flex items-center justify-center text-[8px] text-white">R</div>
                  <span>E P</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <button 
      @click="toggleChat"
      class="w-14 h-14 bg-[#1a1a1b] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all active:scale-95 group relative overflow-hidden"
    >
      <div class="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
      <div v-if="!isOpen" class="relative z-10 w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
        <img src="/public/favicon.ico" alt="Logo" class="w-8 h-8 object-contain" />
      </div>
      <svg v-else class="relative z-10" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
  </div>
</template>

<style scoped>
.chat-fade-enter-active, .chat-fade-leave-active {
  transition: all 0.3s ease;
}
.chat-fade-enter-from, .chat-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}
</style>
