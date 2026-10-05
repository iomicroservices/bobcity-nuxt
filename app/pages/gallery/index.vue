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
    <SectionsHeroBanner
      eyebrow="Gallery"
      title="Recent work"
      description="A growing portfolio of repairs, refreshes, and moves."
    />

    <section class="bob-section">
      <div class="bob-container">
        <SectionsGalleryGrid :items="items || []" />
      </div>
    </section>
  </div>
</template>
