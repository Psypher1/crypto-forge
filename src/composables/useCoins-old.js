export function useCoins() {
    const config = useRuntimeConfig();
    const API_URL = config.public.coinsApiUrl;

    const coins = ref([]);
    const loading = ref(false);
    const error = ref(null);

    const limit = ref(10);
    const sortBy = ref("market_cap_desc");
    const search = ref("");
    const page = ref(1);

    async function fetchCoins() {
        loading.value = true;
        error.value = null;

        try {
            console.log("Fetching with sortBy:", sortBy.value);
            const data = await $fetch("/api/coins", {
                params: {
                    order: sortBy.value,
                    per_page: limit.value,
                    page: page.value,
                },
            });

            coins.value = data;
        } catch (e) {
            error.value = e.message;
        } finally {
            loading.value = false;
        }
    }

    // Computed filtered coins
    const filteredCoins = computed(() => {
        if (!search.value) return coins.value;

        return coins.value.filter(
            (coin) =>
                coin.name.toLowerCase().includes(search.value.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(search.value.toLowerCase()),
        );
    });

    return {
        coins,
        loading,
        error,
        limit,
        page,
        search,
        sortBy,
        filteredCoins,
        fetchCoins,
    };
}
