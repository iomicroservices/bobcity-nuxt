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
  <div class="py-16 pt-0 sm:py-24 sm:pt-0">
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
