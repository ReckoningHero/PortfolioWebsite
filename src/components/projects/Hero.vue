<script setup>
defineProps({
    title: {
        type: String,
        required: true,
        default: "Unknown title"
    },
    description: {
        type: String,
        required: true,
        default: "Unknown description"
    },
    type: {
        type: String,
        required: true,
        default: "Unknown type"
    },
    software: {
        type: String,
        required: true,
        default: "Unknown software"
    },
    languages: {
        type: Array,
        required: true,
        default: ["Unknwon", "languages"]
    },
    download: {
        type: String,
        required: true,
        default: "/"
    }
})
</script>

<template>
    <div class="relative w-full lg:h-[40em] h-[570px] overflow-hidden">
        <!-- Background Video -->
        <video
            class="absolute inset-0 w-full h-full object-cover"
            autoplay
            loop
            muted
            playsinline
        >
            <source src="https://hugo.fyi/res/video/hero1/hero1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>

        <!-- Gradient Overlay -->
        <div 
            class="absolute inset-0" 
            style="background: linear-gradient(179deg, rgb(3 10 16 / 100%) 0%, rgb(3 10 16 / 71%) 49%, rgb(3, 10, 16) 93%);">
        </div>

        <!-- Content -->
        <div class="relative container mx-auto lg:px-[5em] px-[9em] text-white z-10 flex flex-col items-start justify-end pb-[79px] h-full">
            <h3 class="uppercase lg:text-[5.1875em] text-[40px] font-atyp-display font-semibold lg:w-1/2 leading-[1.3em]">
                {{ title }}
            </h3>
            <p class="text-[#6B767F] lg:text-[1.375em] text-[16px] font-atyp-display font-medium mt-[15px]">
                {{ description }}
            </p>
            <p class="text-[#6B767F] lg:text-[1.375em] text-[16px] font-atyp-display font-medium mt-[15px]">
                Project Type: <span class="text-white">{{ type }}</span>
            </p>

            <p class="text-[#6B767F] lg:text-[1.375em] text-[16px] font-atyp-display font-medium mt-[15px]">
                Software Used: <span class="text-white">{{ software }}</span>
            </p>
            <p class="text-[#6B767F] lg:text-[1.375em] text-[16px] font-atyp-display font-medium mt-[15px]">
                Languages Used: 
                <span class="text-white" v-for="(language, index) in languages" :key="index">
                    {{ language }}<span v-if="index < languages.length - 1">, </span>
                </span>
            </p>
            <div class="flex gap-[21px] mt-[38px]">
                <router-link :to="download" class="bg-[#CCF303] px-[23px] py-[15px] lg:text-[1.375em] text-[16px] text-black font-atyp-display font-medium shadow-[0_0_30px_#cbf30355] hover:shadow-[0_0_40px_#cbf30355] hover:translate-y-[-5px] transition-all">Download</router-link>
            </div>
        </div>
    </div>
</template>
