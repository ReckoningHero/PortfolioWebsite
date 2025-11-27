<script setup>
import { ref, computed } from 'vue'

// NOTE: Using 2 posts per page so Previous/Next is meaningful with the current 4 posts.
// Adjust `pageSize` to 4 later if you prefer showing a full grid at once.
const pageSize = 2
const currentPage = ref(1)

const posts = ref([
  {
    slug: 'unreal-engine-5',
    date: 'June 15, 2024',
    title: 'Getting Started with Unreal Engine 5',
    excerpt:
      'Exploring the new features of Unreal Engine 5 and how they can revolutionize your game development workflow.',
    image: '../assets/images/ProjectUnreal.png',
    to: '/blog/unreal-engine-5',
  },
  {
    slug: 'optimizing-game-performance',
    date: 'May 28, 2024',
    title: 'Optimizing Game Performance',
    excerpt:
      "Tips and tricks for improving your game's performance across different platforms and hardware configurations.",
    image: '../assets/images/Optimizing-Performance-in-Browser-Based-Game-Development.jpg',
    to: '/blog/optimizing-game-performance',
  },
  {
    slug: 'character-animations',
    date: 'April 10, 2024',
    title: 'Creating Realistic Character Animations',
    excerpt:
      'A deep dive into character animation techniques that can bring your game characters to life.',
    image: '../assets/images/ProjectUnreal.png',
    to: '/blog/character-animations',
  },
  {
    slug: 'xbox-development',
    date: 'March 5, 2024',
    title: 'Game Development for Xbox Series X',
    excerpt:
      'Insights into developing games for the latest Xbox console and leveraging its powerful hardware.',
    image: '../assets/images/ProjectUnreal.png',
    to: '/blog/xbox-development',
  },
])

const totalPages = computed(() => Math.max(1, Math.ceil(posts.value.length / pageSize)))
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return posts.value.slice(start, start + pageSize)
})

function prevPage() {
  if (currentPage.value > 1) currentPage.value -= 1
}
function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value += 1
}
</script>

<template>
  <div id="blog" class="container mx-auto lg:px-[5em] px-[9em] mt-[50px]">
    <h3 class="uppercase font-atyp-display font-semibold lg:text-[4em] text-[40px] text-center">
      My <span class="text-[#CCF303]">Blog</span>
    </h3>

    <!-- Cards Grid -->
    <div class="grid lg:grid-cols-2 grid-cols-1 gap-[45px] mt-[62px]">
      <div
        v-for="post in paginatedPosts"
        :key="post.slug"
        class="font-atyp-display flex flex-col items-start gap-[24px] bg-[#0B1217] rounded-[1.375em] overflow-hidden"
      >
        <div class="w-full h-[250px] overflow-hidden">
          <img class="w-full h-full object-cover object-center" :src="post.image" :alt="post.title" />
        </div>
        <div class="px-[30px] pb-[30px]">
          <p class="text-[#CCF303] text-[14px] mb-[10px]">{{ post.date }}</p>
          <h5 class="font-semibold lg:text-[1.56em] text-[24px] text-white mb-[15px]">{{ post.title }}</h5>
          <p class="font-medium lg:text-[1.125em] text-[16px] text-[#6B767F] mb-[20px]">
            {{ post.excerpt }}
          </p>
          <router-link :to="post.to" class="text-[#CCF303] hover:underline">Read more →</router-link>
        </div>
      </div>
    </div>

    <!-- Previous / Next controls -->
    <div class="flex items-center justify-center gap-4 mt-[40px] font-atyp-display">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 rounded border border-[#2A3540] text-white disabled:opacity-40 hover:border-[#CCF303] transition"
        aria-label="Previous posts"
      >
        ← Previous
      </button>
      <span class="text-[#6B767F]">Page {{ currentPage }} / {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 rounded border border-[#2A3540] text-white disabled:opacity-40 hover:border-[#CCF303] transition"
        aria-label="Next posts"
      >
        Next →
      </button>
    </div>
  </div>
</template>