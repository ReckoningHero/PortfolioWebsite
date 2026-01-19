<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import AIChat from './components/AIChat.vue'

import { useRoute } from "vue-router";
import { onMounted, watch } from "vue";

const route = useRoute();

const scrollToAnchor = () => {
  if (route.hash) {
    const element = document.querySelector(route.hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
};

onMounted(scrollToAnchor);
watch(() => route.hash, scrollToAnchor);
</script>

<template>
  <Navbar />

  <RouterView />

  <AIChat />

  <Footer />
</template>
