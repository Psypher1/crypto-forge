export default defineEventHandler(async (event) => {
    const query = getQuery(event);

    return await $fetch("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
            vs_currency: "usd",
            order: query.order ?? "market_cap_desc",
            per_page: query.per_page ?? 10,
            page: query.page ?? 1,
            sparkline: true,
        },
    });
});
