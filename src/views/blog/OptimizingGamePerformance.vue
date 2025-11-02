<script setup>
import Navbar from '../../components/Navbar.vue';
import Footer from '../../components/Footer.vue';
</script>

<template>
  <div>
    <Navbar />
    
    <div class="container mx-auto lg:px-[5em] px-[9em] mt-[50px] mb-[100px]">
      <div class="max-w-4xl mx-auto">
        <!-- Blog post header -->
        <div class="mb-[40px]">
          <p class="text-[#CCF303] text-[16px] mb-[10px]">May 28, 2024</p>
          <h1 class="font-atyp-display font-semibold lg:text-[3em] text-[36px] mb-[20px]">Optimizing Game Performance</h1>
          <p class="font-atyp-display text-[#6B767F] lg:text-[1.25em] text-[18px]">
            Tips and tricks for improving your game's performance across different platforms and hardware configurations.
          </p>
        </div>
        
        <!-- Featured image -->
        <div class="w-full h-[400px] overflow-hidden rounded-[1.375em] mb-[40px]">
          <img class="w-full h-full object-cover object-center" src="../../assets/images/ProjectUnreal.png" alt="Game Performance Optimization">
        </div>
        
        <!-- Blog content -->
        <div class="font-atyp-display lg:text-[1.125em] text-[16px] space-y-[30px]">
          <h2 class="font-semibold lg:text-[2em] text-[28px] text-white">Introduction</h2>
          <p>
            Performance optimization is a critical aspect of game development that can make or break the player experience. 
            As games become more complex and visually stunning, the demand for efficient resource usage increases. 
            In this article, I'll share some of the techniques and approaches I've used in my projects to ensure smooth 
            gameplay across different platforms and hardware configurations.
          </p>
          
          <h2 class="font-semibold lg:text-[2em] text-[28px] text-white">CPU Optimization Techniques</h2>
          <p>
            The CPU handles game logic, AI, physics calculations, and more. Here are some strategies to optimize CPU usage:
          </p>
          <ul class="list-disc pl-[20px] space-y-[10px]">
            <li><span class="text-[#CCF303]">Object Pooling:</span> Instead of constantly creating and destroying objects (like projectiles or enemies), pre-allocate a pool of objects and reuse them. This significantly reduces garbage collection overhead.</li>
            <li><span class="text-[#CCF303]">Level of Detail (LOD):</span> Implement different complexity levels for game logic based on distance or importance. For example, simplify AI behavior for distant enemies.</li>
            <li><span class="text-[#CCF303]">Multithreading:</span> Distribute workloads across multiple CPU cores. In my CyberWar project, I offloaded physics calculations and AI pathfinding to separate threads.</li>
            <li><span class="text-[#CCF303]">Finite State Machines:</span> Use efficient state management to control game object behavior, reducing unnecessary checks and calculations.</li>
          </ul>
          
          <h2 class="font-semibold lg:text-[2em] text-[28px] text-white">GPU Optimization Techniques</h2>
          <p>
            The GPU handles rendering, shaders, and visual effects. Here's how to keep your frame rates high:
          </p>
          <ul class="list-disc pl-[20px] space-y-[10px]">
            <li><span class="text-[#CCF303]">Texture Atlasing:</span> Combine multiple textures into a single larger texture to reduce draw calls and state changes.</li>
            <li><span class="text-[#CCF303]">Shader Complexity:</span> Optimize shader code and use shader variants for different quality settings.</li>
            <li><span class="text-[#CCF303]">Occlusion Culling:</span> Don't render objects that are not visible to the camera. Both Unity and Unreal Engine provide tools for this.</li>
            <li><span class="text-[#CCF303]">Batching:</span> Combine similar meshes to reduce draw calls. In my projects, I implemented custom batching for projectiles and particle effects.</li>
          </ul>
          
          <h2 class="font-semibold lg:text-[2em] text-[28px] text-white">Memory Management</h2>
          <p>
            Efficient memory usage is crucial, especially for console and mobile platforms:
          </p>
          <ul class="list-disc pl-[20px] space-y-[10px]">
            <li><span class="text-[#CCF303]">Asset Streaming:</span> Load and unload assets dynamically based on player location and game state.</li>
            <li><span class="text-[#CCF303]">Texture Compression:</span> Use appropriate compression formats for different platforms (e.g., BC for PC/Xbox, ASTC for mobile).</li>
            <li><span class="text-[#CCF303]">Memory Budgets:</span> Establish clear memory budgets for different game systems and monitor usage during development.</li>
          </ul>
          
          <h2 class="font-semibold lg:text-[2em] text-[28px] text-white">Cross-Platform Considerations</h2>
          <p>
            When developing for multiple platforms, consider these approaches:
          </p>
          <ul class="list-disc pl-[20px] space-y-[10px]">
            <li><span class="text-[#CCF303]">Scalable Content:</span> Design assets and systems that can scale up or down based on the target platform.</li>
            <li><span class="text-[#CCF303]">Platform-Specific Optimizations:</span> Leverage unique hardware features (e.g., Xbox Series X's Velocity Architecture).</li>
            <li><span class="text-[#CCF303]">Quality Settings:</span> Implement comprehensive quality presets that users can adjust based on their hardware.</li>
          </ul>
          
          <h2 class="font-semibold lg:text-[2em] text-[28px] text-white">Profiling and Measurement</h2>
          <p>
            You can't optimize what you don't measure. Here's my approach to performance profiling:
          </p>
          <ul class="list-disc pl-[20px] space-y-[10px]">
            <li><span class="text-[#CCF303]">Regular Profiling:</span> Make profiling a regular part of your development cycle, not just something you do when problems arise.</li>
            <li><span class="text-[#CCF303]">Targeted Optimization:</span> Focus on the most significant bottlenecks first. In my experience, 20% of your code often causes 80% of performance issues.</li>
            <li><span class="text-[#CCF303]">Benchmark Scenes:</span> Create specific test scenes that stress different aspects of your game.</li>
          </ul>
          
          <h2 class="font-semibold lg:text-[2em] text-[28px] text-white">Conclusion</h2>
          <p>
            Performance optimization is an ongoing process that requires attention throughout the development cycle. 
            By implementing these techniques in my projects, I've been able to deliver smooth gameplay experiences 
            across different platforms, from Xbox consoles to VR headsets. Remember that the goal isn't just to make 
            your game run fast on high-end hardware, but to ensure it's accessible to as many players as possible.
          </p>
          
          <div class="pt-[30px]">
            <router-link :to="{ path: '/', hash: '#blog' }" class="text-[#CCF303] hover:underline">← Back to Blog</router-link>
          </div>
        </div>
      </div>
    </div>
    
    <Footer />
  </div>
</template>