<script setup>
import { onMounted, ref } from "vue";
import gsap from "gsap";
import Hero from '@/components/projects/Hero.vue';
import Video from '@/components/projects/Video.vue';
import Accordion from '@/components/projects/Accordion.vue';
import EmbedDemo from '@/components/projects/EmbedDemo.vue';
import CommentSection from '@/components/common/CommentSection.vue';
import infovisionVideo from '@/assets/videos/project-infovisionverse-vr-outstands-the-boundary-for-wor_1700864884999.mp4'

const containerRef = ref(null);
const showDemo = ref(false);

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
      title="INFOVISIONVERSE" 
      description="INFOVISIONVERSE is an immersive VR experience designed to connect people and technology. Developed as a group project using Unity3D for the Oculus Quest 2, this application pushes the boundaries of virtual interaction through custom locomotion, hand tracking, and a robust gameplay architecture. The project focuses on creating a seamless and intuitive environment for users to engage with complex technical concepts in a spatial context."
      type="Group Project"
      software="Unity3D"
      :languages="[
          'C#',
          'Oculus SDK',
      ]"
      download="/"
      :playDemo="true"
      @play-demo="showDemo = true"
      :backgroundVideo="infovisionVideo"
    />
    <div class="mt-11">
      <div v-if="!showDemo" class="space-y-4">
        <Accordion
          title="Finite State Machine in C#"
          content="Developed a comprehensive finite state machine in C# to manage complex interaction states and application flow.
  This architecture ensures predictable behavior across various VR scenarios, from navigation to intricate object manipulations, providing a stable foundation for the overall user experience."
          :isOpenDefault="true"
        />
        <Accordion
          title="VR Melee + Range Grab System"
          content="Engineered a sophisticated grab system that supports both close-quarters 'melee' interactions and distant 'range' grabbing.
  This allows users to intuitively interact with objects in the virtual space, utilizing physics-based constraints to maintain immersion and tactile feedback."
          :isOpenDefault="true"
        />
        <Accordion
          title="Custom Locomotion & Hand Tracking"
          content="Implemented specialized locomotion techniques tailored for VR to minimize motion sickness while maximizing exploration freedom.
  Additionally, integrated advanced hand-tracking capabilities, allowing users to interact with the digital world using natural hand gestures, significantly enhancing the sense of presence."
          :isOpenDefault="false"
        />
        <Accordion
          title="Custom Collision Checking"
          content="Developed optimized collision detection algorithms specifically for the VR environment.
  This system handles complex interactions between the user's virtual hands and various environmental objects, ensuring high-fidelity physical responses without compromising performance on mobile VR hardware."
          :isOpenDefault="false"
        />
        <Accordion
          title="Oculus Quest 2 Optimization"
          content="Focused on performance optimization for the standalone Oculus Quest 2 headset.
  This included implementing custom point 'batching' for rendering efficiency, optimizing physics calculations, and managing resource allocation to maintain a consistent high frame rate necessary for a comfortable VR experience."
          :isOpenDefault="false"
        />
      </div>

      <div v-else class="container mx-auto lg:px-[5em] px-[9em] py-5">
        <button 
          @click="showDemo = false" 
          class="mb-6 flex items-center gap-2 text-[#CCF303] hover:underline font-atyp-display"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Details
        </button>
        <EmbedDemo 
          url="http://ec2-44-201-193-90.compute-1.amazonaws.com/" 
          title="Infovisionverse Unity Demo" 
        />
      </div>
      
      <div class="container mx-auto lg:px-[5em] px-[9em] py-10">
        <CommentSection slug="project-infovisionverse" />
      </div>
    </div>
  </div>
</template>
