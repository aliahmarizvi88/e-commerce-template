<script setup>
const props = defineProps({
  height: { type: String, default: 'w-56' },
  width: { type: String, default: 'h-64' },
});
</script>

<template>
  <div
    :class="`flex flex-col  ${width} ${height} animate-pulse rounded-xl p-4 gap-4`"
  >
    <div class="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md"></div>
    <div class="flex flex-col gap-2">
      <div class="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
      <div class="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
      <div class="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
      <div class="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
    </div>
  </div>
</template>
