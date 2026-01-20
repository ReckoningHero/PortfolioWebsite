<script setup>
import Navbar from '../../components/Navbar.vue';
</script>

<template>
  <div>
    <Navbar />
    
    <div class="container mx-auto lg:px-[5em] px-[9em] mt-[50px] mb-[100px]">
      <div class="max-w-4xl mx-auto">
        <!-- Blog post header -->
        <div class="mb-[40px]">
          <p class="text-[#CCF303] text-[16px] mb-[10px]">April 10, 2024</p>
          <h1 class="font-atyp-display font-semibold lg:text-[3em] text-[36px] mb-[20px]">Creating Realistic Character Animations</h1>
          <p class="font-atyp-display text-[#6B767F] lg:text-[1.25em] text-[18px]">
            A deep dive into character animation techniques that can bring your game characters to life.
          </p>
        </div>
        
        <!-- Featured image -->
        <div class="w-full h-[400px] overflow-hidden rounded-[1.375em] mb-[40px]">
          <img class="w-full h-full object-cover object-center" src="../../assets/images/ProjectUnreal.png" alt="Character Animation">
        </div>
        
        <!-- Blog content -->
        <div class="font-atyp-display lg:text-[1.125em] text-[16px] space-y-[30px]">
          <h2 class="font-semibold lg:text-[2em] text-[28px] text-white">The Art of Character Animation</h2>
          <p>
            Character animation is where technical skill meets artistic expression. Creating believable, responsive 
            character movements is essential for player immersion and emotional connection.
          </p>
          
          <h2 class="font-semibold lg:text-[2em] text-[28px] text-white">Animation Fundamentals</h2>
          <ul class="list-disc pl-[20px] space-y-[10px]">
            <li><span class="text-[#CCF303]">Anticipation:</span> Prepare the viewer for an action</li>
            <li><span class="text-[#CCF303]">Squash and Stretch:</span> Deform objects to emphasize weight</li>
            <li><span class="text-[#CCF303]">Follow-through:</span> Continue movement past the initial stopping point</li>
          </ul>
          
          <h2 class="font-semibold lg:text-[2em] text-[28px] text-white">Motion Capture vs. Keyframe Animation</h2>
          <p>
            <span class="text-[#CCF303]">Motion Capture:</span> Provides highly realistic movement by recording real actors. 
            In my CyberWar project, I used mocap for complex combat sequences.
          </p>
          <p>
            <span class="text-[#CCF303]">Keyframe Animation:</span> Offers greater creative control and stylization.
          </p>
          
          <h2 class="font-semibold lg:text-[2em] text-[28px] text-white">Animation Blending and State Machines</h2>
          <p>
            <span class="text-[#CCF303]">Animation Blending:</span> Smoothly transitions between animations by interpolating 
            between poses. This is crucial for responsive character control.
          </p>
          <p>
            <span class="text-[#CCF303]">State Machines:</span> Manage the logical flow between different animation states.
          </p>
          
          <h2 class="font-semibold lg:text-[2em] text-[28px] text-white">Conclusion</h2>
          <p>
            Creating realistic character animations is a blend of technical knowledge, artistic skill, and attention to detail. 
            By combining traditional animation principles with modern techniques, you can create characters that feel alive and responsive.
          </p>
          
          <div class="pt-[30px]">
            <router-link to="/PortfolioWebsite/#blog" class="text-[#CCF303] hover:underline">← Back to Blog</router-link>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>