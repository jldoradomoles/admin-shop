<template>
  <div class="flex justify-center space-x-3 py-10 bg-gray-100">
    <button
      :disabled="page === 1"
      @click="$router.push({ query: { page: page - 1 } })"
      class="flex items-center space-x-1.5 rounded-lg px-4 py-1.5 text-white bg-blue-500 disabled:bg-gray-300 hover:bg-blue-600 transition-all"
    >
      <ArrowLeft class="w-4 h-4" />
      <span>Anteriores</span>
    </button>
    <button
      :disabled="hasMoreData"
      @click="$router.push({ query: { page: page + 1 } })"
      class="flex items-center space-x-1.5 rounded-lg px-4 py-1.5 text-white bg-blue-500 disabled:bg-gray-300 hover:bg-blue-600 transition-all"
    >
      <span>Siguientes</span>
      <ArrowRight class="w-4 h-4" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import ArrowLeft from '@/assets/icons/ArrowLeft.vue';
import ArrowRight from '@/assets/icons/ArrowRight.vue';

interface Props {
  page: number;

  hasMoreData: boolean;
}

defineProps<Props>();
</script>
