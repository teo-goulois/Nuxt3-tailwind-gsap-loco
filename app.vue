<template>
  <KeepAlive>
    <Transition :css="false" mode="out-in">
      <div page-content :key="$route.fullPath">
        <div data-scroll-section class="flex flex-col gap-3 p-4">
          <div data-scroll data-scroll-speed="2" class="bg-red-500 h-[250px] w-full"></div>
          <div class="bg-red-500 h-[250px] w-full"></div>
          <div data-scroll data-scroll-speed="4" class="bg-red-500 h-[250px] w-full"></div>
          <div class="bg-red-500 h-[250px] w-full"></div>
          <div class="bg-red-500 h-[250px] w-full"></div>
        </div>
      </div>
    </Transition>
  </KeepAlive>
</template>

<script setup lang="ts">
const { $smoothScroll } = useNuxtApp()
const { gsap, ScrollTrigger } = useGsap()
const route = useRoute()

const overlay = shallowRef({});

const currentSection = useCurrentSection()

function setVh() {
  const windowHeight = window.innerHeight;
  gsap.set(document.documentElement, { '--vh': `${windowHeight / 100}px` });
}

function disableScrollRestoration() {
  if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
  }
}

onMounted(() => {
  const parts: HTMLDivElement[]  = gsap.utils.toArray('.w-full');

  const triggers: any = [];

  parts.forEach((part, key) => {
    triggers.push(
      ScrollTrigger.create({
        trigger: part,
        start: 'top 55%',
        end: 'bottom 55%',
        markers: true,
        onEnter: () => (currentSection.value = key),
        onEnterBack: () => (currentSection.value = key),
      })
    );
  });

  onBeforeUnmount(() => {
    triggers.forEach((trigger: any) => trigger.kill());
  });
})

onMounted(() => {
  $smoothScroll.disable();
  setVh()
  disableScrollRestoration()
  $smoothScroll.enable()
  window.addEventListener('resize', setVh);
})

/* PAGE TRANSITION */

/* if (route.name === 'index')
  gsap.set('.page-overlay__slide', {
    opacity: 0,
    pointerEvents: 'none',
    // @ts-ignore
    onComplete: () => $smoothScroll.enable(),
  });

if (route.name !== 'index') {
  gsap.set('.loader', { autoAlpha: 0, display: 'none' });

  gsap.fromTo(
    '.page-overlay__slide__text',
    { yPercent: 105, autoAlpha: 1 },
    { yPercent: 0, delay: 0.075, ease: 'expo.out' }
  );

  // overlay.value.enterPageAnim('div[page-content]', () => null);
} */

onBeforeUnmount(() => {
  window.removeEventListener('resize', setVh);
});
</script>