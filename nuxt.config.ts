// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: false },
    modules: ["@nuxt/image", "@nuxt/ui", "nuxt-echarts"],
    runtimeConfig: {
        public: {
            coinsApiUrl: process.env.COINS_API_URL,
        },
    },
    srcDir: "src/",
    css: ["~/assets/css/main.css"],
    vite: { plugins: [tailwindcss()] },
    app: {
        head: {
            title: "Crypto Forge",
            meta: [{ name: "description", content: "Crypto Forge" }],
        },
    },
    components: [
        {
            path: "~/components",
            pathPrefix: false,
        },
    ],
    typescript: {
        typeCheck: false, // Disable TypeScript type checking
        strict: false,
    },
    ui: {
        theme: {
            colors: ["primary", "secondary", "success", "info", "warning", "error", "neutral"],
        },
    },
    build: {
        transpile: ["echarts", "vue-echarts", "resize-detector"],
    },
});
