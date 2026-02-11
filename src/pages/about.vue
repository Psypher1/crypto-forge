<script setup></script>

<template>
  <h1 class="mb-8 text-center text-5xl font-bold">About</h1>
  <section class="grid gap-8 md:grid-cols-2">
    <UCard class="space-y-3 text-lg">
      <h2 class="text-3xl font-bold">Crypto Forge</h2>
      <p class="mt-3">
        This is a recreation of
        <a
          class="text-primary hover:text-primary-300"
          href="https://crypto-dash-two.vercel.app/"
          target="_blank"
          >Crypto Dash</a
        >
        the same project by Brad Traversy but in Nuxt.
      </p>
      <p class="mt-2">
        Most of the functionality is the same. This was in an effort to see how thing change and
        learn some more Nuxt concepts.
      </p>
      <p class="mt-2 flex items-center gap-2">
        The repo for this project can be found on
        <a
          class="flex items-center gap-1 text-primary hover:text-primary-300"
          href="https://github.com/Psypher1/crypto-forge"
          target="_blank"
        >
          Github <UIcon name="lucide:github" />
        </a>
      </p>
    </UCard>
    <UCard class="text-lg">
      <h2 class="text-2xl font-bold">Changes</h2>
      <p class="mt-2">The conversion involved the following:</p>
      <ul class="mt-2 list-disc pl-4">
        <li>Nuxt API Routes to fetch coin data.</li>
        <li>Compoasable to centralise data fetching.</li>
        <li>Nuxt Echarts for displaying the chart on the coin detail page.</li>
      </ul>
    </UCard>
  </section>
</template>
