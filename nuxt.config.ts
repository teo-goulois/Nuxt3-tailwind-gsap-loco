// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    build: {
        transpile: ['gsap'],
    },
    modules: [
        '@nuxtjs/tailwindcss'
    ],
    css: [
        'locomotive-scroll/dist/locomotive-scroll.css',
        '~/assets/css/tailwind.css',
    ],
})
