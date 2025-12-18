<template>
    <div class="w-full">
        <div v-if="loading" class="flex items-center justify-center py-12">
            <UIcon name="i-heroicons-arrow-path" class="h-6 w-6 animate-spin text-primary" />
            <span class="ml-3">Loading chart...</span>
        </div>

        <UAlert
            v-if="error"
            icon="i-lucide-triangle-alert"
            color="red"
            variant="soft"
            :description="error"
            class="mb-4"
        />

        <VChart
            v-if="!loading && !error && chartOption"
            :option="chartOption"
            :autoresize="true"
            class="w-full"
            style="height: 400px"
        />
    </div>
</template>

<script setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DataZoomComponent,
} from "echarts/components";
import VChart from "vue-echarts";

// Register ECharts components
use([
    CanvasRenderer,
    LineChart,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DataZoomComponent,
]);

const props = defineProps({
    coinId: {
        type: String,
        required: true,
    },
    days: {
        type: Number,
        default: 7,
    },
});

const loading = ref(true);
const error = ref(null);
const chartOption = ref(null);
const colorMode = useColorMode();

async function fetchChartData() {
    loading.value = true;
    error.value = null;

    try {
        const data = await $fetch(`/api/chart/${props.coinId}`, {
            params: {
                days: props.days,
            },
        });

        // Transform data for ECharts
        const prices = data.prices.map((price) => [price[0], price[1]]);

        // Calculate if price is going up or down for color
        const firstPrice = prices[0][1];
        const lastPrice = prices[prices.length - 1][1];
        const isPositive = lastPrice >= firstPrice;
        const lineColor = isPositive ? "#10b981" : "#ef4444";
        const areaColorStart = isPositive ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)";
        const areaColorEnd = isPositive ? "rgba(16, 185, 129, 0.05)" : "rgba(239, 68, 68, 0.05)";

        // Detect dark mode
        const isDark = colorMode.value === "dark";
        const textColor = isDark ? "#e5e7eb" : "#374151";
        const gridColor = isDark ? "#374151" : "#e5e7eb";

        chartOption.value = {
            backgroundColor: "transparent",
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "cross",
                    lineStyle: {
                        color: gridColor,
                        type: "dashed",
                    },
                },
                backgroundColor: isDark ? "#1f2937" : "#ffffff",
                borderColor: gridColor,
                textStyle: {
                    color: textColor,
                },
                formatter: (params) => {
                    const date = new Date(params[0].value[0]).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    });
                    const price = `$${params[0].value[1].toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}`;
                    return `<strong>${date}</strong><br/>Price: ${price}`;
                },
            },
            grid: {
                left: "3%",
                right: "3%",
                bottom: "8%",
                top: "3%",
                containLabel: true,
            },
            xAxis: {
                type: "time",
                boundaryGap: false,
                axisLine: {
                    lineStyle: {
                        color: gridColor,
                    },
                },
                axisLabel: {
                    color: textColor,
                    formatter: (value) => {
                        const date = new Date(value);
                        return `${date.getMonth() + 1}/${date.getDate()}`;
                    },
                },
                splitLine: {
                    show: false,
                },
            },
            yAxis: {
                type: "value",
                position: "right",
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    color: textColor,
                    formatter: (value) => {
                        if (value >= 1000000) {
                            return `$${(value / 1000000).toFixed(1)}M`;
                        } else if (value >= 1000) {
                            return `$${(value / 1000).toFixed(1)}K`;
                        }
                        return `$${value.toFixed(0)}`;
                    },
                },
                splitLine: {
                    lineStyle: {
                        color: gridColor,
                        type: "dashed",
                    },
                },
            },
            series: [
                {
                    name: "Price (USD)",
                    type: "line",
                    data: prices,
                    smooth: true,
                    symbol: "none",
                    lineStyle: {
                        color: lineColor,
                        width: 3,
                    },
                    areaStyle: {
                        color: {
                            type: "linear",
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: areaColorStart,
                                },
                                {
                                    offset: 1,
                                    color: areaColorEnd,
                                },
                            ],
                        },
                    },
                },
            ],
        };
    } catch (e) {
        console.error("Chart fetch error:", e);
        error.value = "Failed to load chart data";
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    fetchChartData();
});

// Refetch if coinId changes
watch(
    () => props.coinId,
    () => {
        fetchChartData();
    },
);

// Update chart colors when theme changes
watch(
    () => colorMode.value,
    () => {
        fetchChartData();
    },
);
</script>
