<script setup>
const skills = [
  {
    category: "Game Engines",
    items: ["Unreal Engine 4/5", "Unity 3D", "Godot"]
  },
  {
    category: "Languages",
    items: ["C++", "C#", "Python", "JavaScript", "HLSL/GLSL"]
  },
  {
    category: "Expertise",
    items: ["Gameplay Systems", "AI Behaviors", "Shaders & VFX", "Performance Optimization"]
  },
  {
    category: "Tools & Workflow",
    items: ["Git / Perforce", "Agile / Scrum", "CI/CD / DevOps", "Blender / Maya"]
  }
]
</script>

<template>
  <div id="expertise" class="container mx-auto lg:px-[5em] px-[9em] mt-[90px]">
    <h3 class="uppercase lg:text-[4em] text-[40px] font-atyp-display font-semibold leading-[1.3em] mb-[1em]">
      Technical <span class="text-[#CCF303]">Expertise</span>
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="skill in skills" :key="skill.category" class="bg-[#0B1217] p-8 rounded-[2rem] border border-white/5 hover:border-[#CCF303]/30 transition-all duration-500 hover:translate-y-[-8px] group relative overflow-hidden">
        <!-- Accent line -->
        <div class="absolute top-0 left-0 w-full h-1 bg-[#CCF303] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        
        <h4 class="text-[#CCF303] font-atyp-display font-bold text-xl mb-6 uppercase tracking-[0.15em]">{{ skill.category }}</h4>
        <ul class="space-y-3">
          <li v-for="item in skill.items" :key="item" class="flex items-center gap-3 text-[#6B767F] font-atyp-display font-medium group-hover:text-white/90 transition-colors">
            <span class="w-1.5 h-1.5 rounded-full bg-[#CCF303]/30 group-hover:bg-[#CCF303] transition-all"></span>
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
