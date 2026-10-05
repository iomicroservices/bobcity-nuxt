<script setup lang="ts">
defineProps<{
  title: string
  description?: string
  primaryLabel?: string
  primaryTo?: string
}>()
</script>

<template>
  <section class="bob-section">
    <div class="bob-container">
      <div class="relative overflow-hidden rounded-2xl bg-[linear-gradient(120deg,#1b2433,#364c69)] px-6 py-12 text-white sm:px-10 sm:py-14">
        <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(245,158,11,0.35),transparent_35%)]" />
        <div class="relative max-w-2xl">
          <h2 class="font-display text-3xl font-semibold text-balance sm:text-4xl">
            {{ title }}
          </h2>
          <p
            v-if="description"
            class="mt-3 text-steel-100"
          >
            {{ description }}
          </p>
          <UButton
            v-if="primaryLabel && primaryTo"
            :to="primaryTo"
            class="mt-6"
            size="xl"
            trailing-icon="i-lucide-arrow-right"
          >
            {{ primaryLabel }}
          </UButton>
        </div>
      </div>
    </div>
  </section>
</template>
