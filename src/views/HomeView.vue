<script setup>
import { onMounted, ref } from "vue";
import gsap from "gsap";
import Hero from '../components/Hero.vue';
import About from '../components/About.vue';
import HighlightedProjects from '../components/HighlightedProjects.vue';
import IndividualProjects from '../components/IndividualProjects.vue';
import TeamProjects from '../components/TeamProjects.vue';
import Contact from '../components/Contact.vue';
import Footer from '../components/Footer.vue';

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
  <div ref="containerRef">
    <Hero />
    <About />
    <HighlightedProjects />
    <IndividualProjects />
    <TeamProjects />
    <Contact />
  </div>
</template>
