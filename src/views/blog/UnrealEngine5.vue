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
          <p class="text-[#CCF303] text-[16px] mb-[10px]">June 15, 2024</p>
          <h1 class="font-atyp-display font-semibold lg:text-[3em] text-[36px] mb-[20px]">Getting Started with Unreal Engine 5</h1>
          <p class="font-atyp-display text-[#6B767F] lg:text-[1.25em] text-[18px]">
            Exploring the new features of Unreal Engine 5 and how they can revolutionize your game development workflow.
          </p>
        </div>
        
        <!-- Featured image -->
        <div class="w-full h-[400px] overflow-hidden rounded-[1.375em] mb-[40px]">
          <img class="w-full h-full object-cover object-center" src="../../assets/images/ProjectUnreal.png" alt="Unreal Engine 5">
        </div>
        
        <!-- Blog content -->
        <div class="font-atyp-display lg:text-[1.125em] text-[16px] space-y-[30px]">
          <h2 class="font-semibold lg:text-[2em] text-[28px] text-white">Introduction to Unreal Engine 5</h2>
          <p>
            Unreal Engine 5 represents a significant leap forward in game development technology. With revolutionary 
            features like Nanite and Lumen, UE5 is changing how developers approach creating immersive worlds. In this 
            article, I'll walk through the key features and how to get started with this powerful engine.
          </p>
          
          <h2 class="font-semibold lg:text-[2em] text-[28px] text-white">Key Features of Unreal Engine 5</h2>
          
          <h3 class="font-semibold lg:text-[1.5em] text-[22px] text-[#CCF303]">Nanite Virtualized Geometry</h3>
          <p>
            Nanite is a virtualized micropolygon geometry system that enables you to create games with massive amounts of 
            geometric detail. It works by intelligently streaming and processing only the detail you can perceive, allowing 
            for film-quality source art to be imported directly into UE5.
          </p>
          <p>
            In my recent projects, I've used Nanite to import highly detailed environmental assets without worrying about 
            polygon count or creating LODs manually. This has dramatically reduced the time spent on optimization while 
            improving visual fidelity.
          </p>
          
          <h3 class="font-semibold lg:text-[1.5em] text-[22px] text-[#CCF303]">Lumen Global Illumination</h3>
          <p>
            Lumen is UE5's fully dynamic global illumination and reflections system. It renders diffuse interreflection 
            with infinite bounces and indirect specular reflections in real-time, eliminating the need for baking lightmaps 
            or setting up reflection captures.
          </p>
          <p>
            The impact on development workflow is substantial—lighting changes can be made on the fly, and dynamic objects 
            interact naturally with the lighting environment. This has been particularly useful for creating dynamic time-of-day 
            systems in my open-world projects.
          </p>
          
          <h3 class="font-semibold lg:text-[1.5em] text-[22px] text-[#CCF303]">World Partition System</h3>
          <p>
            The World Partition system automatically divides the world into a grid and streams the necessary cells based on 
            player position. This makes it much easier to create and manage large open worlds without manually setting up 
            streaming levels.
          </p>
          
          <h2 class="font-semibold lg:text-[2em] text-[28px] text-white">Setting Up Your First UE5 Project</h2>
          <p>
            Getting started with UE5 is straightforward. Here's a quick guide to setting up your first project:
          </p>
          <ol class="list-decimal pl-[20px] space-y-[10px]">
            <li>Download and install the Epic Games Launcher from the official website.</li>
            <li>Install Unreal Engine 5 through the launcher.</li>
            <li>Create a new project using one of the templates (I recommend starting with the "Games" templates).</li>
            <li>Choose between Blueprint-only or C++ project based on your programming comfort level.</li>
            <li>Select your project settings, including target platforms and quality presets.</li>
          </ol>
          
          <h2 class="font-semibold lg:text-[2em] text-[28px] text-white">Blueprint vs. C++</h2>
          <p>
            UE5 continues to support both visual scripting through Blueprints and traditional programming with C++. 
            For beginners, I recommend starting with Blueprints to understand the engine's architecture and workflow.
          </p>
          <p>
            In my projects, I typically use a hybrid approach—implementing core systems and performance-critical 
            features in C++, while using Blueprints for rapid prototyping and game-specific logic. This combination 
            offers the best balance between development speed and runtime performance.
          </p>
          
          <h2 class="font-semibold lg:text-[2em] text-[28px] text-white">Learning Resources</h2>
          <p>
            Here are some resources I've found invaluable when learning UE5:
          </p>
          <ul class="list-disc pl-[20px] space-y-[10px]">
            <li>Epic's official documentation and learning portal</li>
            <li>Unreal Online Learning courses (free with an Epic account)</li>
            <li>YouTube channels like "Unreal Sensei" and "Matthew Wadstein"</li>
            <li>The Unreal Engine forums and AnswerHub</li>
          </ul>
          
          <h2 class="font-semibold lg:text-[2em] text-[28px] text-white">Conclusion</h2>
          <p>
            Unreal Engine 5 represents a significant advancement in game development technology. Its revolutionary 
            features like Nanite and Lumen not only improve visual fidelity but also streamline the development 
            workflow. Whether you're a seasoned developer or just starting out, UE5 offers tools and systems that 
            can help bring your creative vision to life.
          </p>
          <p>
            In my upcoming projects, I'll be leveraging these new features to create more immersive and visually 
            stunning experiences. Stay tuned for more tutorials and insights as I continue exploring the capabilities 
            of Unreal Engine 5.
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