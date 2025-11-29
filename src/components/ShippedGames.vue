<template>
  <div id="shippedGames" class="container mx-auto lg:px-[5em] px-[9em]">
    <hr class="border border-[#FFFFFF12] my-[50px]" />
    <h3 class="uppercase font-atyp-display font-semibold lg:text-[4em] text-[40px] text-center">
      Shipped <span class="text-[#CCF303]">Games</span>
    </h3>

    <!-- Cards Grid (paginated with slide animation) -->
    <Transition :name="slideClass" mode="out-in">
      <div :key="currentPage" class="grid lg:grid-cols-3 grid-cols-1 gap-[45px] mt-[62px]">
        <div
          v-for="game in paginatedGames"
          :key="game.slug"
          class="font-atyp-display flex flex-col items-start gap-[24px]"
        >
          <div class="flex flex-col gap-[18px] w-full">
            <div class="w-full h-[309px] overflow-hidden rounded-[13px]">
              <img class="w-full h-full object-cover object-center" :src="game.image" :alt="game.alt" />
            </div>
            <div>
              <h5 class="font-semibold lg:text-[1.56em] text-[24px] text-[#CCF303] mb-[6px]">{{ game.title }}</h5>
              <p class="font-medium lg:text-[1.125em] text-[18px] text-[#6B767F]">{{ game.platform }}</p>
            </div>
          </div>

          <div class="flex flex-col gap-[10px] mt-[6px]">
            <div
              v-for="(bullet, idx) in game.bullets"
              :key="idx"
              class="flex items-center gap-[14px]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                <path
                  fill="#CCF303"
                  d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0ZM8.001 14.413l-3.713-3.705L5.7 9.292l2.299 2.295 5.294-5.294 1.414 1.414-6.706 6.706Z"
                />
              </svg>
              <p class="lg:text-[1.125em] text-[18px]">{{ bullet }}</p>
            </div>
          </div>

          <a :href="game.link" target="_blank" class="text-[#CCF303] hover:underline">{{ game.cta }}</a>
        </div>
      </div>
    </Transition>

    <!-- Previous / Next controls (match Blog styling) -->
    <div class="flex items-center justify-center gap-4 mt-[40px] font-atyp-display">
      <button
        @click="togglePause"
        :aria-pressed="isPaused"
        class="px-4 py-2 rounded border border-[#2A3540] text-white hover:border-[#CCF303] transition"
        :aria-label="isPaused ? 'Resume auto-slide' : 'Pause auto-slide'"
      >
        {{ isPaused ? 'Resume' : 'Pause' }}
      </button>
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 rounded border border-[#2A3540] text-white disabled:opacity-40 hover:border-[#CCF303] transition"
        aria-label="Previous games"
      >
        ← Previous
      </button>
      <span class="text-[#6B767F]">Page {{ currentPage }} / {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 rounded border border-[#2A3540] text-white disabled:opacity-40 hover:border-[#CCF303] transition"
        aria-label="Next games"
      >
        Next →
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
// Import local image so Vite resolves it correctly when used in reactive data
import horizonLogo from '../assets/images/horizonworldslogo_1024x1024.jpg'
// Local Ghosts of Tabor image provided by you
import ghostsOfTaborImg from '../assets/images/tried-to-make-some-wallpapers-use-them-if-u-like-v0-tc8cs7ajy0qd1.png'

// Show 3 cards per page to match the current 3-column layout
const pageSize = 3
const currentPage = ref(1)
const slideDirection = ref('left') // 'left' or 'right' for animation
const slideClass = computed(() => (slideDirection.value === 'left' ? 'slide-left' : 'slide-right'))
const isPaused = ref(false)

const games = ref([
  {
    slug: 'cyber-assault',
    title: 'Cyber Assault',
    platform: 'Xbox Series X | PS5 | PC',
    image: '../assets/images/game1.jpg',
    alt: 'Cyber Assault',
    bullets: ['Lead Programmer', 'Advanced AI systems', 'Destructible environments'],
    link: 'https://store.steampowered.com',
    cta: 'View on Steam →',
  },
  {
    slug: 'galactic-frontier',
    title: 'Galactic Frontier',
    platform: 'PC | Nintendo Switch',
    image: '../assets/images/game2.jpg',
    alt: 'Galactic Frontier',
    bullets: ['Gameplay Programmer', 'Procedural generation', 'Dynamic ecosystems'],
    link: 'https://www.nintendo.com/store',
    cta: 'View on Nintendo Store →',
  },
  {
    slug: 'horizon-worlds',
    title: 'Horizon Worlds',
    platform: 'Meta Quest',
    image: horizonLogo,
    alt: 'Horizon Worlds logo',
    bullets: [
      'Gameplay Engineer II',
      'C++ engine/tooling integrations',
      'C# editor tooling & scripting pipelines',
      'React.js internal tools for creator workflows',
      'Editor workflows, bug triage, and interactive scripting support',
    ],
    link: 'https://www.oculus.com/horizon-worlds/',
    cta: 'View on Meta →',
  },
  {
    slug: 'ghosts-of-tabor',
    title: 'Ghosts of Tabor',
    platform: 'Meta Quest | PCVR',
    image: ghostsOfTaborImg,
    alt: 'Ghosts of Tabor logo',
    bullets: ['Gameplay Programmer', 'VR survival mechanics', 'Multiplayer systems'],
    link: 'https://ghostsoftabor.com/',
    cta: 'Visit Official Site →',
  },
])

const totalPages = computed(() => Math.max(1, Math.ceil(games.value.length / pageSize)))
const paginatedGames = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return games.value.slice(start, start + pageSize)
})

function prevPage() {
  slideDirection.value = 'right'
  if (currentPage.value > 1) currentPage.value -= 1
  else currentPage.value = totalPages.value
}
function nextPage() {
  slideDirection.value = 'left'
  if (currentPage.value < totalPages.value) currentPage.value += 1
  else currentPage.value = 1
}

function togglePause() {
  isPaused.value = !isPaused.value
}

// Auto-slide every 3 seconds
const intervalMs = 3000
let autoTimer = null

onMounted(() => {
  autoTimer = setInterval(() => {
    if (!isPaused.value) {
      nextPage()
    }
  }, intervalMs)
})

onBeforeUnmount(() => {
  if (autoTimer) clearInterval(autoTimer)
})
</script>

<style scoped>
/* Slide left */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 400ms ease, opacity 400ms ease;
}
.slide-left-enter-from {
  transform: translateX(40px);
  opacity: 0;
}
.slide-left-leave-to {
  transform: translateX(-40px);
  opacity: 0;
}

/* Slide right */
.slide-right-enter-from {
  transform: translateX(-40px);
  opacity: 0;
}
.slide-right-leave-to {
  transform: translateX(40px);
  opacity: 0;
}
</style>