<template>
    <div id="contact" class="container mx-auto lg:px-[5em] px-[9em] mt-[90px] mb-[90px]">
        <div class="bg-[#0B1217] text-white lg:py-[100px] py-[60px] lg:px-[113px] px-[30px] flex flex-col items-center gap-[40px] rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden group">
            <!-- Decorative background element -->
            <div class="absolute -top-24 -right-24 w-64 h-64 bg-[#CCF303]/10 rounded-full blur-[100px] group-hover:bg-[#CCF303]/20 transition-colors duration-700"></div>
            
            <div class="relative z-10 flex flex-col items-center gap-6">
                <h3 class="uppercase font-atyp-display font-semibold lg:text-[5em] text-[40px] text-center leading-tight">
                    Let's <span class="text-[#CCF303]">Connect</span>
                </h3>
                <div class="w-20 h-1.5 bg-[#CCF303] rounded-full"></div>
            </div>

            <p class="font-atyp-display font-medium text-[20px] lg:text-[24px] text-center text-[#6B767F] max-w-3xl leading-relaxed relative z-10">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. 
                Whether you have a question or just want to say hi, my inbox is always open!
            </p>

            <div class="flex flex-col items-center gap-8 relative z-10 w-full">
                <a href="mailto:joshua@twinb0rnsoft.com" class="group/btn relative inline-flex items-center justify-center px-10 py-5 overflow-hidden font-atyp-display font-bold text-black bg-[#CCF303] rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_30px_#CCF30333]">
                    <span class="relative text-xl uppercase tracking-wider">Send an Email</span>
                </a>
                
                <div class="flex flex-col items-center gap-2">
                    <span class="text-[#6B767F] uppercase tracking-widest text-sm font-semibold">Direct Email</span>
                    <a href="mailto:joshua@twinb0rnsoft.com" class="text-white hover:text-[#CCF303] transition-colors text-lg border-b border-white/10 hover:border-[#CCF303]/50 pb-1">joshua@twinb0rnsoft.com</a>
                </div>
            </div>
        </div>
    </div>
</template>