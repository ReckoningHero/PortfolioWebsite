<script setup>
import { ref, computed } from 'vue'

const categories = ['All', 'Characters', 'Environments', 'Props', 'Vehicles']
const selectedCategory = ref('All')

const models = ref([
  {
    id: 1,
    title: 'Futuristic Sci-Fi Corridor',
    author: 'Joshua D. Nguyen',
    category: 'Environments',
    thumbnail: '/src/assets/images/ProjectUnreal.png',
    description: 'A highly detailed sci-fi corridor created with Unreal Engine 5, focusing on modularity and PBR materials.',
    tags: ['UE5', 'Sci-Fi', 'Environment']
  },
  {
    id: 2,
    title: 'Ancient Stone Guardian',
    author: 'Joshua D. Nguyen',
    category: 'Characters',
    thumbnail: '/src/assets/images/ProjectUnreal.png',
    description: 'Character sculpt of an ancient stone guardian, textured in Substance Painter.',
    tags: ['ZBrush', 'Character', 'Sculpt']
  },
  {
    id: 3,
    title: 'Cyberpunk Hover-Bike',
    author: 'Joshua D. Nguyen',
    category: 'Vehicles',
    thumbnail: '/src/assets/images/ProjectUnreal.png',
    description: 'A sleek hover-bike designed for a cyberpunk setting. High-poly model with procedural textures.',
    tags: ['Hard Surface', 'Vehicle', 'Cyberpunk']
  },
  {
    id: 4,
    title: 'Abandoned Laboratory',
    author: 'Joshua D. Nguyen',
    category: 'Environments',
    thumbnail: '/src/assets/images/ProjectUnreal.png',
    description: 'Internal view of an abandoned bio-hazard lab. Focus on lighting and atmospheric effects.',
    tags: ['UE5', 'Environment', 'Horror']
  },
  {
    id: 5,
    title: 'Ornate Fantasy Sword',
    author: 'Joshua D. Nguyen',
    category: 'Props',
    thumbnail: '/src/assets/images/ProjectUnreal.png',
    description: 'A fantasy sword with intricate gold engravings and magical runes.',
    tags: ['Prop', 'Fantasy', 'Weapon']
  },
  {
    id: 6,
    title: 'Stylized Forest Cabin',
    author: 'Joshua D. Nguyen',
    category: 'Environments',
    thumbnail: '/src/assets/images/ProjectUnreal.png',
    description: 'A cozy, stylized cabin in the middle of a dense forest. Low-poly with hand-painted textures.',
    tags: ['Stylized', 'Environment', 'Low-Poly']
  },
])

const filteredModels = computed(() => {
  if (selectedCategory.value === 'All') return models.value
  return models.value.filter(m => m.category === selectedCategory.value)
})

const selectedModel = ref(null)

function openModel(model) {
  selectedModel.value = model
  document.body.style.overflow = 'hidden'
}

function closeModel() {
  selectedModel.value = null
  document.body.style.overflow = 'auto'
}
</script>

<template>
  <div class="container mx-auto lg:px-[5em] px-[2em] py-10">
    <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
      <div>
        <h1 class="text-[28px] lg:text-[36px] font-atyp-display font-medium mb-1">3D Models</h1>
        <p class="text-white/70">Explore my collection of 3D models and digital art.</p>
      </div>

      <!-- Categories Bar (ArtStation Style) -->
      <div class="flex gap-4 overflow-x-auto no-scrollbar pb-2">
        <button 
          v-for="cat in categories" 
          :key="cat"
          @click="selectedCategory = cat"
          :class="[
            'px-4 py-1.5 rounded-full text-sm font-medium transition-all shrink-0',
            selectedCategory === cat 
              ? 'bg-[#CCF303] text-black' 
              : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
          ]"
        >
          {{ cat }}
        </button>
      </div>
    </div>
    
    <!-- Dense Grid (ArtStation Style) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div 
        v-for="model in filteredModels" 
        :key="model.id"
        class="group relative aspect-square overflow-hidden rounded-sm cursor-pointer bg-[#0b1520]"
        @click="openModel(model)"
      >
        <img 
          :src="model.thumbnail" 
          :alt="model.title"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        <!-- Hover Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 class="text-white font-medium text-lg leading-tight">{{ model.title }}</h3>
          <p class="text-white/70 text-sm">{{ model.author }}</p>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredModels.length === 0" class="py-20 text-center text-white/40">
      No models found in this category.
    </div>

    <!-- Detail Modal -->
    <transition name="fade">
      <div v-if="selectedModel" class="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/95" @click="closeModel"></div>
        
        <!-- Content -->
        <div class="relative w-full max-w-6xl max-h-full bg-[#0b1520] rounded-lg overflow-hidden flex flex-col lg:flex-row shadow-2xl">
          <!-- Image Area -->
          <div class="flex-1 bg-black flex items-center justify-center overflow-hidden">
            <img 
              :src="selectedModel.thumbnail" 
              :alt="selectedModel.title"
              class="max-w-full max-h-full object-contain"
            />
          </div>
          
          <!-- Info Area -->
          <div class="w-full lg:w-[350px] p-6 overflow-y-auto bg-[#0b1520] border-l border-white/10">
            <button 
              @click="closeModel"
              class="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <h2 class="text-2xl font-atyp-display font-medium text-white mb-1">{{ selectedModel.title }}</h2>
            <p class="text-[#CCF303] text-sm mb-4">{{ selectedModel.author }}</p>
            
            <div class="space-y-4">
              <div>
                <h4 class="text-xs uppercase tracking-widest text-white/40 mb-2 font-semibold">Description</h4>
                <p class="text-white/80 text-sm leading-relaxed">{{ selectedModel.description }}</p>
              </div>

              <div>
                <h4 class="text-xs uppercase tracking-widest text-white/40 mb-2 font-semibold">Category</h4>
                <span class="inline-block px-2 py-1 bg-white/5 rounded text-xs text-white/70">{{ selectedModel.category }}</span>
              </div>

              <div>
                <h4 class="text-xs uppercase tracking-widest text-white/40 mb-2 font-semibold">Tags</h4>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="tag in selectedModel.tags" 
                    :key="tag"
                    class="text-[11px] px-2 py-0.5 border border-white/10 rounded-full text-white/50"
                  >
                    #{{ tag }}
                  </span>
                </div>
              </div>
            </div>

            <div class="mt-8 pt-8 border-t border-white/10">
              <button class="w-full py-3 bg-[#CCF303] text-black font-medium rounded hover:bg-[#b8db03] transition-colors">
                View on ArtStation
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// For the transition
export default {
  inheritAttrs: false
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
