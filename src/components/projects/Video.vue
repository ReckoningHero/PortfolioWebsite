<script setup>
defineProps({
    url: {
        type: String,
        required: true,
        default: "https://youtube.com/"
    }
})
</script>

<template>
    <div class="container mx-auto lg:px-[5em] px-[9em] text-white">
        <video 
            v-if="url.endsWith('.mp4')"
            class="w-full h-auto max-h-[623px] rounded-lg shadow-lg" 
            controls 
            autoplay 
            muted 
            loop 
            :src="url"
        >
            Your browser does not support the video tag.
        </video>
        <iframe v-else width="100%" height="623" :src="url" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
</template>