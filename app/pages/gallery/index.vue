<script setup lang="ts">
const { data: items } = await useAsyncData('gallery', () =>
  queryCollection('gallery').order('order', 'ASC').all()
)

useSeoMeta({
  title: 'Gallery',
  description: 'Recent handyman, painting, and removals projects from Bob City.'
})
</script>

<template>
  <div>
    <UPageHero
      headline="Gallery"
      title="Recent work"
      description="A growing portfolio of repairs, refreshes, and moves."
    />

    <UPageSection>
      <template #body>
        <SectionsGalleryGrid :items="items || []" />
      </template>
    </UPageSection>
  </div>
</template>
