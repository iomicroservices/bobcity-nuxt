<script setup lang="ts">
const services = await useAllServices()
const site = await useSiteSettings()

useSeoMeta({
  title: 'Services',
  description: 'Handyman, painter & decorator, and removals from Bob City.'
})
</script>

<template>
  <div>
    <UPageHero
      headline="Services"
      title="Practical help for homes and workplaces"
      description="Three core services today — built so we can add more without changing the site structure."
      :links="site?.cta
        ? [{ label: site.cta.label, to: site.cta.to, trailingIcon: 'i-lucide-arrow-right', size: 'xl' }]
        : []"
    />

    <UPageSection>
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
  </div>
</template>
