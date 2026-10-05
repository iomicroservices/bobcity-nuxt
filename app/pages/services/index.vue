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
    <SectionsHeroBanner
      eyebrow="Services"
      title="Practical help for homes and workplaces"
      description="Three core services today — built so we can add more without changing the site structure."
      :primary-label="site?.cta?.label"
      :primary-to="site?.cta?.to"
    />

    <section class="bob-section">
      <div class="bob-container max-w-4xl">
        <SectionsServiceCard
          v-for="service in services"
          :key="service.path"
          :title="service.title"
          :summary="service.summary"
          :icon="service.icon"
          :to="service.path"
        />
      </div>
    </section>
  </div>
</template>
