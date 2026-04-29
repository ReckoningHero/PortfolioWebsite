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
    title: 'CyberWar (TPS)',
    description: 'A high-octane third-person shooter in Unreal Engine 4 featuring advanced AI, dynamic cover systems, and optimized weapon mechanics.',
    category: 'Individual Project',
    type: 'image',
    src: projectUnrealImg,
    responsibilities: [
      'Advanced AI Finite State Machine',
      'Fluid Melee & Ranged Combat',
      'Custom Raycast Collision Detection',
      'Optimized Projectile Batching',
      'Two-pass Stencil Buffer Shaders'
    ],
    link: '/PortfolioWebsite/projects/cyberwar',
    highlighted: true
  },
  {
    id: 'escape-from-worlds',
    title: 'Escape from Worlds',
    description: 'An experimental multiplayer survival game with neural network-based AI agents that adapt to player behavior in real-time.',
    category: 'Individual Project',
    type: 'image',
    src: projectUnrealImg,
    responsibilities: [
      'Real-time Multiplayer Networking',
      'Adaptive AI Learning Algorithms',
      'Procedural Environment Generation',
      'Custom Physics-based Interactions',
      'C++ Core Architecture'
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
            class="project-card flex-none w-full md:w-[calc(50%-22.5px)] lg:w-[calc(33.333%-30px)] snap-start font-atyp-display flex flex-col items-start gap-[24px] bg-[#0B1217] p-6 rounded-[24px] border border-white/5 hover:border-[#CCF303]/40 transition-all duration-500 group"
          >
          <div class="flex flex-col gap-[18px] w-full">
            <div class="w-full h-[250px] overflow-hidden rounded-[18px] bg-black/40 relative">
              <video 
                v-if="project.type === 'video'"
                class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" 
                autoplay 
                loop 
                muted 
                playsinline
                :src="project.src"
              >
              </video>
              <img 
                v-else
                class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" 
                :src="project.src" 
                :alt="project.title"
              >
              <!-- Overlay on hover -->
              <div class="absolute inset-0 bg-[#CCF303]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            <div>
              <div class="flex items-center gap-2 mb-3">
                  <span class="px-2.5 py-1 bg-[#CCF303]/10 text-[#CCF303] text-[11px] font-bold uppercase tracking-[0.1em] rounded-md border border-[#CCF303]/20">
                      {{ project.category }}
                  </span>
                  <span v-if="project.highlighted" class="px-2.5 py-1 bg-white/5 text-white/50 text-[11px] font-bold uppercase tracking-[0.1em] rounded-md border border-white/10">
                      Featured
                  </span>
              </div>
              <h5 class="font-bold text-[24px] text-white group-hover:text-[#CCF303] transition-colors duration-300 leading-tight mb-3">{{ project.title }}</h5>
              <p class="text-[#6B767F] text-sm leading-relaxed mb-2 line-clamp-2 group-hover:text-white/70 transition-colors">{{ project.description }}</p>
            </div>
          </div>

          <div class="flex flex-col gap-[12px] flex-grow w-full">
            <div v-for="(resp, index) in project.responsibilities" :key="index" class="flex items-start gap-[12px]">
              <div class="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[#CCF303]/60 group-hover:bg-[#CCF303] transition-colors"></div>
              <p class="text-[15px] text-white/70 leading-snug group-hover:text-white/90 transition-colors">{{ resp }}</p>
            </div>
          </div>

          <div class="flex flex-col gap-[12px] w-full mt-6">
            <router-link 
              v-if="project.link.startsWith('/')" 
              :to="project.link" 
              class="w-full text-center bg-transparent hover:bg-[#CCF303] hover:text-black transition-all duration-300 border border-[#CCF303]/30 hover:border-[#CCF303] px-[23px] py-[12px] text-[15px] text-[#CCF303] font-bold rounded-xl inline-block uppercase tracking-wider"
            >
              View Case Study
            </router-link>
            <a 
              v-else 
              :href="project.link" 
              class="w-full text-center bg-transparent hover:bg-[#CCF303] hover:text-black transition-all duration-300 border border-[#CCF303]/30 hover:border-[#CCF303] px-[23px] py-[12px] text-[15px] text-[#CCF303] font-bold rounded-xl inline-block uppercase tracking-wider"
            >
              View Case Study
            </a>
            <div class="flex gap-3">
                <a 
                v-if="project.jamLink" 
                :href="project.jamLink" 
                target="_blank"
                class="flex-1 text-center bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all border border-white/5 px-[15px] py-[10px] text-[13px] font-bold rounded-lg inline-block uppercase tracking-wide"
                >
                Jam
                </a>
                <a 
                v-if="project.githubLink" 
                :href="project.githubLink" 
                target="_blank"
                class="flex-1 text-center bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all border border-white/5 px-[15px] py-[10px] text-[13px] font-bold rounded-lg inline-block uppercase tracking-wide"
                >
                Code
                </a>
            </div>
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
