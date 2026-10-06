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
    <UPageHero
      headline="Service area"
      :title="area.title"
      :description="area.summary"
      :links="[
        { label: 'Request a quote', to: '/contact', trailingIcon: 'i-lucide-arrow-right', size: 'xl' }
      ]"
    />

    <UContainer class="pb-16 sm:pb-24">
      <ContentRenderer
        :value="area"
        class="prose prose-neutral dark:prose-invert max-w-none mx-auto max-w-3xl"
      />
    </UContainer>

    <SectionsCtaBand
      title="Need help in this area?"
      description="Tell us about the job and we will confirm availability."
      primary-label="Get a free quote"
      primary-to="/contact"
    />
  </div>
</template>
