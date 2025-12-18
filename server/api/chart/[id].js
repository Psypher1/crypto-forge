export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "id");
    const query = getQuery(event);
    const days = query.days || 7;

    try {
        const data = await $fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
            params: {
                vs_currency: "usd",
                days: days,
            },
        });

        return data;
    } catch (error) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message || "Failed to fetch chart data",
        });
    }
});
