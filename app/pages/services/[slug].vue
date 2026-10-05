<script setup lang="ts">
const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { data: service } = await useAsyncData(
  () => `service-${slug.value}`,
  () => queryCollection('services').path(`/services/${slug.value}`).first()
)

if (!service.value) {
  throw createError({ statusCode: 404, statusMessage: 'Service not found' })
}

const { data: relatedFaqs } = await useAsyncData(
  () => `service-faqs-${slug.value}`,
  () => queryCollection('faqs')
    .where('service', '=', slug.value)
    .order('order', 'ASC')
    .all()
)

useSeoMeta({
  title: service.value.seo?.title || service.value.title,
  description: service.value.seo?.description || service.value.summary
})
</script>

<template>
  <div v-if="service">
    <SectionsHeroBanner
      eyebrow="Service"
      :title="service.title"
      :description="service.summary"
      :image="service.coverImage"
      primary-label="Request a quote"
      primary-to="/contact"
      secondary-label="All services"
      secondary-to="/services"
    />

    <section class="bob-section">
      <div class="bob-container grid gap-12 lg:grid-cols-[1.4fr_0.8fr]">
        <article>
          <ContentRenderer
            :value="service"
            class="prose prose-neutral dark:prose-invert max-w-none"
          />
        </article>

        <aside class="space-y-8">
          <div v-if="service.highlights?.length">
            <h2 class="font-display text-xl font-semibold text-highlighted">
              What's included
            </h2>
            <ul class="mt-4 space-y-3">
              <li
                v-for="item in service.highlights"
                :key="item"
                class="flex gap-3 text-muted"
              >
                <UIcon
                  name="i-lucide-check"
                  class="mt-0.5 size-4 shrink-0 text-primary"
                />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <div v-if="relatedFaqs?.length">
            <h2 class="font-display mb-4 text-xl font-semibold text-highlighted">
              Related FAQs
            </h2>
            <SectionsFaqList :items="relatedFaqs" />
          </div>
        </aside>
      </div>
    </section>

    <SectionsCtaBand
      title="Need this service?"
      description="Send a few details and we will respond with availability and pricing."
      primary-label="Get a free quote"
      primary-to="/contact"
    />
  </div>
</template>
