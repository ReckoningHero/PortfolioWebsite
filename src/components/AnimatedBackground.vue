<template>
  <div class="animated-bg" aria-hidden="true">
    <!-- Subtle animated gradient backdrop -->
    <div class="gradient-layer"></div>

    <!-- Floating blurred blobs -->
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="blob blob-3"></div>
    <div class="blob blob-4"></div>
  </div>
</template>

<script setup>
// Purely presentational background; no script needed
</script>

<style scoped>
.animated-bg {
  position: absolute; /* scoped to parent container */
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0; /* background layer within section */
  overflow: hidden;
}

/* Animated gradient layer for subtle motion */
.gradient-layer {
  position: absolute;
  inset: 0;
  background: radial-gradient(1200px 800px at 10% 10%, rgba(204, 243, 3, 0.08), transparent 60%),
              radial-gradient(900px 600px at 90% 20%, rgba(79, 112, 181, 0.08), transparent 60%),
              radial-gradient(900px 600px at 25% 85%, rgba(61, 169, 164, 0.06), transparent 60%),
              linear-gradient(180deg, rgba(3,10,16,1) 0%, rgba(3,10,16,0.95) 100%);
  animation: gradientShift 24s ease-in-out infinite alternate;
}

@keyframes gradientShift {
  0% {
    transform: translate3d(0, 0, 0) scale(1);
    filter: hue-rotate(0deg);
  }
  50% {
    transform: translate3d(-1.5%, 1.5%, 0) scale(1.02);
    filter: hue-rotate(8deg);
  }
  100% {
    transform: translate3d(1%, -1%, 0) scale(1.01);
    filter: hue-rotate(-6deg);
  }
}

/* Blobs: large, soft glows that drift slowly */
.blob {
  position: absolute;
  width: 38vmax;
  height: 38vmax;
  border-radius: 50%;
  filter: blur(90px);
  mix-blend-mode: screen; /* Lighten over dark background */
  opacity: 0.28;
}

.blob-1 {
  background: radial-gradient(circle at 30% 30%, rgba(204,243,3,0.35), rgba(204,243,3,0.0) 60%);
  top: -10vmax; left: -6vmax;
  animation: floatA 36s ease-in-out infinite;
}

.blob-2 {
  background: radial-gradient(circle at 70% 40%, rgba(79,112,181,0.30), rgba(79,112,181,0.0) 60%);
  top: 5vmax; right: -8vmax;
  animation: floatB 42s ease-in-out infinite;
}

.blob-3 {
  background: radial-gradient(circle at 50% 50%, rgba(61,169,164,0.30), rgba(61,169,164,0.0) 60%);
  bottom: -12vmax; left: 10vmax;
  animation: floatC 48s ease-in-out infinite;
}

.blob-4 {
  background: radial-gradient(circle at 20% 60%, rgba(204,243,3,0.25), rgba(204,243,3,0.0) 60%);
  bottom: -6vmax; right: 6vmax;
  animation: floatD 40s ease-in-out infinite;
}

@keyframes floatA {
  0%   { transform: translate3d(0, 0, 0); }
  50%  { transform: translate3d(3vmax, 2vmax, 0); }
  100% { transform: translate3d(0.5vmax, -1vmax, 0); }
}

@keyframes floatB {
  0%   { transform: translate3d(0, 0, 0); }
  50%  { transform: translate3d(-2.5vmax, 2vmax, 0); }
  100% { transform: translate3d(0.5vmax, -1.5vmax, 0); }
}

@keyframes floatC {
  0%   { transform: translate3d(0, 0, 0) scale(1); }
  50%  { transform: translate3d(2vmax, -2vmax, 0) scale(1.03); }
  100% { transform: translate3d(-1vmax, 1vmax, 0) scale(1.01); }
}

@keyframes floatD {
  0%   { transform: translate3d(0, 0, 0); }
  50%  { transform: translate3d(-3vmax, -1.5vmax, 0); }
  100% { transform: translate3d(1vmax, 1vmax, 0); }
}
</style>