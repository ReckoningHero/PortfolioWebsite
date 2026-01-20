<script setup>
import { ref, nextTick, onMounted } from 'vue'
import gsap from 'gsap'

const isOpen = ref(false)
const isTyping = ref(false)
const message = ref('')
const chatHistory = ref([
  { role: 'bot', text: 'Hello! I am Josh\'s AI assistant. How can I help you today?' }
])
const chatContainer = ref(null)

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

  // Simulate AI response
  setTimeout(async () => {
    let botResponse = ""
    const input = userText.toLowerCase()

    if (input.includes('experience') || input.includes('work') || input.includes('skills')) {
      botResponse = "Josh is a Gameplay Engineer proficient in C++, Unreal Engine (UE4/UE5), and Unity. He specializes in gameplay systems, AI (FSMs), and performance optimization."
    } else if (input.includes('contact') || input.includes('hire') || input.includes('email')) {
      botResponse = "You can reach Josh via the contact form on the home page, or directly through his LinkedIn profile. He's always open to discussing new opportunities!"
    } else if (input.includes('resume') || input.includes('cv')) {
      botResponse = "You can view and download Josh's latest resume by clicking the 'Resume' link in the navigation bar."
    } else if (input.includes('projects') || input.includes('portfolio')) {
      botResponse = "Josh has worked on several impressive projects like 'CyberWar' (a TPS), 'Two Worlds' (a game jam winner), and VR applications. You can find detailed breakdowns in the Projects section!"
    } else if (input.includes('game jam')) {
      botResponse = "Josh loves game jams! His project 'Two Worlds' was a highlight. He enjoys the challenge of building something polished in a short timeframe."
    } else if (input.includes('cpp') || input.includes('c++')) {
      botResponse = "C++ is Josh's primary language for gameplay engineering. He has even built an online C++ IDE (check it out in the menu!) to demonstrate his skills."
    } else if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      botResponse = "Hello! I'm here to help you learn more about Josh's work. What would you like to know?"
    } else {
      botResponse = "I'm not sure I understand that yet, but I'm learning! You can ask about Josh's skills, projects, or how to contact him."
    }

    isTyping.value = false
    chatHistory.value.push({ role: 'bot', text: botResponse })
    await nextTick()
    scrollToBottom()
  }, 1000)
}
</script>

<template>
  <div class="fixed bottom-6 right-6 z-50 font-atyp-display">
    <!-- Chat Window -->
    <transition name="chat-fade">
      <div v-if="isOpen" class="chat-window mb-4 w-[350px] h-[450px] bg-[#0b1520] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        <!-- Header -->
        <div class="bg-[#CCF303] p-4 flex justify-between items-center">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
            <span class="text-black font-semibold">Josh AI Assistant</span>
          </div>
          <button @click="toggleChat" class="text-black/70 hover:text-black">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <!-- Messages -->
        <div ref="chatContainer" class="flex-grow overflow-y-auto p-4 space-y-4 no-scrollbar">
          <div v-for="(msg, index) in chatHistory" :key="index" :class="['flex', msg.role === 'user' ? 'justify-end' : 'justify-start']">
            <div :class="[
              'max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed transition-all duration-300',
              msg.role === 'user' ? 'bg-[#CCF303] text-black rounded-br-none shadow-[0_4px_12px_rgba(204,243,3,0.2)]' : 'bg-white/10 text-white/95 border border-white/10 rounded-bl-none'
            ]">
              {{ msg.text }}
            </div>
          </div>
          
          <!-- Typing Indicator -->
          <div v-if="isTyping" class="flex justify-start">
            <div class="bg-white/10 border border-white/10 p-3 rounded-2xl rounded-bl-none flex gap-1 items-center">
              <div class="w-1.5 h-1.5 bg-[#CCF303] rounded-full animate-bounce" style="animation-delay: 0s"></div>
              <div class="w-1.5 h-1.5 bg-[#CCF303] rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
              <div class="w-1.5 h-1.5 bg-[#CCF303] rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
            </div>
          </div>
        </div>

        <!-- Suggestions -->
        <div v-if="chatHistory.length === 1 && !isTyping" class="px-4 pb-2 flex flex-wrap gap-2">
          <button 
            v-for="suggest in suggestions" 
            :key="suggest"
            @click="handleSuggestion(suggest)"
            class="text-[11px] bg-white/5 border border-white/10 hover:border-[#CCF303]/50 hover:bg-[#CCF303]/10 text-white/60 hover:text-[#CCF303] px-2 py-1 rounded-full transition-all"
          >
            {{ suggest }}
          </button>
        </div>

        <!-- Input -->
        <div class="p-4 border-t border-white/10 bg-black/20">
          <form @submit.prevent="sendMessage" class="flex gap-2">
            <input 
              v-model="message"
              type="text" 
              placeholder="Type a message..." 
              class="flex-grow bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#CCF303] transition-colors"
            />
            <button type="submit" class="bg-[#CCF303] text-black p-2 rounded-lg hover:bg-[#b8da02] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </form>
        </div>
      </div>
    </transition>

    <!-- Floating Button -->
    <button 
      @click="toggleChat"
      class="w-14 h-14 bg-[#CCF303] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(204,243,3,0.4)] hover:shadow-[0_4px_25px_rgba(204,243,3,0.5)] hover:scale-110 transition-all active:scale-95 group relative overflow-hidden"
    >
      <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
      <svg v-if="!isOpen" class="relative z-10" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
      <svg v-else class="relative z-10" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
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
</style>
