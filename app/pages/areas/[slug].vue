<script setup lang="ts">
const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { data: area } = await useAsyncData(
  () => `area-${slug.value}`,
  () => queryCollection('areas').path(`/areas/${slug.value}`).first()
)

if (!area.value) {
  throw createError({ statusCode: 404, statusMessage: 'Area not found' })
}

useSeoMeta({
  title: area.value.seo?.title || area.value.title,
  description: area.value.seo?.description || area.value.summary
})
</script>

<template>
  <div v-if="area">
    <SectionsHeroBanner
      eyebrow="Service area"
      :title="area.title"
      :description="area.summary"
      :image="area.coverImage"
      primary-label="Request a quote"
      primary-to="/contact"
    />

    <section class="bob-section">
      <div class="bob-container max-w-3xl">
        <ContentRenderer
          :value="area"
          class="prose prose-neutral dark:prose-invert max-w-none"
        />
      </div>
    </section>
  </div>
</template>
