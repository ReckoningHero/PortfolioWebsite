<script setup>
import { onMounted, ref } from "vue";
import gsap from "gsap";
import Hero from '@/components/projects/Hero.vue';
import Accordion from '@/components/projects/Accordion.vue';
import CommentSection from '@/components/common/CommentSection.vue';
import twoWorldsVideo from '@/assets/videos/Two_Worlds.mp4'

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
      title="Two Worlds" 
      description="Two Worlds is a third-person action project developed to explore solid gameplay architecture and performant combat systems. As Lead Programmer, I owned the core gameplay loop end-to-end: player control, enemy logic, combat feel, effects integration, and the engineering foundation that made iteration fast and safe. The focus was to build shippable systems—readable, testable, and tuned to run smoothly on console hardware."
      type="Game Jam"
      software="Unreal Engine 4"
      :languages="[
          'C++',
          'Blueprints',
      ]"
      download="/"
      :backgroundVideo="twoWorldsVideo"
    />
    <div class="space-y-4 mt-11">
      <Accordion
        title="Role & Responsibilities (Lead Programmer)"
        content="Designed and implemented a modular finite‑state machine (FSM) in C++ for player and AI characters.
Built a combined melee + ranged combat system with aim/lock mechanics, hit detection, and contextual reactions.
Engineered a projectile system with batching/pooled instances to minimize allocation and improve frame time.
Owned build and deployment pipelines, including UE4 packaging and validation for PC."
        :isOpenDefault="true"
      />
      <Accordion
        title="Finite‑State Machine (C++)"
        content="I implemented a lightweight FSM to coordinate character intent, transitions, and animation cues.
The design favors explicit states (Idle, Move, Dash, MeleeWindup, MeleeSwing, Aim, Fire, Hitstun, Downed) with guarded transitions so edge cases are easy to reason about.
State enter/exit callbacks trigger camera tweaks, notifies, and sound cues, while per‑state update functions remain small and testable."
        :isOpenDefault="true"
      />
      <Accordion
        title="Melee + Ranged Combat"
        content="Melee strikes use short‑lived collision windows synced to swing frames; ranged combat uses a hitscan/ballistic hybrid depending on weapon type.
Aim assist is conservative—using angular thresholds and target visibility checks—to keep skill expression while ensuring readability.
Damage application, stagger, and i‑frames are centralized to avoid duplication across weapon types."
        :isOpenDefault="false"
      />
      <Accordion
        title="Custom Collision & Tracing"
        content="To support precise combat and traversal, I used custom channels and query params for sphere, capsule, and line traces.
Sweep tests validate movement in tight spaces, while filtered queries exclude friendly actors or recently hit targets to prevent double‑hits within the same swing."
        :isOpenDefault="false"
      />
      <Accordion
        title="Projectile Batching & Pooling"
        content="Projectiles are pooled and recycled to eliminate frequent allocations.
Batched updates run with compact data layouts (position, velocity, lifetime) to keep caches hot and reduce component overhead.
Visuals and audio are bound late so logic remains lightweight when many projectiles are active."
        :isOpenDefault="false"
      />
      <Accordion
        title="Two‑Pass Shader with Stencil Buffer"
        content="A custom material effect renders a first pass to mark the stencil, then a second pass for the highlighted silhouette/outline.
This provides a readable target highlight and cinematic moments without an expensive full‑screen post process.
The effect is authorable via material instances for quick style changes."
        :isOpenDefault="false"
      />
      <Accordion
        title="Performance & Deployment"
        content="Profiling with Stat Unit, Stat GPU, and Session Frontend to spot CPU/GPU bottlenecks.
Reduced draw calls by atlasing UI, tightening material variants, and culling small props.
Eliminated needless ticks by moving logic to timers/events and consolidating update paths.
PC packaging: handled platform ini settings, texture LODs, and memory budgets."
        :isOpenDefault="false"
      />
      <Accordion
        title="Tools & Workflow"
        content="Blueprints for rapid iteration layered over C++ foundations where performance mattered.
Data assets for combat tuning (damage windows, recoil, stamina costs) with safe defaults.
Debug overlays for hitboxes, stamina usage, and projectile paths to accelerate balancing.
Version control with feature branches and small PRs to keep changesets reviewable."
        :isOpenDefault="false"
      />
      <Accordion
        title="Challenges & Solutions"
        content="Achieving honest melee hit detection: synchronized animation notifies with buffered collision windows and per‑frame trace validation to avoid “phantom hits”.
Keeping combat responsive while stable: input buffering and clear state transitions to prevent accidental cancels; cooldowns enforce readability without killing flow.
Managing many projectiles: pooled instances, batched updates, and culling to keep frame time consistent.
Readable highlights without heavy post: a cheap stencil‑driven two‑pass effect configured per asset."
        :isOpenDefault="false"
      />
    </div>
    
    <div class="container mx-auto lg:px-[5em] px-[9em] py-10">
        <CommentSection slug="project-two-worlds" />
        <div class="mt-12">
            <router-link :to="{ path: '/', hash: '#projects' }" class="text-[#CCF303] hover:underline">← Back to Projects</router-link>
        </div>
    </div>
  </div>
</template>

<style scoped>
</style>

<style scoped>
</style>
