<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Import assets
import twoWorldsVideo from '../assets/videos/Two_Worlds.mp4'
import infovisionVideo from '../assets/videos/project-infovisionverse-vr-outstands-the-boundary-for-wor_1700864884999.mp4'
import projectUnrealImg from '../assets/images/ProjectUnreal.png'

const categories = ['All', 'Individual Project', 'Game Jam', 'Group Project']
const selectedCategory = ref('All')

const projects = [
  {
    id: 'cyberwar',
    title: 'CyberWar (Third Person Shooter)',
    category: 'Individual Project',
    type: 'image',
    src: projectUnrealImg,
    responsibilities: [
      'Finite state machine in C++',
      'Melee + range combat system',
      'Custom collision checking',
      'UE4 build for Xbox One',
      'Custom projectile ‘batching’',
      'Two-pass shader using stencil buffer'
    ],
    link: '/PortfolioWebsite/projects/cyberwar',
    highlighted: true
  },
  {
    id: 'escape-from-worlds',
    title: 'Escape from Worlds (Multiplayer AI Game)',
    category: 'Individual Project',
    type: 'image',
    src: projectUnrealImg,
    responsibilities: [
      'Finite state machine in C++',
      'Melee + range combat system',
      'Custom collision checking',
      'UE4 build for Xbox One',
      'Custom projectile ‘batching’',
      'Two-pass shader using stencil buffer'
    ],
    link: '/PortfolioWebsite/projects/cyberwar', // Reusing link as per existing code
    highlighted: true
  },
  {
    id: 'infovisionverse',
    title: 'INFOVISIONVERSE: CONNECTING PEOPLE AND TECH IN VR',
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
    link: '/PortfolioWebsite/projects/cyberwar', // Reusing link as per existing code
    highlighted: true
  },
  {
    id: 'two-worlds',
    title: 'Two Worlds',
    category: 'Game Jam',
    type: 'video',
    src: twoWorldsVideo,
    responsibilities: [
      'Lead Programmer',
      'Finite state machine in C++',
      'Melee + range combat system',
      'Custom collision checking',
      'UE4 build for Xbox One',
      'Custom projectile ‘batching’',
      'Two-pass shader using stencil buffer'
    ],
    link: '/PortfolioWebsite/projects/two-worlds',
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
  }, 100)
})
</script>

<template>
  <div id="projects" class="container mx-auto lg:px-[5em] px-[9em] py-[50px]">
    <h3 class="uppercase font-atyp-display font-semibold lg:text-[4em] text-[40px] text-center mb-[40px]">
      My <span class="text-[#CCF303]">Projects</span>
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

    <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[45px]">
      <transition-group name="list">
        <div 
          v-for="project in filteredProjects" 
          :key="project.id"
          class="project-card font-atyp-display flex flex-col items-start gap-[24px] bg-[#FFFFFF05] p-6 rounded-[20px] border border-white/5 hover:border-[#CCF303]/30 transition-all duration-300"
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

          <router-link 
            v-if="project.link.startsWith('/')" 
            :to="project.link" 
            class="mt-auto w-full text-center hover:bg-[#CCF303] hover:text-black transition-all border border-[#CCF303] px-[23px] py-[10px] text-[16px] text-[#CCF303] font-medium rounded-lg"
          >
            Read more
          </router-link>
          <a 
            v-else 
            :href="project.link" 
            class="mt-auto w-full text-center hover:bg-[#CCF303] hover:text-black transition-all border border-[#CCF303] px-[23px] py-[10px] text-[16px] text-[#CCF303] font-medium rounded-lg"
          >
            View Project
          </a>
        </div>
      </transition-group>
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
</style>
