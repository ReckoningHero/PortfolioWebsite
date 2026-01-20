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
          <p class="text-[#CCF303] text-[16px] mb-[10px]">March 5, 2024</p>
          <h1 class="font-atyp-display font-semibold lg:text-[3em] text-[36px] mb-[20px]">Game Development for Xbox Series X</h1>
          <p class="font-atyp-display text-[#6B767F] lg:text-[1.25em] text-[18px]">
            Insights into developing games for the latest Xbox console and leveraging its powerful hardware.
          </p>
        </div>
        
        <!-- Featured image -->
        <div class="w-full h-[400px] overflow-hidden rounded-[1.375em] mb-[40px]">
          <img class="w-full h-full object-cover object-center" src="../../assets/images/ProjectUnreal.png" alt="Xbox Development">
        </div>
        
        <!-- Blog content -->
        <div class="font-atyp-display lg:text-[1.125em] text-[16px] space-y-[30px]">
          <h2 class="font-semibold lg:text-[2em] text-[28px] text-white">Developing for Xbox Series X</h2>
          <p>
            The Xbox Series X represents a significant leap in console hardware capabilities. As a developer who has worked on Xbox titles, I've experienced firsthand how this powerful hardware can transform game development.
          </p>
          
          <h2 class="font-semibold lg:text-[2em] text-[28px] text-white">Hardware Advantages</h2>
          <ul class="list-disc pl-[20px] space-y-[10px]">
            <li><span class="text-[#CCF303]">Custom AMD RDNA 2 GPU:</span> Enables ray tracing and advanced lighting effects</li>
            <li><span class="text-[#CCF303]">Velocity Architecture:</span> Dramatically reduces load times and enables larger worlds</li>
            <li><span class="text-[#CCF303]">DirectX 12 Ultimate:</span> Provides advanced graphics features and optimizations</li>
          </ul>
          
          <h2 class="font-semibold lg:text-[2em] text-[28px] text-white">Development Environment</h2>
          <p>
            Xbox development uses a familiar environment for Windows developers, with excellent integration with Unreal Engine and Unity. The Xbox Development Kit (XDK) provides powerful tools for optimization and debugging.
          </p>
          
          <h2 class="font-semibold lg:text-[2em] text-[28px] text-white">Performance Optimization</h2>
          <p>
            When developing for Xbox Series X, I focus on these optimization strategies:
          </p>
          <ul class="list-disc pl-[20px] space-y-[10px]">
            <li>Leveraging hardware-accelerated ray tracing for realistic lighting</li>
            <li>Using the SSD for faster asset streaming and reduced load times</li>
            <li>Implementing Smart Delivery to optimize for different Xbox hardware</li>
          </ul>
          
          <h2 class="font-semibold lg:text-[2em] text-[28px] text-white">Conclusion</h2>
          <p>
            Developing for Xbox Series X offers exciting opportunities to create visually stunning and technically impressive games. With the right approach to optimization, developers can create experiences that truly showcase the console's capabilities.
          </p>
          
          <div class="pt-[30px]">
            <router-link to="/PortfolioWebsite/#blog" class="text-[#CCF303] hover:underline">← Back to Blog</router-link>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>