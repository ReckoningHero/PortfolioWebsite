<script setup>
import { ref, onMounted, watch, nextTick } from "vue";
import gsap from "gsap";

const props = defineProps({
  title: {
    type: String,
    required: true,
    default: "Accordion Title",
  },
  content: {
    type: String,
    required: true,
    default: "This is the accordion content.",
  },
  isOpenDefault: {
    type: Boolean,
    default: false,
  },
});

const isOpen = ref(props.isOpenDefault);
const contentRef = ref(null);

const toggleAccordion = async () => {
  isOpen.value = !isOpen.value;
  await nextTick();

  if (isOpen.value) {
    gsap.set(contentRef.value, { height: 'auto' });
    let autoHeight = contentRef.value.scrollHeight + 50; // Adding buffer to prevent cropping
    gsap.fromTo(contentRef.value, { height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 }, { height: autoHeight, opacity: 1, paddingTop: "25px", paddingBottom: "25px", duration: 0.5, ease: "none.out" });
  } else {
    gsap.to(contentRef.value, { height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0, duration: 0.3, ease: "none.in", onComplete: () => {
      contentRef.value.style.paddingTop = "0px";
      contentRef.value.style.paddingBottom = "0px";
    }});
  }
};

onMounted(() => {
  if (!isOpen.value && contentRef.value) {
    gsap.set(contentRef.value, { height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 });
  }
});
</script>

<template>
  <div class="container mx-auto lg:px-[5em] px-[9em] text-white">
    <div class="rounded-[13px] overflow-hidden shadow-md">
      <!-- Accordion Header -->
      <button
        @click="toggleAccordion"
        class="w-full flex justify-between items-center bg-[#22282d] hover:bg-[#2b3239] transition-all text-[#A1A1A1] px-[35px] py-[25px] font-atyp-display lg:text-[1.375em] text-[16px] font-medium focus:outline-none"
      >
        <span>{{ title }}</span>
        <svg
          :class="{ 'rotate-180': isOpen }"
          class="transition-transform duration-300 ease-in-out"
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="15"
          fill="none"
          viewBox="0 0 22 15"
        >
          <path
            fill="#A1A1A1"
            d="M19.275.637 11 8.912 2.725.637 0 3.363l11 11 11-11L19.275.637Z"
          />
        </svg>
      </button>

      <!-- Accordion Content with GSAP Animation -->
      <div
        ref="contentRef"
        class="px-[35px] py-[25px] bg-[#202528] text-white font-atyp-display font-medium lg:text-[1.375em] text-[16px] overflow-hidden"
      >
        {{ content }}
      </div>
    </div>
  </div>
</template>
