<script setup lang="ts">
defineProps<{
  title: string
  summary: string
  icon?: string
  to: string
}>()
</script>

<template>
  <UPageCard
    :icon="icon || 'i-lucide-wrench'"
    :title="title"
    :description="summary"
    :to="to"
    variant="subtle"
    spotlight
  >
    <template #footer>
      <span class="inline-flex items-center gap-1 text-sm font-medium text-primary">
        Learn more
        <UIcon
          name="i-lucide-arrow-right"
          class="size-4"
        />
      </span>
    </template>
  </UPageCard>
</template>
