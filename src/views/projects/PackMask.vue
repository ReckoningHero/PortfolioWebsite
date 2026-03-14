<script setup>
import { onMounted, ref } from "vue";
import gsap from "gsap";
import Hero from '@/components/projects/Hero.vue';
import Accordion from '@/components/projects/Accordion.vue';
import CommentSection from '@/components/common/CommentSection.vue';
import packMaskVideo from '@/assets/videos/ProjectMask.mp4'

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
      title="Pack-Mask" 
      description="Pack-Mask is a fast-paced game jam project centered around a unique mask-switching mechanic and pellet-based economy. As a Gameplay Programmer, I was responsible for the core interaction logic, including the 'Pay/Lockout' system for masks, complex collision handling while masks are equipped, and the seamless transition between stages via an event-driven spawning system."
      type="Game Jam"
      software="Unreal Engine"
      :languages="[
          'C++',
          'Blueprints',
      ]"
      download="/"
      jamLink="https://globalgamejam.org/games/2026/pack-mask-9"
      githubLink="https://github.com/twinb0rngamejam/GameJam2026"
      :backgroundVideo="packMaskVideo"
    />
    <div class="space-y-4 mt-11">
      <Accordion
        title="Programming & Core Logic"
        content="Implemented the Pay/Lockout system for Masks using collected Pellets as currency.
Developed custom Collision Logic tailored to different Mask types and their respective abilities.
Built the Mask Equip Logic, allowing players to switch between acquired masks dynamically.
Designed the stage spawning logic driven by game events to manage level flow and progression.
Created the Exit Portal system, which activates only after all level masks are acquired.
Handled the music and sound integration, ensuring synchronization with gameplay events like pellet collection and kills."
        :isOpenDefault="true"
      />
      <Accordion
        title="Gameplay Mechanics"
        content="Mask Economy: Players must collect Pellets to unlock or pay for mask usage, adding a strategic layer to resource management.
Level Progression: Levels are completed when all masks are acquired and the player reaches the physical exit portal.
Dynamic Spawning: Picking up a mask triggers the spawning of more of that specific type in the staging area, encouraging specialized playstyles.
Advanced AI: Implemented a 'walk back' state where enemies turn grey and become vulnerable when eaten, similar to classic arcade mechanics."
        :isOpenDefault="true"
      />
      <Accordion
        title="Technical Challenges & UI"
        content="Bug Fixing: Debugged and partially solved a complex Portal Teleportation issue involving coordinate translation across levels.
Mask Inventory UI: Developed a responsive UI that indicates mask status (Grey if not owned, Colored if in inventory, Glowing if equipped).
Payment Billboard: Created in-world UI billboards to clearly display mask costs to the player.
Multi-class Spawning: Separated mask types into distinct classes to allow for scalable and varied spawning logic."
        :isOpenDefault="false"
      />
      <Accordion
        title="Art & Audio Integration"
        content="Integrated mask meshes and low-priority animations into the Unreal Engine environment.
Collaborated on level layout using kitbash sets to rapidly build out multiple stages.
Soundscapes: Integrated a full audio suite including menu/match music, pellet pickup sounds, and distinct SFX for player death and enemy kills.
Visual Feedback: Ensured clear physical representation of the exit portal and mask acquisition states."
        :isOpenDefault="false"
      />
    </div>
    
    <div class="container mx-auto lg:px-[5em] px-[9em] py-10">
        <CommentSection slug="project-pack-mask" />
        <div class="mt-12">
            <router-link :to="{ path: '/', hash: '#projects' }" class="text-[#CCF303] hover:underline">← Back to Projects</router-link>
        </div>
    </div>
  </div>
</template>

<style scoped>
</style>
