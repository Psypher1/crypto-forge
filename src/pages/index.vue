<script setup>
const items = ref([5, 10, 20, 30]);
const value = ref(10);

const sort = ref(["Market Cap (High to Low)", "Market Cap (Low to High)"]);
const sortValue = ref("Market Cap (High to Low)");
</script>

<template>
  <div class="flex items-center gap-4">
    <UInput size="xl" class="flex-1" />
    <div>
      <Ulabel> Show </Ulabel>
      <USelectMenu v-model="value" :items="items" size="xl" />
    </div>
    <div>
      <Ulabel> Sort </Ulabel>
      <USelectMenu v-model="sortValue" :items="sort" size="xl" />
    </div>
  </div>

  <div class="grid sm:grid-cols-2 mt-4 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <UCard>
      <template #header>
        <h3>Bitcoin</h3>
        BTC
      </template>
      <p>Price: $85,868 -3.43 %</p>
      <p>Market Cap: 1,710,776,038,829</p>
    </UCard>
    <UCard>index</UCard>
    <UCard>index</UCard>
    <UCard>index</UCard>
  </div>
</template>
