/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
    singleQuote: false,
    semi: true,
    useTabs: false,
    tabWidth: 2,
    printWidth: 100,
    plugins: ["prettier-plugin-tailwindcss"],
    tailwindStylesheet: "./src/assets/css/main.css",
};
