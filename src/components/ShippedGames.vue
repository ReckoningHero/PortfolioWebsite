<template>
  <div id="shippedGames" class="container mx-auto lg:px-[5em] px-[9em]">
    <hr class="border border-[#FFFFFF12] my-[50px]" />
    <h3 class="uppercase font-atyp-display font-semibold lg:text-[4em] text-[40px] text-center">
      <span class="text-[#CCF303]">Titles</span>
    </h3>

    <!-- Category filters (match Iron Galaxy taxonomy) -->
    <div class="flex flex-wrap items-center justify-center gap-3 mt-[30px]">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="activeCategory = cat"
        class="px-4 py-2 rounded-full font-atyp-display text-[14px] lg:text-[0.95em] ring-1 transition"
        :class="[
          activeCategory === cat
            ? 'bg-[#19212A] text-[#CCF303] ring-[#CCF303]'
            : 'bg-[#0B1217] text-[#B0BAC3] ring-[#FFFFFF12] hover:text-white hover:ring-white/30'
        ]"
        :aria-pressed="activeCategory === cat"
        :aria-label="`Filter by ` + cat"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Featured hero slider (disabled per request) -->
    <div
      v-if="ENABLE_HERO"
      ref="heroContainerRef"
      class="relative mt-[40px] rounded-[16px] overflow-hidden ring-1 ring-[#FFFFFF12] bg-[#0B1217]"
      style="perspective: 1000px"
      @mouseenter="isHeroPaused = true"
      @mouseleave="() => { isHeroPaused = false; resetHeroTilt() }"
      @mousemove="onHeroMouseMove"
      tabindex="0"
      @keydown.left.prevent="prevHero"
      @keydown.right.prevent="nextHero"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    >
      <!-- Slides stage (absolute cards centered with angled side-peek) -->
      <div
        class="slides-track relative h-[65vh] lg:h-[72vh]"
      >
        <a
          v-for="(game, i) in games"
          :key="game.slug"
          :href="game.link"
          target="_blank"
          rel="noopener"
          class="group absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform"
          :style="getSlideStyle(i)"
          :aria-label="`Open ` + game.title"
        >
          <!-- Card wrapper to control width -->
          <div class="relative w-[74%] lg:w-[50%] aspect-[16/10] overflow-hidden" style="transform-style: preserve-3d">
            <!-- Cover image -->
            <img
              :src="game.image"
              :alt="game.alt"
              class="w-full h-full object-contain"
            />

            <!-- Gradient overlay for text readability -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent"></div>

            <!-- Text overlay only for active slide -->
            <div
              class="absolute bottom-0 left-0 right-0 p-6 lg:p-10 transition-opacity duration-300"
              :class="isActive(i) ? 'opacity-100' : 'opacity-0 pointer-events-none'"
            >
              <h4 class="font-atyp-display font-semibold text-white text-[28px] lg:text-[2em]">
                {{ game.title }}
              </h4>
              <p class="font-atyp-display text-[#B0BAC3] text-[16px] lg:text-[1.125em] mt-1">
                {{ game.platform }}
              </p>
            </div>
          </div>
        </a>
      </div>

      <!-- Controls -->
      <div class="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4">
        <button
          @click="prevHero"
          class="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white ring-1 ring-white/20"
          aria-label="Previous featured game"
        >
          <!-- Left arrow -->
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path fill="currentColor" d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        <button
          @click="nextHero"
          class="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white ring-1 ring-white/20"
          aria-label="Next featured game"
        >
          <!-- Right arrow -->
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path fill="currentColor" d="M8.59 16.59 10 18l6-6-6-6-1.41 1.41L12.17 12z"/>
          </svg>
        </button>
      </div>

      <!-- Dot indicators -->
      <div class="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
        <button
          v-for="(g, i) in games"
          :key="g.slug + '-dot'"
          @click="goToHero(i)"
          class="h-2.5 w-2.5 rounded-full transition-all"
          :class="i === currentHeroIndex ? 'bg-[#CCF303] w-6' : 'bg-white/40 hover:bg-white/60'"
          :aria-label="`Go to slide ${i + 1}`"
          :aria-current="i === currentHeroIndex ? 'true' : 'false'"
        />
      </div>
    </div>

    <!-- Iron Galaxy-style grid of clickable tiles -->
    <div class="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[24px] mt-[62px]">
      <a
        v-for="game in filteredGames"
        :key="game.slug"
        :href="game.link"
        target="_blank"
        rel="noopener"
        class="group relative rounded-[24px] overflow-hidden bg-[#0B1217] border border-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] focus:outline-none focus:ring-2 focus:ring-[#CCF303] transition-all duration-500 hover:translate-y-[-5px]"
        :aria-label="`Open ` + game.title"
      >
        <!-- Cover image with subtle zoom on hover -->
        <img
          :src="game.image"
          :alt="game.alt"
          class="w-full h-full object-cover aspect-[16/10] transition-transform duration-500 group-hover:scale-105"
        />

        <!-- Dark gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>

        <!-- Category badge (top-left) -->
        <span
          class="absolute top-3 left-3 px-3 py-1 rounded-full uppercase tracking-wide text-[11px] font-atyp-display ring-1"
          :class="{
            'bg-[#19212A] text-[#CCF303] ring-[#CCF303]': game.category === 'Original',
            'bg-[#19212A] text-[#7CDFFF] ring-[#7CDFFF]': game.category === 'Co-Development',
            'bg-[#19212A] text-[#FFB86C] ring-[#FFB86C]': game.category === 'Support',
          }"
        >
          {{ game.category }}
        </span>

        <!-- Title and platform in bottom overlay -->
        <div class="absolute bottom-0 left-0 right-0 p-5 group-hover:translate-y-[-10px] transition-transform duration-300">
          <h5 class="font-atyp-display font-semibold text-white text-[22px] lg:text-[1.375em]">
            {{ game.title }}
          </h5>
          <p class="font-atyp-display text-[#B0BAC3] text-[14px] lg:text-[0.95em] mt-1">{{ game.platform }}</p>
        </div>

        <!-- Hover Responsibilities Overlay -->
        <div class="absolute inset-0 bg-[#0B1217]/95 flex flex-col p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-y-auto">
          <h4 v-if="game.jobTitle" class="font-atyp-display font-bold text-white text-[18px] mb-1">
            {{ game.jobTitle }}
          </h4>
          <h5 class="font-atyp-display font-semibold text-[#CCF303] text-[16px] mb-4">
            Key Responsibilities
          </h5>
          <ul class="space-y-3">
            <li 
              v-for="(bullet, index) in game.bullets" 
              :key="index"
              class="flex items-start gap-3"
            >
              <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#CCF303] shrink-0"></span>
              <p class="font-atyp-display text-white/90 text-[14px] leading-snug">
                {{ bullet }}
              </p>
            </li>
          </ul>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import horizonLogo from '../assets/images/horizonworldslogo_1024x1024.jpg'
import ghostsOfTaborImg from '../assets/images/tried-to-make-some-wallpapers-use-them-if-u-like-v0-tc8cs7ajy0qd1.png'

// Toggle to enable/disable the hero hover/slide section
const ENABLE_HERO = false

const games = ref([
  {
    slug: 'horizon-worlds',
    title: 'Horizon Worlds',
    jobTitle: 'Gameplay Engineer II at Meta',
    platform: 'Meta Quest',
    image: horizonLogo,
    alt: 'Horizon Worlds logo',
    category: 'Co-Development',
    bullets: [
      'Engineered innovative NPC behavior tools to boost user interaction and engagement.',
      'Contributed to the development and maintenance of the core Horizon Engine codebase.',
      'Developed technical demonstrations in TypeScript, C#, and C++ to showcase NPC capabilities for creators.',
      'Produced scalable code examples for creator education and AI model training.',
      'Built a dynamic dialogue system in C++ featuring branching logic and randomized variations.',
      'Refactored component pooling systems, increasing code coverage to 75% while optimizing performance.',
      'Partnered with cross-functional teams to refine 3Cs (Camera, Character, Control) alignment.'
    ],
    link: 'https://www.oculus.com/horizon-worlds/',
    cta: 'View on Meta →',
  },
  {
    slug: 'ghosts-of-tabor',
    title: 'Ghosts of Tabor',
    jobTitle: 'Full Stack Engineer at Combat Waffle Studio',
    platform: 'Meta Quest | PCVR',
    image: ghostsOfTaborImg,
    alt: 'Ghosts of Tabor logo',
    category: 'Co-Development',
    bullets: [
      'Integrated Steam Web API and online subsystems for multiplayer servers via AWS/Azure backends.',
      'Designed and scripted core engine systems for a VR survival and PVP simulation.',
      'Architected and established scalable backend infrastructure for game services.',
      'Successfully published and shipped on Oculus Quest 2 and Steam using .NET, C#, and Azure PlayFab.'
    ],
    link: 'https://ghostsoftabor.com/',
    cta: 'Visit Official Site →',
  },
])

// Category filters
const categories = ['All', 'Original', 'Co-Development', 'Support']
const activeCategory = ref('All')
const filteredGames = computed(() => {
  if (activeCategory.value === 'All') return games.value
  return games.value.filter(g => g.category === activeCategory.value)
})

// Hero slider state
const currentHeroIndex = ref(0)
const heroIntervalMs = 4000
let heroTimer = null
const isHeroPaused = ref(false)
const heroContainerRef = ref(null)

function nextHero() {
  currentHeroIndex.value = (currentHeroIndex.value + 1) % games.value.length
}
function prevHero() {
  currentHeroIndex.value = (currentHeroIndex.value - 1 + games.value.length) % games.value.length
}

function resetHeroTilt() {
  const track = heroContainerRef.value?.querySelector('.slides-track')
  const el = track?.children?.[currentHeroIndex.value]
  if (el) {
    el.style.setProperty('--tiltX', '0deg')
    el.style.setProperty('--tiltY', '0deg')
    el.style.setProperty('--tiltZ', '0px')
  }
}

onMounted(() => {
  if (ENABLE_HERO) {
    heroTimer = setInterval(() => {
      if (!isHeroPaused.value) {
        nextHero()
      }
    }, heroIntervalMs)
  }
})
onBeforeUnmount(() => {
  if (heroTimer) clearInterval(heroTimer)
})

// Touch swipe support
const touchStartX = ref(0)
const touchDeltaX = ref(0)

function onTouchStart(e) {
  const t = e.touches?.[0]
  if (!t) return
  touchStartX.value = t.clientX
  touchDeltaX.value = 0
}
function onTouchMove(e) {
  const t = e.touches?.[0]
  if (!t) return
  touchDeltaX.value = t.clientX - touchStartX.value
}
function onTouchEnd() {
  const threshold = 50
  if (touchDeltaX.value > threshold) {
    prevHero()
  } else if (touchDeltaX.value < -threshold) {
    nextHero()
  }
  touchStartX.value = 0
  touchDeltaX.value = 0
}

function goToHero(i) {
  currentHeroIndex.value = i % games.value.length
}

function onHeroMouseMove(e) {
  const container = heroContainerRef.value
  if (!container) return
  const rect = container.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width
  const y = (e.clientY - rect.top) / rect.height
  // Tilt range in degrees
  const maxTilt = 6
  const tiltY = (x - 0.5) * 2 * maxTilt // left/right
  const tiltX = (0.5 - y) * 2 * maxTilt // up/down
  const track = container.querySelector('.slides-track')
  const el = track?.children?.[currentHeroIndex.value]
  if (el) {
    el.style.setProperty('--tiltX', `${tiltX}deg`)
    el.style.setProperty('--tiltY', `${tiltY}deg`)
    el.style.setProperty('--tiltZ', `30px`)
  }
}

// Helpers for angled side-peek layout
function isActive(i) {
  return i === currentHeroIndex.value
}

function getSlideStyle(i) {
  const diff = i - currentHeroIndex.value
  const abs = Math.abs(diff)
  // Base values for transforms
  let offset = 0
  let rotateY = 0
  let scale = 1
  let opacity = 1
  let z = 60 // translateZ for pop-out
  let zIndex = 30

  if (abs === 0) {
    offset = 0
    rotateY = 0
    scale = 1
    opacity = 1
    z = 60
    zIndex = 30
  } else if (abs === 1) {
    offset = diff < 0 ? -22 : 22 // percent
    rotateY = diff < 0 ? -14 : 14
    scale = 0.75
    opacity = 0.6
    z = 20
    zIndex = 20
  } else if (abs === 2) {
    offset = diff < 0 ? -44 : 44
    rotateY = diff < 0 ? -22 : 22
    scale = 0.62
    opacity = 0.38
    z = 0
    zIndex = 10
  } else {
    // push far slides outside view
    offset = diff < 0 ? -120 : 120
    rotateY = diff < 0 ? -30 : 30
    scale = 0.5
    opacity = 0
    z = -40
    zIndex = 1
  }

  // Center the card vertically and apply side-peek offsets
  const transform = `translateX(calc(-50% + ${offset}%)) translateY(-50%) rotateY(${rotateY}deg) translateZ(${z}px) scale(${scale}) rotateX(var(--tiltX, 0deg)) rotateY(var(--tiltY, 0deg)) translateZ(var(--tiltZ, 0px))`

  return {
    transform,
    opacity,
    zIndex,
    transition: 'transform 500ms cubic-bezier(0.22,1,0.36,1), opacity 400ms ease',
    height: '100%'
  }
}
</script>

<style scoped>
</style>