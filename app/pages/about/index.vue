<script setup lang="ts">
const { data: page } = await useAsyncData('about-page', () =>
  queryCollection('pages').path('/pages/about').first()
)

useSeoMeta({
  title: page.value?.seo?.title || 'About',
  description: page.value?.seo?.description || page.value?.description
})
</script>

<template>
  <div>
    <SectionsHeroBanner
      eyebrow="About"
      :title="page?.headline || 'About Bob City'"
      :description="page?.description"
    />

    <section class="bob-section">
      <div class="bob-container max-w-3xl">
        <ContentRenderer
          v-if="page"
          :value="page"
          class="prose prose-neutral dark:prose-invert max-w-none"
        />
      </div>
    </section>
  </div>
</template>
