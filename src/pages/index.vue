<script setup>
// const items = ref([5, 10, 20, 30]);
// const value = ref(10);

// const sort = ref(["Market Cap (High to Low)", "Market Cap (Low to High)"]);
// Sort dropdown items (API values)
// const sortOptions = [
//     { value: "market_cap_desc", label: "Market Cap ↓" },
//     { value: "market_cap_asc", label: "Market Cap ↑" },
//     { value: "price_desc", label: "Price ↓" },
//     { value: "price_asc", label: "Price ↑" },
// ];

// Simple string array - includes all 6 sort options like original
const sortOptions = [
    "market_cap_desc",
    "market_cap_asc",
    "price_desc",
    "price_asc",
    "change_desc",
    "change_asc",
];

// Labels for display
const sortLabels = {
    market_cap_desc: "Market Cap (High To Low)",
    market_cap_asc: "Market Cap (Low To High)",
    price_desc: "Price (High To Low)",
    price_asc: "Price (Low To High)",
    change_desc: "24h Change (High To Low)",
    change_asc: "24h Change (Low To High)",
};
const limitOptions = ref([5, 10, 20, 50, 100]); // items array

const { coins, filteredCoins, loading, error, limit, search, page, sortBy, fetchCoins } =
    useCoins();

onMounted(async () => {
    await fetchCoins();
});

watch([limit, sortBy], async () => {
    await fetchCoins();
});

// // Watch for changes and refetch
// watch([limit, sortBy], async ([newLimit, newSort], [oldLimit, oldSort]) => {
//     console.log("Watch triggered:", { newLimit, newSort, oldLimit, oldSort });
//     await fetchCoins();
// });

// // Debug: watch sortBy separately
// watch(sortBy, (newVal, oldVal) => {
//     console.log("sortBy changed from", oldVal, "to", newVal);
// });
</script>

<template>
    <div class="flex items-center gap-4">
        <UInput
            v-model="search"
            size="xl"
            class="flex-1"
            placeholder="Find coins by name or symbol"
        />
        <div>
            <label> Show </label>
            <USelectMenu v-model="limit" :items="limitOptions" class="w-32"> </USelectMenu>
        </div>
        <div>
            <label> Sort: </label>
            <USelectMenu v-model="sortBy" :items="sortOptions" size="xl" class="w-64">
                <template #default="{ modelValue, open }">
                    {{ sortLabels[modelValue] }}
                </template>

                <template #item="{ item }">
                    {{ sortLabels[item] }}
                </template>
                <!-- <template #item="{ value }">
                    {{ sortLabels[value] }}
                </template> -->
            </USelectMenu>
        </div>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-20">
        <UIcon name="i-heroicons-arrow-path" class="h-8 w-8 animate-spin text-primary" />
        <span class="ml-3 text-lg">Loading coinss...</span>
    </div>

    <div v-else class="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <NuxtLink v-for="coin in filteredCoins" :key="coin.id" :to="`/coin/${coin.id}`">
            <UCard>
                <!-- Header -->
                <template #header>
                    <div class="flex items-center gap-2">
                        <img :src="coin.image" :alt="coin.name" class="h-6 w-6" />
                        <div>
                            <h3 class="text-xl leading-tight font-semibold">
                                {{ coin.name }}
                            </h3>
                            <span class="text-xs text-gray-500 uppercase">
                                {{ coin.symbol }}
                            </span>
                        </div>
                    </div>
                </template>
                <!-- Body -->
                <div class="space-y-1">
                    <p>
                        <span class="font-medium">Price:</span>
                        ${{ coin.current_price.toLocaleString() }}
                    </p>
                    <p
                        :class="
                            coin.price_change_percentage_24h >= 0
                                ? 'text-green-600'
                                : 'text-red-600'
                        "
                    >
                        {{ coin.price_change_percentage_24h.toFixed(2) }}%
                    </p>
                    <p class="text-sm text-gray-400">
                        Market Cap: ${{ coin.market_cap.toLocaleString() }}
                    </p>
                </div>
            </UCard>
        </NuxtLink>
    </div>
</template>
