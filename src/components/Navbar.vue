<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// State to track the visibility of the mobile sidebar
const isSidebarOpen = ref(false);

// State to track if the navbar should be sticky
const isSticky = ref(false);

// Function to toggle the sidebar
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

// Function to close the sidebar
const closeSidebar = () => {
  isSidebarOpen.value = false;
};

// Function to handle scroll event
const handleScroll = () => {
  isSticky.value = window.scrollY > 50; // Navbar becomes sticky after scrolling 50px
};

// Add event listener for scroll on mount, and remove it on unmount
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div>
    <div class="container mx-auto lg:px-[5em] px-[9em] relative z-20">
      <div class="lg:w-[8.75em] w-[110px] lg:h-[8.75em] h-[110px] bg-[#CCF303] rounded-full absolute top-[-120px] left-[5%] inset-0 blur-[110px] z-20"></div>

    </div>
    <!-- Navbar -->
    <div
      :class="[
        'fixed w-full top-0 left-0 z-20 transition-all duration-300',
        isSticky ? 'bg-[#030a10] shadow-md' : 'bg-transparent'
      ]"
    >
      <div class="container mx-auto lg:px-[5em] px-[9em] flex justify-between items-center py-[45px] relative">

        <router-link to="/" class="relative flex items-center">
          <h3 class="lg:text-[1.375em] text-[18px] font-atyp-display font-medium text-[#CCF303]">Joshua D. Nguyen</h3>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="lg:flex hidden gap-[3.575em] text-[1.375em] font-atyp-display font-medium">
          <a class="transition-colors hover:text-[#CCF303]" href="/PortfolioWebsite/#about">About</a>
          <a class="transition-colors hover:text-[#CCF303]" href="/PortfolioWebsite/#highlightedProjects">Projects</a>
          <a class="transition-colors hover:text-[#CCF303]" href="/PortfolioWebsite/#shippedGames">Titles</a>
          <a class="transition-colors hover:text-[#CCF303]" href="/PortfolioWebsite/#blog">Blog</a>
          <a class="transition-colors hover:text-[#CCF303]" href="/cpp-ide">C++ IDE</a>
          <router-link class="transition-colors hover:text-[#CCF303]" to="/resume">Resume</router-link>
          <a class="transition-colors hover:text-[#CCF303]" href="/PortfolioWebsite/#contact">Contact</a>
        </div>

        <!-- Mobile Menu Button -->
        <div class="block lg:hidden">
          <button @click="toggleSidebar">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);">
              <path d="M4 6h16v2H4zm4 5h12v2H8zm5 5h7v2h-7z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Spacer to prevent content from jumping -->
    <div class="h-[120px] lg:h-[120px]"></div>

    <!-- Transition for the Sidebar -->
    <transition name="slide-in">
      <!-- Mobile Sidebar -->
      <div
        v-if="isSidebarOpen"
        class="md:w-1/2 w-2/3 h-full lg:hidden block bg-[#030A10] fixed top-0 left-0 z-30 text-[22px] p-[1.5em] shadow-lg"
      >
        <router-link to="/" class="relative flex items-center justify-center">
          <h3 class="lg:text-[1.375em] text-[18px] font-atyp-display font-medium text-[#CCF303]">Joshua D. Nguyen</h3>
          <div class="lg:w-[8.75em] w-[110px] lg:h-[8.75em] h-[110px] bg-[#CCF303] rounded-full absolute top-[-180px] left-[30%] inset-0 blur-[110px] z-20"></div>
        </router-link>

        <hr class="mt-[1.5em] border border-[#FFFFFF12]">

        <!-- Navigation Links -->
        <div class="flex flex-col mt-20 font-atyp-display font-medium gap-[0.775em] text-[20px] mb-32">
          <a class="transition-colors hover:text-[#CCF303]" href="/#about" @click="closeSidebar">About</a>
          <a class="transition-colors hover:text-[#CCF303]" href="/#highlightedProjects" @click="closeSidebar">Projects</a>
          <a class="transition-colors hover:text-[#CCF303]" href="/#shippedGames" @click="closeSidebar">Titles</a>
          <a class="transition-colors hover:text-[#CCF303]" href="/#blog" @click="closeSidebar">Blog</a>
          <router-link class="transition-colors hover:text-[#CCF303]" to="/cpp-ide" @click="closeSidebar">C++ IDE</router-link>
          <router-link class="transition-colors hover:text-[#CCF303]" to="/resume" @click="closeSidebar">Resume</router-link>
        </div>
        <div class="flex">
          <a href="/#contact" @click="closeSidebar" class="w-full text-center bg-[#CCF303] px-[23px] py-[15px] uppercase lg:text-[1.375em] text-[16px] text-black font-atyp-display font-medium">Let's have a chat</a>
        </div>
      </div>
    </transition>

    <!-- Background Overlay for Mobile Sidebar -->
    <transition name="fade">
      <div
        v-if="isSidebarOpen"
        @click="closeSidebar"
        class="fixed inset-0 bg-black/50 z-20 lg:hidden"
      ></div>
    </transition>
  </div>
</template>

<style>
/* Sliding Transition */
.slide-in-enter-active,
.slide-in-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-in-enter-from {
  transform: translateX(-100%);
}

.slide-in-enter-to {
  transform: translateX(0);
}

.slide-in-leave-from {
  transform: translateX(0);
}

.slide-in-leave-to {
  transform: translateX(-100%);
}

/* Fade Transition for Overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
