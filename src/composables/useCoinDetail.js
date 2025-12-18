export function useCoinDetail(coinId) {
    const coin = ref(null);
    const loading = ref(true);
    const error = ref(null);

    async function fetchCoin() {
        loading.value = true;
        error.value = null;

        try {
            console.log("Fetching coin details for:", coinId);
            const data = await $fetch(`/api/coin/${coinId}`);

            console.log("Coin data received:", data);
            coin.value = data;
        } catch (e) {
            console.error("Fetch coin error:", e);
            error.value = e.message || "Failed to fetch coin data";
        } finally {
            loading.value = false;
        }
    }

    return {
        coin,
        loading,
        error,
        fetchCoin,
    };
}
