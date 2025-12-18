export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "id");

    try {
        const data = await $fetch(`https://api.coingecko.com/api/v3/coins/${id}`, {
            params: {
                localization: false,
                tickers: false,
                community_data: false,
                developer_data: false,
            },
        });

        return data;
    } catch (error) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message || "Failed to fetch coin data",
        });
    }
});
