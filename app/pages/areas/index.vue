<script setup lang="ts">
const { data: areas } = await useAsyncData('areas', () =>
  queryCollection('areas').all()
)

useSeoMeta({
  title: 'Service areas',
  description: 'Where Bob City provides handyman, painting, and removals services.'
})
</script>

<template>
  <div>
    <SectionsHeroBanner
      eyebrow="Areas"
      title="Where we work"
      description="Local coverage with room to grow — each area is its own content page."
    />

    <section class="bob-section">
      <div class="bob-container grid gap-6 sm:grid-cols-2">
        <NuxtLink
          v-for="area in areas"
          :key="area.path"
          :to="area.path"
          class="block border-b border-default py-6 hover:border-primary"
        >
          <h2 class="font-display text-2xl font-semibold text-highlighted">
            {{ area.title }}
          </h2>
          <p class="mt-2 text-muted">
            {{ area.summary }}
          </p>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
