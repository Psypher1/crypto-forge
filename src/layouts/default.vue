<script setup>
const items = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
];
</script>

<template>
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
    <UFooter>
        <template #left>
            <h3>Crypto Forge</h3>
            <p class="text-sm text-muted">Copyright © {{ new Date().getFullYear() }}</p>
        </template>
        <UNavigationMenu :items="items" variant="link" />
    </UFooter>
</template>
