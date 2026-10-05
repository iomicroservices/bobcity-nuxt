<script setup lang="ts">
defineProps<{
  items: Array<{
    id?: string
    question: string
    answer: string
  }>
}>()
</script>

<template>
  <div class="divide-y divide-default border-y border-default">
    <details
      v-for="(item, index) in items"
      :key="item.id || index"
      class="group py-5"
    >
      <summary class="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-highlighted">
        <span>{{ item.question }}</span>
        <UIcon
          name="i-lucide-plus"
          class="size-4 shrink-0 transition-transform group-open:rotate-45"
        />
      </summary>
      <p class="mt-3 max-w-3xl text-muted">
        {{ item.answer }}
      </p>
    </details>
  </div>
</template>
