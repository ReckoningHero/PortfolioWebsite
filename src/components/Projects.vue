<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Import assets
import twoWorldsVideo from '../assets/videos/Two_Worlds.mp4'
import packMaskVideo from '../assets/videos/ProjectMask.mp4'
import infovisionVideo from '../assets/videos/project-infovisionverse-vr-outstands-the-boundary-for-wor_1700864884999.mp4'
import projectUnrealImg from '../assets/images/ProjectUnreal.png'

const categories = ['All', 'Individual Project', 'Game Jam', 'Group Project']
const selectedCategory = ref('All')

const projects = [
  {
    id: 'cyberwar',
    title: 'CyberWar (Third Person Shooter)',
    description: 'A fast-paced third-person shooter developed in Unreal Engine 4 focusing on advanced AI behaviors and fluid combat mechanics.',
    category: 'Individual Project',
    type: 'image',
    src: projectUnrealImg,
    responsibilities: [
      'Finite state machine in C++',
      'Melee + range combat system',
      'Custom collision checking',
      'UE4 build for PC',
      'Custom projectile ‘batching’',
      'Two-pass shader using stencil buffer'
    ],
    link: '/PortfolioWebsite/projects/cyberwar',
    highlighted: true
  },
  {
    id: 'escape-from-worlds',
    title: 'Escape from Worlds (Multiplayer AI Game)',
    description: 'An experimental multiplayer title featuring complex AI agents that learn and adapt to player strategies in a dynamic environment.',
    category: 'Individual Project',
    type: 'image',
    src: projectUnrealImg,
    responsibilities: [
      'Finite state machine in C++',
      'Melee + range combat system',
      'Custom collision checking',
      'UE4 build for PC',
      'Custom projectile ‘batching’',
      'Two-pass shader using stencil buffer'
    ],
    link: '/PortfolioWebsite/projects/cyberwar',
    highlighted: true
  },
  {
    id: 'infovisionverse',
    title: 'INFOVISIONVERSE: CONNECTING PEOPLE AND TECH IN VR',
    description: 'A social VR experience designed to bridge the gap between people and technology using immersive hand-tracking and spatial audio.',
    category: 'Group Project',
    type: 'video',
    src: infovisionVideo,
    responsibilities: [
      'Finite state machine in C#',
      'VR Melee + range grab system',
      'Custom collision checking',
      'Unity3D build for Oculus Quest 2',
      'Custom points ‘batching’',
      'Custom Locomotion/Hand Tracking'
    ],
    link: '/PortfolioWebsite/projects/infovisionverse',
    highlighted: true
  },
  {
    id: 'two-worlds',
    title: 'Two Worlds',
    description: 'A puzzle-platformer where players must navigate between two parallel dimensions, built for a 48-hour game jam.',
    category: 'Game Jam',
    type: 'video',
    src: twoWorldsVideo,
    responsibilities: [
      'Lead Programmer',
      'Finite state machine in C++',
      'Melee + range combat system',
      'Custom collision checking',
      'UE4 build for PC',
      'Custom projectile ‘batching’',
      'Two-pass shader using stencil buffer'
    ],
    link: '/PortfolioWebsite/projects/two-worlds',
    highlighted: true
  },
  {
    id: 'pack-mask',
    title: 'Pack-Mask',
    description: 'A unique survival game where masks grant powers but come with a price, developed during Global Game Jam 2026.',
    category: 'Game Jam',
    type: 'video',
    src: packMaskVideo,
    responsibilities: [
      'Unreal C++ Gameplay Logic',
      'Pay/Lockout Mask Mechanics',
      'Custom Collision Handling',
      'Event-driven Stage Spawning',
      'Inventory & Payment UI',
      'VFX & SFX Integration'
    ],
    link: '/PortfolioWebsite/projects/pack-mask',
    jamLink: 'https://globalgamejam.org/games/2026/pack-mask-9',
    githubLink: 'https://github.com/twinb0rngamejam/GameJam2026',
    highlighted: true
  }
]

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'All') return projects
  return projects.filter(p => p.category === selectedCategory.value)
})

// Watch category changes to refresh ScrollTrigger
watch(selectedCategory, () => {
  nextTick(() => {
    ScrollTrigger.refresh()
  })
})

const projectsRef = ref(null)
const scrollContainer = ref(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)

const updateScrollButtons = () => {
  if (scrollContainer.value) {
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value
    canScrollLeft.value = scrollLeft > 10
    canScrollRight.value = scrollLeft < scrollWidth - clientWidth - 10
  }
}

const scroll = (direction) => {
  if (scrollContainer.value) {
    const scrollAmount = scrollContainer.value.clientWidth * 0.8
    scrollContainer.value.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
  }
}

onMounted(() => {
  // Animation for project cards
  setTimeout(() => {
    gsap.from(".project-card", {
      scrollTrigger: {
        trigger: "#projects",
        start: "top 85%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      clearProps: "all"
    })
    // Force ScrollTrigger refresh in case of layout shifts
    ScrollTrigger.refresh()
    updateScrollButtons()
  }, 100)

  window.addEventListener('resize', updateScrollButtons)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScrollButtons)
})

// Watch filtered projects to update scroll buttons
watch(filteredProjects, () => {
  nextTick(() => {
    updateScrollButtons()
  })
})
</script>

<template>
  <div id="projects" class="container mx-auto lg:px-[5em] px-[9em] py-[50px]">
    <h3 class="font-atyp-display font-semibold lg:text-[4em] text-[40px] text-center mb-[40px] underline decoration-[#CCF303] underline-offset-[12px] decoration-4">
      Game <span class="text-[#CCF303]">Projects</span>
    </h3>

    <!-- Categories Filter Bar -->
    <div class="flex flex-wrap justify-center gap-4 mb-[60px]">
      <button 
        v-for="cat in categories" 
        :key="cat"
        @click="selectedCategory = cat"
        :class="[
          'px-6 py-2 rounded-full text-[18px] font-atyp-display font-medium transition-all border',
          selectedCategory === cat 
            ? 'bg-[#CCF303] text-black border-[#CCF303]' 
            : 'bg-transparent text-white/60 border-white/10 hover:border-[#CCF303] hover:text-white'
        ]"
      >
        {{ cat }}
      </button>
    </div>

    <div class="relative group/arrows">
      <!-- Navigation Arrows -->
      <button 
        @click="scroll('left')" 
        class="absolute left-0 top-[149px] -translate-y-1/2 -translate-x-1/2 z-20 w-[50px] h-[50px] rounded-full bg-[#1A1A1A]/80 border border-white/10 flex items-center justify-center text-white hover:bg-[#CCF303] hover:text-black transition-all shadow-xl backdrop-blur-sm"
        v-show="canScrollLeft"
        aria-label="Previous projects"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
      </button>

      <button 
        @click="scroll('right')" 
        class="absolute right-0 top-[149px] -translate-y-1/2 translate-x-1/2 z-20 w-[50px] h-[50px] rounded-full bg-[#1A1A1A]/80 border border-white/10 flex items-center justify-center text-white hover:bg-[#CCF303] hover:text-black transition-all shadow-xl backdrop-blur-sm"
        v-show="canScrollRight"
        aria-label="Next projects"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </button>

      <div 
        ref="scrollContainer"
        class="flex overflow-x-auto gap-[45px] pb-10 no-scrollbar snap-x scroll-smooth"
        @scroll="updateScrollButtons"
      >
        <transition-group name="list" tag="div" class="flex gap-[45px]">
          <div 
            v-for="project in filteredProjects" 
            :key="project.id"
            class="project-card flex-none w-full md:w-[calc(50%-22.5px)] lg:w-[calc(33.333%-30px)] snap-start font-atyp-display flex flex-col items-start gap-[24px] bg-[#FFFFFF05] p-6 rounded-[20px] border border-white/5 hover:border-[#CCF303]/30 transition-all duration-300"
          >
          <div class="flex flex-col gap-[18px] w-full">
            <div class="w-full h-[250px] overflow-hidden rounded-[13px] bg-black/20">
              <video 
                v-if="project.type === 'video'"
                class="w-full h-full object-cover object-center" 
                autoplay 
                loop 
                muted 
                playsinline
                :src="project.src"
              >
              </video>
              <img 
                v-else
                class="w-full h-full object-cover object-center" 
                :src="project.src" 
                :alt="project.title"
              >
            </div>

            <div>
              <div class="flex items-center gap-2 mb-2">
                  <span class="px-2 py-0.5 bg-[#CCF303]/10 text-[#CCF303] text-[12px] uppercase tracking-wider rounded border border-[#CCF303]/20">
                      {{ project.category }}
                  </span>
                  <span v-if="project.highlighted" class="px-2 py-0.5 bg-white/5 text-white/40 text-[12px] uppercase tracking-wider rounded border border-white/10">
                      Featured
                  </span>
              </div>
              <h5 class="font-semibold text-[22px] text-[#CCF303] leading-tight mb-2">{{ project.title }}</h5>
              <p class="text-white/60 text-sm leading-relaxed mb-1">{{ project.description }}</p>
            </div>
          </div>

          <div class="flex flex-col gap-[10px] flex-grow">
            <div v-for="(resp, index) in project.responsibilities" :key="index" class="flex items-start gap-[12px]">
              <svg class="mt-1 shrink-0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 20 20">
                <path fill="#CCF303" d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0ZM8.001 14.413l-3.713-3.705L5.7 9.292l2.299 2.295 5.294-5.294 1.414 1.414-6.706 6.706Z"/>
              </svg>
              <p class="text-[16px] text-white/80 leading-snug">{{ resp }}</p>
            </div>
          </div>

          <div class="flex flex-col gap-[10px] w-full mt-auto">
            <router-link 
              v-if="project.link.startsWith('/')" 
              :to="project.link" 
              class="w-full text-center hover:bg-[#CCF303] hover:text-black transition-all border border-[#CCF303] px-[23px] py-[10px] text-[16px] text-[#CCF303] font-medium rounded-lg mb-2 inline-block uppercase"
            >
              Details
            </router-link>
            <a 
              v-else 
              :href="project.link" 
              class="w-full text-center hover:bg-[#CCF303] hover:text-black transition-all border border-[#CCF303] px-[23px] py-[10px] text-[16px] text-[#CCF303] font-medium rounded-lg mb-2 inline-block uppercase"
            >
              Details
            </a>
            <a 
              v-if="project.jamLink" 
              :href="project.jamLink" 
              target="_blank"
              class="w-full text-center bg-white/5 hover:bg-white/10 text-white/80 transition-all border border-white/10 px-[23px] py-[10px] text-[16px] font-medium rounded-lg inline-block uppercase"
            >
              Jam Page
            </a>
            <a 
              v-if="project.githubLink" 
              :href="project.githubLink" 
              target="_blank"
              class="w-full text-center bg-white/5 hover:bg-white/10 text-white/80 transition-all border border-white/10 px-[23px] py-[10px] text-[16px] font-medium rounded-lg inline-block uppercase"
            >
              Github
            </a>
          </div>
        </div>
      </transition-group>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.project-card:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
