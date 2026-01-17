<script setup>
import { ref } from 'vue'
import resumePdf from '@/assets/doc/Joshua_D_Nguyen_Resume_2025.pdf'

const isLoading = ref(true)

function onLoaded() {
  isLoading.value = false
}
</script>

<template>
  <div class="max-w-[1400px] mx-auto lg:px-[5em] px-[2em] py-10 min-h-screen flex flex-col pt-[120px]">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-[28px] lg:text-[36px] font-atyp-display font-medium">Resume</h1>
      <a 
        :href="resumePdf" 
        download="Joshua_D_Nguyen_Resume_2025.pdf"
        class="bg-[#CCF303] text-black font-atyp-display font-medium px-5 py-2 rounded hover:bg-[#b8da02] transition-colors"
      >
        Download PDF
      </a>
    </div>

    <div class="flex-grow bg-[#0b1520] rounded-lg border border-white/10 overflow-hidden relative min-h-[80vh] lg:min-h-[1100px] h-[calc(100vh-250px)]">
      <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-[#0b1520] z-10 text-center p-4">
        <div class="flex flex-col items-center gap-4">
          <div class="text-[#CCF303] animate-pulse">Loading Resume...</div>
          <p class="text-white/60 text-sm">If the preview doesn't load, you can download it directly.</p>
          <a :href="resumePdf" target="_blank" class="text-[#CCF303] underline">Open in new tab</a>
        </div>
      </div>
      <iframe 
        :src="`${resumePdf}#view=FitH&toolbar=0&navpanes=0`" 
        class="absolute inset-0 w-full h-full border-none" 
        @load="onLoaded"
      ></iframe>
    </div>
  </div>
</template>

<style scoped>
/* Ensure the container takes up enough height for the iframe */
</style>
