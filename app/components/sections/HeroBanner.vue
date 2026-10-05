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
  <section class="relative isolate min-h-[78vh] overflow-hidden">
    <div
      class="absolute inset-0 -z-10"
      :style="image
        ? {
          backgroundImage: `linear-gradient(120deg, rgba(27,36,51,0.88), rgba(27,36,51,0.55)), url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }
        : {
          backgroundImage: 'linear-gradient(135deg, #1b2433 0%, #2f4158 45%, #415e81 100%)'
        }"
    />
    <div class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_20%,rgba(245,158,11,0.28),transparent_40%)]" />

    <div class="bob-container flex min-h-[78vh] flex-col justify-end pb-16 pt-28 sm:pb-20 sm:pt-32">
      <p
        v-if="eyebrow"
        class="mb-4 text-sm font-medium tracking-[0.18em] text-amber-200/90 uppercase"
      >
        {{ eyebrow }}
      </p>
      <h1 class="font-display max-w-3xl text-4xl leading-[1.05] font-semibold text-balance text-white sm:text-6xl lg:text-7xl">
        {{ title }}
      </h1>
      <p
        v-if="description"
        class="mt-5 max-w-xl text-base text-pretty text-steel-100 sm:text-lg"
      >
        {{ description }}
      </p>
      <div
        v-if="primaryLabel || secondaryLabel"
        class="mt-8 flex flex-wrap gap-3"
      >
        <UButton
          v-if="primaryLabel && primaryTo"
          :to="primaryTo"
          size="xl"
          trailing-icon="i-lucide-arrow-right"
        >
          {{ primaryLabel }}
        </UButton>
        <UButton
          v-if="secondaryLabel && secondaryTo"
          :to="secondaryTo"
          size="xl"
          color="neutral"
          variant="outline"
          class="bg-white/5 text-white ring-white/25 hover:bg-white/10"
        >
          {{ secondaryLabel }}
        </UButton>
      </div>
    </div>
  </section>
</template>
