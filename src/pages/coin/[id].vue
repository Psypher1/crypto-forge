<script setup>
const route = useRoute();
const coinId = route.params.id;

const { coin, loading, error, fetchCoin } = useCoinDetail(coinId);

// Helper function to get first sentence of description
const getDescription = (description) => {
    if (!description) return "";
    return description.split(". ")[0] + ".";
};

// Helper function to format dates
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-UK");
};

// Fetch coin details on mount
onMounted(() => {
    fetchCoin();
});
</script>

<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <!-- Back Button -->
            <NuxtLink
                to="/"
                class="mb-6 inline-flex items-center text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
                <UIcon name="i-lucide-arrow-left" class="mr-2 h-5 w-5" />
                Back To Home
            </NuxtLink>

            <!-- Loading State -->
            <div v-if="loading" class="flex items-center justify-center py-20">
                <UIcon name="i-heroicons-arrow-path" class="h-8 w-8 animate-spin text-primary" />
                <span class="ml-3 text-lg">Loading coin details...</span>
            </div>

            <!-- Error State -->
            <UAlert
                v-if="error"
                icon="i-lucide-triangle-alert"
                color="red"
                variant="soft"
                title="Error"
                :description="error"
                class="mb-6"
            />

            <!-- Coin Details -->
            <div v-if="!loading && !error && coin" class="space-y-6">
                <!-- Header Card -->
                <UCard>
                    <div class="flex items-start gap-6">
                        <img
                            :src="coin.image.large"
                            :alt="coin.name"
                            class="h-24 w-24 rounded-full"
                        />
                        <div class="flex-1">
                            <h1 class="mb-2 text-4xl font-bold">
                                {{ coin.name }}
                                <span class="ml-2 text-2xl text-gray-500 dark:text-gray-400">
                                    {{ coin.symbol.toUpperCase() }}
                                </span>
                            </h1>
                            <div class="mb-4 flex items-center gap-4">
                                <UBadge color="primary" variant="subtle">
                                    Rank #{{ coin.market_cap_rank }}
                                </UBadge>
                                <div class="text-3xl font-bold">
                                    ${{ coin.market_data.current_price.usd.toLocaleString() }}
                                </div>
                                <UBadge
                                    :color="
                                        coin.market_data.price_change_percentage_24h >= 0
                                            ? 'green'
                                            : 'red'
                                    "
                                    variant="subtle"
                                >
                                    {{
                                        coin.market_data.price_change_percentage_24h >= 0
                                            ? "↑"
                                            : "↓"
                                    }}
                                    {{
                                        Math.abs(
                                            coin.market_data.price_change_percentage_24h,
                                        ).toFixed(2)
                                    }}%
                                </UBadge>
                            </div>
                            <p class="text-gray-600 dark:text-gray-400">
                                {{ getDescription(coin.description.en) }}
                            </p>
                        </div>
                    </div>
                </UCard>

                <!-- Stats Grid -->
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <UCard>
                        <div class="space-y-1">
                            <p class="text-sm text-gray-500 dark:text-gray-400">Market Cap</p>
                            <p class="text-2xl font-bold">
                                ${{ coin.market_data.market_cap.usd.toLocaleString() }}
                            </p>
                        </div>
                    </UCard>

                    <UCard>
                        <div class="space-y-1">
                            <p class="text-sm text-gray-500 dark:text-gray-400">24h High</p>
                            <p class="text-2xl font-bold text-green-600">
                                ${{ coin.market_data.high_24h.usd.toLocaleString() }}
                            </p>
                        </div>
                    </UCard>

                    <UCard>
                        <div class="space-y-1">
                            <p class="text-sm text-gray-500 dark:text-gray-400">24h Low</p>
                            <p class="text-2xl font-bold text-red-600">
                                ${{ coin.market_data.low_24h.usd.toLocaleString() }}
                            </p>
                        </div>
                    </UCard>

                    <UCard>
                        <div class="space-y-1">
                            <p class="text-sm text-gray-500 dark:text-gray-400">24h Price Change</p>
                            <p class="text-2xl font-bold">
                                ${{ coin.market_data.price_change_24h.toFixed(2) }}
                            </p>
                        </div>
                    </UCard>

                    <UCard>
                        <div class="space-y-1">
                            <p class="text-sm text-gray-500 dark:text-gray-400">
                                Circulating Supply
                            </p>
                            <p class="text-2xl font-bold">
                                {{ coin.market_data.circulating_supply.toLocaleString() }}
                            </p>
                        </div>
                    </UCard>

                    <UCard>
                        <div class="space-y-1">
                            <p class="text-sm text-gray-500 dark:text-gray-400">Total Supply</p>
                            <p class="text-2xl font-bold">
                                {{ coin.market_data.total_supply?.toLocaleString() || "N/A" }}
                            </p>
                        </div>
                    </UCard>
                </div>

                <!-- All-Time Stats -->
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <UCard>
                        <div class="space-y-2">
                            <p class="text-sm text-gray-500 dark:text-gray-400">All-Time High</p>
                            <p class="text-3xl font-bold text-green-600">
                                ${{ coin.market_data.ath.usd.toLocaleString() }}
                            </p>
                            <p class="text-sm text-gray-500">
                                {{ formatDate(coin.market_data.ath_date.usd) }}
                            </p>
                        </div>
                    </UCard>

                    <UCard>
                        <div class="space-y-2">
                            <p class="text-sm text-gray-500 dark:text-gray-400">All-Time Low</p>
                            <p class="text-3xl font-bold text-red-600">
                                ${{ coin.market_data.atl.usd.toLocaleString() }}
                            </p>
                            <p class="text-sm text-gray-500">
                                {{ formatDate(coin.market_data.atl_date.usd) }}
                            </p>
                        </div>
                    </UCard>
                </div>

                <!-- Chart -->
                <UCard>
                    <template #header>
                        <h2 class="text-xl font-bold">Price Chart (7 Days)</h2>
                    </template>
                    <CoinChart :coin-id="coin.id" />
                </UCard>

                <!-- Links & Categories -->
                <UCard>
                    <template #header>
                        <h2 class="text-xl font-bold">Links & Information</h2>
                    </template>
                    <div class="space-y-4">
                        <div v-if="coin.links.homepage[0]" class="flex items-center gap-2">
                            <UIcon name="i-lucide-globe" class="h-5 w-5 text-primary" />
                            <a
                                :href="coin.links.homepage[0]"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="text-primary hover:underline"
                            >
                                Website
                            </a>
                        </div>

                        <div v-if="coin.links.blockchain_site[0]" class="flex items-center gap-2">
                            <UIcon name="i-heroicons-cube" class="h-5 w-5 text-primary" />
                            <a
                                :href="coin.links.blockchain_site[0]"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="text-primary hover:underline"
                            >
                                Blockchain Explorer
                            </a>
                        </div>

                        <div v-if="coin.categories.length > 0" class="pt-2">
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">Categories:</p>
                            <div class="flex flex-wrap gap-2">
                                <UBadge
                                    v-for="category in coin.categories"
                                    :key="category"
                                    color="gray"
                                    variant="subtle"
                                >
                                    {{ category }}
                                </UBadge>
                            </div>
                        </div>

                        <div class="pt-2 text-sm text-gray-500">
                            Last Updated: {{ formatDate(coin.last_updated) }}
                        </div>
                    </div>
                </UCard>
            </div>

            <!-- No Data State -->
            <UAlert
                v-if="!loading && !error && !coin"
                icon="i-lucide-info"
                color="blue"
                variant="soft"
                title="No Data Found"
                description="Could not find information for this coin."
            />
        </div>
    </div>
</template>
