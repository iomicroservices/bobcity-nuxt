<script setup lang="ts">
defineProps<{
  title: string
  summary: string
  icon?: string
  to: string
}>()
</script>

<template>
  <NuxtLink
    :to="to"
    class="group block border-b border-default py-6 transition-colors hover:border-primary"
  >
    <div class="flex items-start gap-4">
      <div class="mt-1 rounded-lg bg-primary/10 p-2.5 text-primary">
        <UIcon
          :name="icon || 'i-lucide-wrench'"
          class="size-5"
        />
      </div>
      <div class="min-w-0 flex-1">
        <h3 class="font-display text-xl font-semibold text-highlighted group-hover:text-primary">
          {{ title }}
        </h3>
        <p class="mt-2 text-muted">
          {{ summary }}
        </p>
        <span class="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
          Learn more
          <UIcon
            name="i-lucide-arrow-right"
            class="size-4 transition-transform group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
