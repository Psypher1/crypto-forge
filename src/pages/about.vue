<script setup></script>

<template>
    <h1 class="mb-8 text-center text-5xl font-bold">About</h1>
    <section class="grid gap-8 md:grid-cols-2">
        <UCard class="max-">
            <h1 class="text-3xl font-bold">Crypto Forge</h1>
            <p class="mt-2">
                This is a recreation of
                <UButton
                    variant="link"
                    color="primary"
                    size="lg"
                    to="https://crypto-dash-two.vercel.app/"
                    target="_blank"
                    >Crypto Dash</UButton
                >
                the same project by Brad Traversy but in Nuxt
            </p>
            <p class="mt-2">
                Most of the functionality is the same. This was in an effort to see how thing change
                and learn some more Nuxt concepts.
            </p>
        </UCard>
        <UPageCard class="max">
            <h2 class="text-2xl font-bold">Changes</h2>
            <p class="mt-2">The conversion involved the following:</p>
            <ul class="mt-2 list-disc pl-4">
                <li>Nuxt API Routes to fetch coin data</li>
                <li>Compoasable to centralise data fetching</li>
                <li>Nuxt Echarts for displaying the chart on the coin detail page</li>
            </ul>
        </UPageCard>
    </section>
</template>
