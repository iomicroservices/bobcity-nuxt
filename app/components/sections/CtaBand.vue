<script setup lang="ts">
defineProps<{
  title: string
  description?: string
  primaryLabel?: string
  primaryTo?: string
  secondaryLabel?: string
  secondaryTo?: string
}>()
</script>

<template>
  <div class="bob-section pt-0">
    <UPageCTA
      :title="title"
      :description="description"
      variant="subtle"
      orientation="horizontal"
      class="rounded-xl"
      :links="[
        ...(primaryLabel && primaryTo
          ? [{ label: primaryLabel, to: primaryTo, trailingIcon: 'i-lucide-arrow-right' }]
          : []),
        ...(secondaryLabel && secondaryTo
          ? [{ label: secondaryLabel, to: secondaryTo, color: 'neutral' as const, variant: 'ghost' as const }]
          : [])
      ]"
    />
  </div>
</template>
