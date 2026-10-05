<script setup lang="ts">
const { data: faqs } = await useAsyncData('faqs', () =>
  queryCollection('faqs').order('order', 'ASC').all()
)

useSeoMeta({
  title: 'FAQ',
  description: 'Common questions about Bob City services, quotes, and coverage.'
})
</script>

<template>
  <div>
    <SectionsHeroBanner
      eyebrow="FAQ"
      title="Questions, answered"
      description="Straight answers about how we work, quote, and cover jobs."
    />

    <section class="bob-section">
      <div class="bob-container max-w-3xl">
        <SectionsFaqList :items="faqs || []" />
      </div>
    </section>

    <SectionsCtaBand
      title="Still unsure?"
      description="Send us a message and we will help you choose the right service."
      primary-label="Contact us"
      primary-to="/contact"
    />
  </div>
</template>
