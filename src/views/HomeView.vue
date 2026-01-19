<script setup>
import { onMounted, ref } from "vue";
import gsap from "gsap";
import Hero from '../components/Hero.vue';
import About from '../components/About.vue';
import Projects from '../components/Projects.vue';
import ShippedGames from '../components/ShippedGames.vue';
import Blog from '../components/Blog.vue';    
import Contact from '../components/Contact.vue';
import Footer from '../components/Footer.vue';
import VideoBackground from '../components/VideoBackground.vue';
import AnimatedBackground from '../components/AnimatedBackground.vue';

const containerRef = ref(null);

onMounted(() => {
  gsap.from(containerRef.value.children, {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    ease: "power2.out"
  });
});
</script>

<template>
  <div ref="containerRef" class="relative">
    <!-- Animated background video (Home page only) -->
    <VideoBackground overlay="medium" />
    <Hero />
    <About />
    <!-- Scope the animated background to everything below About -->
    <section class="relative">
      <AnimatedBackground />
      <div class="relative z-10">
        <ShippedGames />
        <Projects />
        <Blog />
        <LinkedIn />
        <Contact />
      </div>
    </section>
  </div>
</template>
