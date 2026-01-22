<script setup>
defineProps({
    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: 'Game Demo'
    }
})
</script>

<template>
    <div class="container mx-auto lg:px-[5em] px-[9em] py-10">
        <div class="relative w-full aspect-video rounded-[1.375em] overflow-hidden border border-white/10 bg-black shadow-2xl">
            <iframe 
                :src="url" 
                :title="title"
                class="absolute inset-0 w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
            ></iframe>
        </div>
        <p class="text-[#6B767F] text-center mt-4 font-atyp-display italic text-sm">
            Note: If the demo doesn't load, ensure your browser allows content from the provided URL.
        </p>
    </div>
</template>

<style scoped>
/* Ensure the iframe container maintains a good aspect ratio */
</style>
