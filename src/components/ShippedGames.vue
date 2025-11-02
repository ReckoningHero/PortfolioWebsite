<template>
    <div id="shippedGames" class="container mx-auto lg:px-[5em] px-[9em]">
        <hr class="border border-[#FFFFFF12] my-[50px]">
        <h3 class="uppercase font-atyp-display font-semibold lg:text-[4em] text-[40px] text-center">Shipped <span class="text-[#CCF303]">Games</span></h3>
        <div class="grid lg:grid-cols-3 grid-cols-1 gap-[45px] mt-[62px]">
            <!-- Game 1 -->
            <div class="font-atyp-display flex flex-col items-start gap-[24px]">
                <div class="flex flex-col gap-[18px]">
                    <div class="w-full h-[309px] overflow-hidden rounded-[13px]">
                        <img class="w-full h-full object-cover object-center" src="../assets/images/game1.jpg" alt="Cyber Assault">
                    </div>

                    <div>
                        <h5 class="font-semibold lg:text-[1.56em] text-[24px] text-[#CCF303] mb-[6px]">Cyber Assault</h5>
                        <p class="font-medium lg:text-[1.125em] text-[18px] text-[#6B767F]">Xbox Series X | PS5 | PC</p>
                    </div>
                </div>
                
                <div class="flex flex-col gap-[10px]">
                    <div class="flex items-center gap-[14px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                            <path fill="#CCF303" d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0ZM8.001 14.413l-3.713-3.705L5.7 9.292l2.299 2.295 5.294-5.294 1.414 1.414-6.706 6.706Z"/>
                        </svg>
                        <p class="lg:text-[1.125em] text-[18px]">Lead Programmer</p>
                    </div>
                    
                    <div class="flex items-center gap-[14px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                            <path fill="#CCF303" d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0ZM8.001 14.413l-3.713-3.705L5.7 9.292l2.299 2.295 5.294-5.294 1.414 1.414-6.706 6.706Z"/>
                        </svg>
                        <p class="lg:text-[1.125em] text-[18px]">Advanced AI systems</p>
                    </div>
                    
                    <div class="flex items-center gap-[14px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                            <path fill="#CCF303" d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0ZM8.001 14.413l-3.713-3.705L5.7 9.292l2.299 2.295 5.294-5.294 1.414 1.414-6.706 6.706Z"/>
                        </svg>
                        <p class="lg:text-[1.125em] text-[18px]">Destructible environments</p>
                    </div>
                </div>

                <a href="https://store.steampowered.com" target="_blank" class="text-[#CCF303] hover:underline">View on Steam →</a>
            </div>

            <!-- Game 2 -->
            <div class="font-atyp-display flex flex-col items-start gap-[24px]">
                <div class="flex flex-col gap-[18px]">
                    <div class="w-full h-[309px] overflow-hidden rounded-[13px]">
                        <img class="w-full h-full object-cover object-center" src="../assets/images/game2.jpg" alt="Galactic Frontier">
                    </div>

                    <div>
                        <h5 class="font-semibold lg:text-[1.56em] text-[24px] text-[#CCF303] mb-[6px]">Galactic Frontier</h5>
                        <p class="font-medium lg:text-[1.125em] text-[18px] text-[#6B767F]">PC | Nintendo Switch</p>
                    </div>
                </div>
                
                <div class="flex flex-col gap-[10px]">
                    <div class="flex items-center gap-[14px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                            <path fill="#CCF303" d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0ZM8.001 14.413l-3.713-3.705L5.7 9.292l2.299 2.295 5.294-5.294 1.414 1.414-6.706 6.706Z"/>
                        </svg>
                        <p class="lg:text-[1.125em] text-[18px]">Gameplay Programmer</p>
                    </div>
                    
                    <div class="flex items-center gap-[14px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                            <path fill="#CCF303" d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0ZM8.001 14.413l-3.713-3.705L5.7 9.292l2.299 2.295 5.294-5.294 1.414 1.414-6.706 6.706Z"/>
                        </svg>
                        <p class="lg:text-[1.125em] text-[18px]">Procedural generation</p>
                    </div>
                    
                    <div class="flex items-center gap-[14px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                            <path fill="#CCF303" d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0ZM8.001 14.413l-3.713-3.705L5.7 9.292l2.299 2.295 5.294-5.294 1.414 1.414-6.706 6.706Z"/>
                        </svg>
                        <p class="lg:text-[1.125em] text-[18px]">Dynamic ecosystems</p>
                    </div>
                </div>

                <a href="https://www.nintendo.com/store" target="_blank" class="text-[#CCF303] hover:underline">View on Nintendo Store →</a>
            </div>

            <!-- Game 3 -->
            <div class="font-atyp-display flex flex-col items-start gap-[24px]">
                <div class="flex flex-col gap-[18px]">
                    <div class="w-full h-[309px] overflow-hidden rounded-[13px]">
                        <img class="w-full h-full object-cover object-center" src="../assets/images/game3.jpg" alt="Shadow Protocol">
                    </div>

                    <div>
                        <h5 class="font-semibold lg:text-[1.56em] text-[24px] text-[#CCF303] mb-[6px]">Shadow Protocol</h5>
                        <p class="font-medium lg:text-[1.125em] text-[18px] text-[#6B767F]">Xbox One | PS4 | PC</p>
                    </div>
                </div>
                
                <div class="flex flex-col gap-[10px]">
                    <div class="flex items-center gap-[14px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                            <path fill="#CCF303" d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0ZM8.001 14.413l-3.713-3.705L5.7 9.292l2.299 2.295 5.294-5.294 1.414 1.414-6.706 6.706Z"/>
                        </svg>
                        <p class="lg:text-[1.125em] text-[18px]">AI Programmer</p>
                    </div>
                    
                    <div class="flex items-center gap-[14px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                            <path fill="#CCF303" d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0ZM8.001 14.413l-3.713-3.705L5.7 9.292l2.299 2.295 5.294-5.294 1.414 1.414-6.706 6.706Z"/>
                        </svg>
                        <p class="lg:text-[1.125em] text-[18px]">Advanced behavior systems</p>
                    </div>
                    
                    <div class="flex items-center gap-[14px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                            <path fill="#CCF303" d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0ZM8.001 14.413l-3.713-3.705L5.7 9.292l2.299 2.295 5.294-5.294 1.414 1.414-6.706 6.706Z"/>
                        </svg>
                        <p class="lg:text-[1.125em] text-[18px]">Realistic lighting effects</p>
                    </div>
                </div>

                <a href="https://www.xbox.com/games" target="_blank" class="text-[#CCF303] hover:underline">View on Xbox Store →</a>
            </div>
        </div>
    </div>
</template>

<script setup>
// Component for displaying shipped games
</script>