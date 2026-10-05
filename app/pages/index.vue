<script setup lang="ts">
const site = await useSiteSettings()
const services = await useFeaturedServices()

const { data: page } = await useAsyncData('home-page', () =>
  queryCollection('pages').path('/pages/home').first()
)

const { data: faqs } = await useAsyncData('home-faqs', () =>
  queryCollection('faqs').order('order', 'ASC').limit(4).all()
)

useSeoMeta({
  title: page.value?.seo?.title || 'Bob City | Handyman, Painter & Removals',
  description: page.value?.seo?.description || site.value?.tagline,
  ogTitle: page.value?.seo?.title || 'Bob City',
  ogDescription: page.value?.seo?.description || site.value?.tagline,
  ogUrl: 'https://bobcity.co.uk'
})
</script>

<template>
  <div>
    <SectionsHeroBanner
      eyebrow="Property maintenance"
      :title="page?.headline || 'Property maintenance done properly'"
      :description="page?.description || site?.tagline"
      :image="page?.heroImage"
      :primary-label="site?.cta?.label || 'Get a free quote'"
      :primary-to="site?.cta?.to || '/contact'"
      secondary-label="View services"
      secondary-to="/services"
    />

    <section class="bob-section">
      <div class="bob-container">
        <div class="max-w-2xl">
          <p class="text-sm font-medium tracking-[0.16em] text-primary uppercase">
            What we do
          </p>
          <h2 class="font-display mt-3 text-3xl font-semibold text-highlighted sm:text-4xl">
            One team for repairs, refreshes, and moves
          </h2>
          <p class="mt-3 text-muted">
            Start with the service you need — or combine them into one booking.
          </p>
        </div>

        <div class="mt-10 grid gap-2 md:grid-cols-3 md:gap-8">
          <SectionsServiceCard
            v-for="service in services"
            :key="service.path"
            :title="service.title"
            :summary="service.summary"
            :icon="service.icon"
            :to="service.path"
          />
        </div>
      </div>
    </section>

    <section class="bob-section border-y border-default bg-elevated/40">
      <div class="bob-container grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <p class="text-sm font-medium tracking-[0.16em] text-primary uppercase">
            Why Bob City
          </p>
          <h2 class="font-display mt-3 text-3xl font-semibold text-highlighted sm:text-4xl">
            Clear communication. Tidy workmanship.
          </h2>
          <ContentRenderer
            v-if="page"
            :value="page"
            class="prose prose-neutral dark:prose-invert mt-4 max-w-none"
          />
        </div>
        <SectionsFaqList :items="faqs || []" />
      </div>
    </section>

    <SectionsCtaBand
      title="Ready for a free quote?"
      description="Tell us about the job and we will come back with clear next steps."
      :primary-label="site?.cta?.label || 'Get a free quote'"
      :primary-to="site?.cta?.to || '/contact'"
    />
  </div>
</template>
