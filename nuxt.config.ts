// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },
	modules: ["@nuxt/image", "@nuxt/ui"],
	srcDir: "src/",
	css: ["~/assets/css/main.css"],
	vite: { plugins: [tailwindcss()] },
	app: {
		head: { title: "Crypto Forge" },
		meta: { name: "description", content: "Crypto Forge" },
	},
	srcDir: "src",
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
});
