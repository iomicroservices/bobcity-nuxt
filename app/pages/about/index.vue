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
    <UPageHero
      headline="About"
      :title="page?.headline || 'About Bob City'"
      :description="page?.description"
    />

    <UContainer class="pb-16 sm:pb-24">
      <ContentRenderer
        v-if="page"
        :value="page"
      />
    </UContainer>
  </div>
</template>
