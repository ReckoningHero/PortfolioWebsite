<script setup>
import { onMounted, ref } from "vue";
import gsap from "gsap";
import Hero from '@/components/projects/Hero.vue';
import Video from '@/components/projects/Video.vue';
import Accordion from '@/components/projects/Accordion.vue';

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
    <Hero 
      title="Cyberwar" 
      description="Cyberwar is a Third-Person Shooter made in Unreal Engine 4. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eros diam, vehicula sed velit vel, pretium gravida mauris. Aliquam in porta purus. Sed cursus tempus augue, vel dapibus nisl volutpat quis. In eget scelerisque nisl. Nulla convallis mattis pellentesque."
      type="Individual Project"
      software="Unreal Engine 4"
      :languages="[
          'C++',
          'Blueprints',
          'C#',
      ]"
      download="/"
    />
    <Video
      url="https://www.youtube.com/embed/CXBGa5J9VbI?si=0GQtrDjVt9em-cLc" 
    />
    <Accordion class="mt-[44px]"
      title="Finite State Machine (for character logic)"
      content="I developed a finite state machine which can be applied to any character (player, co-op players, AI) to support the rewrite of character logic at the start of the production phase. The state machine is quite simplistic, it features an ordered list of states, with the first few slots reserved for 'primary' states (walking, strafing, etc. - states which affect the lower body of the player) and 'secondary' states (shooting, aiming, etc. - states which affect the upper body). The state machine is written in C++, but is entirely accessible from Blueprints."
      :isOpenDefault="true"
    />
    <Accordion class="mt-[17px]"
      title="Combat System (melee, ranged, shielded)"
      content="I developed a finite state machine which can be applied to any character..."
      :isOpenDefault="false"
    />
    <Accordion class="mt-[17px]"
      title="Ranged Combat & Projectile Batching"
      content="I developed a finite state machine which can be applied to any character (player, co-op players, AI) to support the rewrite of character logic at the start of the production phase. The state machine is quite simplistic, it features an ordered list of states, with the first few slots reserved for 'primary' states (walking, strafing, etc. - states which affect the lower body of the player) and 'secondary' states (shooting, aiming, etc. - states which affect the upper body). The state machine is written in C++, but is entirely accessible from Blueprints."
      :isOpenDefault="false"
    />
    <Accordion class="mt-[17px]"
      title="Aim-assist with prioritization sorting"
      content="I developed a finite state machine which can be applied to any character..."
      :isOpenDefault="false"
    />
    <Accordion class="mt-[17px]"
      title="User Interface Implementation"
      content="I developed a finite state machine which can be applied to any character..."
      :isOpenDefault="false"
    />
    <Accordion class="mt-[17px]"
      title="Formation Selection Shader"
      content="I developed a finite state machine which can be applied to any character..."
      :isOpenDefault="false"
    />
    <Accordion class="mt-[17px]"
      title="Finite State Machine (for character logic)"
      content="I developed a finite state machine which can be applied to any character..."
      :isOpenDefault="false"
    />
  </div>
</template>
