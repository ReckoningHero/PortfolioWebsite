<template>
    <div class="container mx-auto lg:px-[5em] px-[9em] mt-[59px]">
        <div class="flex lg:flex-row flex-col lg:gap-0 gap-20 items-center justify-between border-t border-[#FFFFFF12] py-[34px]">
<h6 class="font-atyp-display font-medium lg:text-[1em] text-[16px] text-[#6B767F] text-center">Copyright © 2026. All rights reserved. Developed by Webeeno Studio</h6>
            <div class="flex gap-[15px] items-center">
                <router-link class="font-atyp-display font-medium text-[#6B767F] hover:text-[#CCF303] transition-colors" to="/resume">Resume</router-link>
                <a href="https://github.com/ReckoningHero" target="_blank" rel="noopener noreferrer" aria-label="GitHub: ReckoningHero (opens in new tab)" title="GitHub: ReckoningHero" class="w-[40px] h-[40px] bg-[#1C2227] text-white flex justify-center items-center rounded-[8px] hover:bg-[#CCF303] hover:text-black transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M12.026 2a9.973 9.973 0 0 0-9.974 9.974c0 4.406 2.857 8.145 6.82 9.465.5.09.68-.217.68-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.09-.645.35-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.555 9.555 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2Z" clip-rule="evenodd"/>
                    </svg>
                </a>

                <a href="https://www.linkedin.com/in/joshuadn/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in new tab)" title="LinkedIn" class="w-[40px] h-[40px] bg-[#1C2227] text-white flex justify-center items-center rounded-[8px] hover:bg-[#CCF303] hover:text-black transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                </a>
                <a href="https://x.com/twinb0rn" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter) (opens in new tab)" title="X" class="w-[40px] h-[40px] bg-[#1C2227] text-white flex justify-center items-center rounded-[8px] hover:bg-[#CCF303] hover:text-black transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                </a>
                <a href="https://www.instagram.com/twinb0rn/" target="_blank" rel="noopener noreferrer" aria-label="Instagram (opens in new tab)" title="Instagram" class="w-[40px] h-[40px] bg-[#1C2227] text-white flex justify-center items-center rounded-[8px] hover:bg-[#CCF303] hover:text-black transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                    </svg>
                </a>
            </div>
        </div>
    </div>
</template>