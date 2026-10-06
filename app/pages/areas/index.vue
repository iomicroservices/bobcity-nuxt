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
    <UPageHero
      headline="Areas"
      title="Where we work"
      description="Local coverage with room to grow — each area is its own content page."
    />

    <UPageSection>
      <template #body>
        <UPageGrid class="lg:grid-cols-2">
          <UPageCard
            v-for="area in areas"
            :key="area.path"
            :title="area.title"
            :description="area.summary"
            :to="area.path"
            icon="i-lucide-map-pin"
            variant="subtle"
            spotlight
          />
        </UPageGrid>
      </template>
    </UPageSection>
  </div>
</template>
