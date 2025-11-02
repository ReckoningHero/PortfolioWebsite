<template>
    <div id="blog" class="container mx-auto lg:px-[5em] px-[9em] mt-[50px]">
        <h3 class="uppercase font-atyp-display font-semibold lg:text-[4em] text-[40px] text-center">My <span class="text-[#CCF303]">Blog</span></h3>
        <div class="grid lg:grid-cols-2 grid-cols-1 gap-[45px] mt-[62px]">
            <!-- Blog post 1 -->
            <div class="font-atyp-display flex flex-col items-start gap-[24px] bg-[#0B1217] rounded-[1.375em] overflow-hidden">
                <div class="w-full h-[250px] overflow-hidden">
                    <img class="w-full h-full object-cover object-center" src="../assets/images/ProjectUnreal.png" alt="Blog post 1">
                </div>
                <div class="px-[30px] pb-[30px]">
                    <p class="text-[#CCF303] text-[14px] mb-[10px]">June 15, 2024</p>
                    <h5 class="font-semibold lg:text-[1.56em] text-[24px] text-white mb-[15px]">Getting Started with Unreal Engine 5</h5>
                    <p class="font-medium lg:text-[1.125em] text-[16px] text-[#6B767F] mb-[20px]">
                        Exploring the new features of Unreal Engine 5 and how they can revolutionize your game development workflow.
                    </p>
                    <router-link to="/blog/unreal-engine-5" class="text-[#CCF303] hover:underline">Read more →</router-link>
                </div>
            </div>

            <!-- Blog post 2 -->
            <div class="font-atyp-display flex flex-col items-start gap-[24px] bg-[#0B1217] rounded-[1.375em] overflow-hidden">
                <div class="w-full h-[250px] overflow-hidden">
                    <img class="w-full h-full object-cover object-center" src="../assets/images/ProjectUnreal.png" alt="Blog post 2">
                </div>
                <div class="px-[30px] pb-[30px]">
                    <p class="text-[#CCF303] text-[14px] mb-[10px]">May 28, 2024</p>
                    <h5 class="font-semibold lg:text-[1.56em] text-[24px] text-white mb-[15px]">Optimizing Game Performance</h5>
                    <p class="font-medium lg:text-[1.125em] text-[16px] text-[#6B767F] mb-[20px]">
                        Tips and tricks for improving your game's performance across different platforms and hardware configurations.
                    </p>
                    <router-link to="/blog/optimizing-game-performance" class="text-[#CCF303] hover:underline">Read more →</router-link>
                </div>
            </div>

            <!-- Blog post 3 -->
            <div class="font-atyp-display flex flex-col items-start gap-[24px] bg-[#0B1217] rounded-[1.375em] overflow-hidden">
                <div class="w-full h-[250px] overflow-hidden">
                    <img class="w-full h-full object-cover object-center" src="../assets/images/ProjectUnreal.png" alt="Blog post 3">
                </div>
                <div class="px-[30px] pb-[30px]">
                    <p class="text-[#CCF303] text-[14px] mb-[10px]">April 10, 2024</p>
                    <h5 class="font-semibold lg:text-[1.56em] text-[24px] text-white mb-[15px]">Creating Realistic Character Animations</h5>
                    <p class="font-medium lg:text-[1.125em] text-[16px] text-[#6B767F] mb-[20px]">
                        A deep dive into character animation techniques that can bring your game characters to life.
                    </p>
                    <router-link to="/blog/character-animations" class="text-[#CCF303] hover:underline">Read more →</router-link>
                </div>
            </div>

            <!-- Blog post 4 -->
            <div class="font-atyp-display flex flex-col items-start gap-[24px] bg-[#0B1217] rounded-[1.375em] overflow-hidden">
                <div class="w-full h-[250px] overflow-hidden">
                    <img class="w-full h-full object-cover object-center" src="../assets/images/ProjectUnreal.png" alt="Blog post 4">
                </div>
                <div class="px-[30px] pb-[30px]">
                    <p class="text-[#CCF303] text-[14px] mb-[10px]">March 5, 2024</p>
                    <h5 class="font-semibold lg:text-[1.56em] text-[24px] text-white mb-[15px]">Game Development for Xbox Series X</h5>
                    <p class="font-medium lg:text-[1.125em] text-[16px] text-[#6B767F] mb-[20px]">
                        Insights into developing games for the latest Xbox console and leveraging its powerful hardware.
                    </p>
                    <router-link to="/blog/xbox-development" class="text-[#CCF303] hover:underline">Read more →</router-link>
                </div>
            </div>
        </div>
    </div>
</template>