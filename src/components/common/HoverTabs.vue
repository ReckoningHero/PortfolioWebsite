<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'

const props = defineProps({
  tabs: {
    type: Array,
    required: true, // [{ id: string, label: string }]
  },
  initialId: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['change'])

const activeId = ref(props.initialId || (props.tabs[0] && props.tabs[0].id) || null)
const tabRefs = ref([]) // array of element refs
const indicatorStyle = ref({ left: '0px', width: '0px' })
const isTouch = ref(false)
const hoverDelayMs = 60 // small delay to avoid flicker
let hoverTimer = null

function detectTouch() {
  isTouch.value = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0)
}

function setActive(id, fromKeyboard = false) {
  if (!id || id === activeId.value) return
  activeId.value = id
  emit('change', id)
  // If activation came from keyboard, move focus to the active tab for ARIA roving focus
  if (fromKeyboard) {
    const idx = props.tabs.findIndex(t => t.id === id)
    const el = tabRefs.value[idx]
    if (el) el.focus()
  }
  nextTick(updateIndicator)
}

function scheduleHoverActivate(id) {
  if (isTouch.value) return // hover disabled on touch
  clearTimeout(hoverTimer)
  hoverTimer = setTimeout(() => setActive(id), hoverDelayMs)
}

function cancelHover() {
  clearTimeout(hoverTimer)
}

function updateIndicator() {
  const idx = props.tabs.findIndex(t => t.id === activeId.value)
  const el = tabRefs.value[idx]
  if (!el) return
  const parent = el.parentElement
  const rect = el.getBoundingClientRect()
  const parentRect = parent.getBoundingClientRect()
  indicatorStyle.value = {
    left: `${rect.left - parentRect.left}px`,
    width: `${rect.width}px`,
  }
}

function onKeydown(e, idx) {
  const max = props.tabs.length - 1
  let nextIdx = idx
  switch (e.key) {
    case 'ArrowRight':
    case 'Right':
      nextIdx = idx === max ? 0 : idx + 1
      e.preventDefault()
      break
    case 'ArrowLeft':
    case 'Left':
      nextIdx = idx === 0 ? max : idx - 1
      e.preventDefault()
      break
    case 'Home':
      nextIdx = 0
      e.preventDefault()
      break
    case 'End':
      nextIdx = max
      e.preventDefault()
      break
    case 'Enter':
    case ' ': // Space
      setActive(props.tabs[idx].id, true)
      e.preventDefault()
      return
    default:
      return
  }
  const nextEl = tabRefs.value[nextIdx]
  if (nextEl) nextEl.focus()
}

function onResize() {
  nextTick(updateIndicator)
}

onMounted(() => {
  detectTouch()
  window.addEventListener('resize', onResize)
  nextTick(updateIndicator)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
  clearTimeout(hoverTimer)
})

watch(() => props.tabs, () => {
  nextTick(updateIndicator)
})

defineExpose({ activeId })
</script>

<template>
  <div class="w-full">
    <div
      class="relative flex gap-6 overflow-x-auto no-scrollbar border-b border-white/10"
      role="tablist"
      aria-label="Sections"
      @mouseleave="cancelHover"
    >
      <button
        v-for="(t, i) in tabs"
        :key="t.id"
        ref="tabRefs"
        class="relative shrink-0 py-3 text-[1.1rem] lg:text-[1.1875em] font-atyp-display font-medium text-white/80 hover:text-white focus:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CCF303]/60"
        :id="`tab-${t.id}`"
        role="tab"
        :tabindex="activeId === t.id ? 0 : -1"
        :aria-selected="activeId === t.id"
        :aria-controls="`panel-${t.id}`"
        @mouseenter="scheduleHoverActivate(t.id)"
        @focus="scheduleHoverActivate(t.id)"
        @click="setActive(t.id)"
        @keydown="(e) => onKeydown(e, i)"
      >
        <span :class="[activeId === t.id ? 'text-[#CCF303]' : '']">{{ t.label }}</span>
      </button>

      <!-- Sliding underline indicator -->
      <span
        class="pointer-events-none absolute bottom-0 h-[2px] bg-[#CCF303] transition-all duration-200 ease-out"
        :style="{ left: indicatorStyle.left, width: indicatorStyle.width }"
        aria-hidden="true"
      />
    </div>

    <!-- Panels are provided by parent via scoped slot -->
    <div class="mt-6">
      <slot :active-id="activeId"></slot>
    </div>
  </div>
  
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
