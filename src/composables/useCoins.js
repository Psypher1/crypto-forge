export function useCoins() {
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
            // console.log("Fetching coins with limit:", limit.value);
            const data = await $fetch("/api/coins", {
                params: {
                    order: "market_cap_desc", // Always fetch by market cap
                    per_page: limit.value,
                    page: page.value,
                },
            });
            // console.log("API Response:", data);
            // console.log("Data length:", data?.length);

            if (!data || !Array.isArray(data)) {
                // console.error("Invalid data format:", data);
                throw new Error("Invalid data format received from API");
            }

            coins.value = data;
            // console.log("Coins set successfully, coins.value length:", coins.value.length);
        } catch (e) {
            error.value = e.message;
            console.error("Fetch error:", e);
            coins.value = [];
        } finally {
            loading.value = false;
        }
    }

    // Client-side filtering and sorting (like the original React code)
    const filteredCoins = computed(() => {
        // First filter by search
        let filtered = coins.value;

        if (search.value) {
            filtered = filtered.filter(
                (coin) =>
                    coin.name.toLowerCase().includes(search.value.toLowerCase()) ||
                    coin.symbol.toLowerCase().includes(search.value.toLowerCase()),
            );
        }

        // Then sort client-side
        const sorted = [...filtered].sort((a, b) => {
            switch (sortBy.value) {
                case "market_cap_desc":
                    return b.market_cap - a.market_cap;
                case "market_cap_asc":
                    return a.market_cap - b.market_cap;
                case "price_desc":
                    return b.current_price - a.current_price;
                case "price_asc":
                    return a.current_price - b.current_price;
                case "change_desc":
                    return (
                        (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0)
                    );
                case "change_asc":
                    return (
                        (a.price_change_percentage_24h || 0) - (b.price_change_percentage_24h || 0)
                    );
                default:
                    return 0;
            }
        });

        return sorted;
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
