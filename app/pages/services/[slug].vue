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
    <UPageHero
      headline="Service"
      :title="service.title"
      :description="service.summary"
      orientation="horizontal"
      :links="[
        { label: 'Request a quote', to: '/contact', trailingIcon: 'i-lucide-arrow-right', size: 'xl' },
        { label: 'All services', to: '/services', color: 'neutral', variant: 'outline', size: 'xl' }
      ]"
    >
      <div
        v-if="service.coverImage"
        class="min-w-0 w-full"
      >
        <img
          :src="service.coverImage"
          :alt="service.title"
          class="h-auto w-full rounded-xl border border-default object-cover shadow-sm lg:aspect-4/3"
        >
      </div>
    </UPageHero>

    <UContainer class="pb-16 sm:pb-24">
      <div class="grid gap-12 lg:grid-cols-[1.4fr_0.8fr]">
        <article>
          <ContentRenderer
            :value="service"
            class="prose prose-neutral dark:prose-invert max-w-none"
          />
        </article>

        <aside class="space-y-6">
          <UCard
            v-if="service.highlights?.length"
            variant="subtle"
          >
            <template #header>
              <h2 class="font-display text-lg font-semibold text-highlighted">
                What's included
              </h2>
            </template>
            <ul class="space-y-3">
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
          </UCard>

          <UCard
            v-if="relatedFaqs?.length"
            variant="subtle"
          >
            <template #header>
              <h2 class="font-display text-lg font-semibold text-highlighted">
                Related FAQs
              </h2>
            </template>
            <SectionsFaqList :items="relatedFaqs" />
          </UCard>
        </aside>
      </div>
    </UContainer>

    <SectionsCtaBand
      title="Need this service?"
      description="Send a few details and we will respond with availability and pricing."
      primary-label="Get a free quote"
      primary-to="/contact"
    />
  </div>
</template>
