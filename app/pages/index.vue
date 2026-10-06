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
    <UPageHero
      :headline="'Property maintenance'"
      :title="page?.headline || 'Property maintenance done properly'"
      :description="page?.description || site?.tagline"
      orientation="horizontal"
      :links="[
        {
          label: site?.cta?.label || 'Get a free quote',
          to: site?.cta?.to || '/contact',
          trailingIcon: 'i-lucide-arrow-right',
          size: 'xl'
        },
        {
          label: 'View services',
          to: '/services',
          color: 'neutral',
          variant: 'outline',
          size: 'xl'
        }
      ]"
    >
      <div
        v-if="page?.heroImage"
        class="min-w-0 w-full"
      >
        <img
          :src="page.heroImage"
          :alt="page?.headline || 'Bob City'"
          class="h-auto w-full rounded-xl border border-default object-cover shadow-sm lg:aspect-4/3"
        >
      </div>
    </UPageHero>

    <UPageSection
      headline="What we do"
      title="One team for repairs, refreshes, and moves"
      description="Start with the service you need — or combine them into one booking."
    >
      <template #body>
        <UPageGrid>
          <SectionsServiceCard
            v-for="service in services"
            :key="service.path"
            :title="service.title"
            :summary="service.summary"
            :icon="service.icon"
            :to="service.path"
          />
        </UPageGrid>
      </template>
    </UPageSection>

    <UContainer class="pb-8">
      <ContentRenderer
        v-if="page"
        :value="page"
      />
    </UContainer>

    <UPageSection
      headline="FAQ"
      title="Common questions"
      description="Straight answers about quotes, coverage, and how we work."
      orientation="horizontal"
    >
      <template #body>
        <SectionsFaqList :items="faqs || []" />
      </template>
    </UPageSection>

    <SectionsCtaBand
      title="Ready for a free quote?"
      description="Tell us about the job and we will come back with clear next steps."
      :primary-label="site?.cta?.label || 'Get a free quote'"
      :primary-to="site?.cta?.to || '/contact'"
      secondary-label="Browse services"
      secondary-to="/services"
    />
  </div>
</template>
