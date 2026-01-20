<script setup>
import { onMounted, ref } from "vue";
import gsap from "gsap";
import Hero from '@/components/projects/Hero.vue';
import Video from '@/components/projects/Video.vue';
import Accordion from '@/components/projects/Accordion.vue';
import CommentSection from '@/components/common/CommentSection.vue';

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
      description="Cyberwar is a Third-Person Shooter developed independently using Unreal Engine 4. Leveraging the Gameplay Ability System, this project showcases advanced gameplay mechanics including a sophisticated combat system, custom AI behaviors, and optimized performance features. The game combines strategic combat elements with fast-paced action, utilizing both ranged and melee combat systems powered by a robust ability framework."
      type="Individual Project"
      software="Unreal Engine 4"
      :languages="[
          'C++',
          'Blueprints',
          'C#',
      ]"
      download="/"
    />
    <div class="space-y-4 mt-11">
      <Accordion
        title="Gameplay Ability System Implementation"
        content="Implemented Unreal Engine's Gameplay Ability System (GAS) to create a flexible and extensible framework for character abilities.
This system manages all character capabilities including basic movement, combat abilities, and status effects.
The implementation includes custom gameplay effects, attribute sets, and ability tasks, providing a solid foundation for rapid ability prototyping and complex gameplay mechanics."
        :isOpenDefault="true"
      />
      <Accordion
        title="Finite State Machine (for character logic)"
        content="I developed a finite state machine which can be applied to any character (player, co-op players, AI) to support the rewrite of character logic at the start of the production phase.
The state machine is quite simplistic, it features an ordered list of states, with the first few slots reserved for 'primary' states (walking, strafing, etc. - states which affect the lower body of the player) and 'secondary' states (shooting, aiming, etc. - states which affect the upper body).
The state machine is written in C++, but is entirely accessible from Blueprints."
        :isOpenDefault="true"
      />
      <Accordion
        title="Combat System (melee, ranged, shielded)"
        content="Implemented a versatile combat system supporting both melee and ranged combat styles.
The system includes weapon switching mechanics, damage calculations, and hit detection.
Shield mechanics feature dynamic protection levels and regeneration systems, adding strategic depth to combat encounters."
        :isOpenDefault="false"
      />
      <Accordion
        title="Ranged Combat & Projectile Batching"
        content="Optimized ranged combat performance through projectile batching, reducing CPU overhead during intense firefights.
Implemented projectile pooling system to manage memory efficiently and handle multiple simultaneous projectiles without performance degradation."
        :isOpenDefault="false"
      />
      <Accordion
        title="Aim-assist with prioritization sorting"
        content="Developed an intelligent aim-assist system that uses priority-based target selection.
The system considers factors such as distance, threat level, and line of sight to determine the most relevant target, enhancing gameplay experience while maintaining challenge."
        :isOpenDefault="false"
      />
      <Accordion
        title="User Interface Implementation"
        content="Designed and implemented a responsive game UI system using UMG (Unreal Motion Graphics).
Created dynamic HUD elements including health bars, ammunition counters, and interactive menus, all with smooth animations and clear visual feedback."
        :isOpenDefault="false"
      />
      <Accordion
        title="Formation Selection Shader"
        content="Created a custom shader for highlighting unit formations and selection areas.
The shader includes dynamic color changes based on valid/invalid placement zones and smooth fade effects for better visual feedback during unit selection and movement."
        :isOpenDefault="false"
      />
      <div class="container mx-auto lg:px-[5em] px-[9em] py-10">
        <CommentSection slug="project-cyberwar" />
      </div>
    </div>
  </div>
</template>
