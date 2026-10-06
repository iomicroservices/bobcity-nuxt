<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  description?: string
  image?: string
  primaryLabel?: string
  primaryTo?: string
  secondaryLabel?: string
  secondaryTo?: string
}>()
</script>

<template>
  <UPageHero
    :headline="eyebrow"
    :title="title"
    :description="description"
    :links="[
      ...(primaryLabel && primaryTo
        ? [{ label: primaryLabel, to: primaryTo, trailingIcon: 'i-lucide-arrow-right', size: 'xl' as const }]
        : []),
      ...(secondaryLabel && secondaryTo
        ? [{ label: secondaryLabel, to: secondaryTo, color: 'neutral' as const, variant: 'outline' as const, size: 'xl' as const }]
        : [])
    ]"
  >
    <template
      v-if="image"
      #default
    >
      <div class="hidden min-w-0 w-full lg:block">
        <img
          :src="image"
          :alt="title"
          class="h-auto w-full rounded-xl border border-default object-cover shadow-sm lg:aspect-4/3"
        >
      </div>
    </template>
  </UPageHero>
</template>
