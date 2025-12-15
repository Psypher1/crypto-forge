<script setup>
const items = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
];
</script>

<template>
  <div>
    <UHeader title="Crypto Forge">
      <template #right>
        <UColorModeButton />
        <div class="hidden lg:block">
          <UNavigationMenu :items="items" />
        </div>
      </template>
      <template #body>
        <UNavigationMenu :items="items" orientation="vertical" />
      </template>
    </UHeader>
    <UMain>
      <UContainer class="py-12">
        <slot />
      </UContainer>
    </UMain>
  </div>
</template>
