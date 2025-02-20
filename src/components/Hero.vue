<template>
    <div class="relative w-full lg:h-[46em] h-[380px] overflow-hidden">
        <!-- Background Video -->
        <video
            class="absolute inset-0 w-full h-full object-cover"
            autoplay
            loop
            muted
            playsinline
        >
            <source src="https://ia601808.us.archive.org/24/items/unreal-engine-character-ui/%5BTutsNode.com%5D%20-%20Unreal%20Engine%20-%20Character%20UI/1.%20Project%20Setup/1.%20Project%20Primer.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>

        <!-- Gradient Overlay -->
        <div 
            class="absolute inset-0" 
            style="background: linear-gradient(179deg, rgb(3 10 16 / 100%) 0%, rgb(3 10 16 / 71%) 49%, rgb(3, 10, 16) 100%);">
        </div>

        <!-- Content -->
        <div class="relative container mx-auto lg:px-[5em] px-[9em] text-white z-10 flex flex-col items-start justify-center h-full">
            <h3 class="uppercase lg:text-[5.1875em] text-[40px] font-atyp-display font-semibold lg:w-1/2 leading-[1.3em]">
                Welcome to my realm! <span class="text-[#CCF303]"> Gameplay Engineer </span> loving to fix tech problems. 
            </h3>
            <p class="text-[#6B767F] lg:text-[1.375em] text-[16px] font-atyp-display font-medium lg:w-1/2 mt-[15px]">
                Code and .
            </p>
            <div class="flex gap-[21px] mt-[38px]">
                <a href="/PortfolioWebsite/#contact" class="bg-[#CCF303] px-[23px] py-[15px] uppercase lg:text-[1.375em] text-[16px] text-black font-atyp-display font-medium shadow-[0_0_30px_#cbf30355] hover:shadow-[0_0_40px_#cbf30355] hover:translate-y-[-5px] transition-all">Let's have a chat</a>
                <a href="/PortfolioWebsite/#highlightedProjects" class="hover:bg-[#CCF303] hover:text-black transition-all border border-[#CCF303] px-[23px] py-[15px] uppercase lg:text-[1.375em] text-[16px] text-[#CCF303] font-atyp-display font-medium">My projects</a>
            </div>
        </div>
    </div>
</template>
