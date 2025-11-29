<script setup>
import { computed, ref, onMounted } from 'vue'
// Import the background video as a module so Vite bundles it correctly
import bgVideo from '../assets/videos/heart-of-the-singularity.1920x1080.mp4'

const props = defineProps({
  overlay: {
    type: String,
    default: 'medium', // 'light' | 'medium' | 'dark'
  },
  enableOnMobile: {
    type: Boolean,
    default: true,
  },
  honorReducedMotion: {
    type: Boolean,
    default: true,
  },
})

const overlayAlpha = computed(() => {
  switch (props.overlay) {
    case 'light':
      return 0.25
    case 'dark':
      return 0.6
    case 'medium':
    default:
      return 0.4
  }
})

const overlayStyle = computed(() => ({
  background: `linear-gradient(rgba(0,0,0,${overlayAlpha.value}), rgba(0,0,0,${overlayAlpha.value}))`,
}))

// Determine if we should show the video (respect reduced motion if enabled)
const showVideo = ref(true)
onMounted(() => {
  if (props.honorReducedMotion && window?.matchMedia) {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => (showVideo.value = !mq.matches)
    update()
    // Listen for changes
    if (mq.addEventListener) mq.addEventListener('change', update)
    else if (mq.addListener) mq.addListener(update)
  }
})
</script>

<template>
  <!-- Fixed full-viewport background video. Pointer-events disabled so it never blocks UI. -->
  <div class="fixed inset-0 pointer-events-none z-0">
    <video
      class="w-full h-full object-cover"
      :class="{ 'hidden sm:block': !props.enableOnMobile }"
      :aria-hidden="true"
      v-if="showVideo"
      autoplay
      muted
      loop
      playsinline
      preload="metadata"
    >
      <source :src="bgVideo" type="video/mp4" />
    </video>
    <!-- Overlay to ensure foreground text remains readable -->
    <div class="absolute inset-0" :style="overlayStyle"></div>
  </div>
</template>

<style scoped>
</style>
