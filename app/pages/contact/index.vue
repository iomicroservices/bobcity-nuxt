<script setup lang="ts">
const site = await useSiteSettings()
const services = await useAllServices()

useSeoMeta({
  title: 'Contact',
  description: 'Request a free quote from Bob City for handyman, painting, or removals.'
})
</script>

<template>
  <div>
    <SectionsHeroBanner
      eyebrow="Contact"
      title="Get a free quote"
      description="Tell us what you need. We will confirm availability and next steps."
    />

    <section class="bob-section">
      <div class="bob-container grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <ContactForm :services="services || []" />

        <aside class="space-y-6">
          <div>
            <h2 class="font-display text-xl font-semibold text-highlighted">
              Prefer to talk?
            </h2>
            <ul class="mt-4 space-y-3 text-muted">
              <li v-if="site?.phone">
                <a
                  :href="`tel:${site.phone.replace(/\s/g, '')}`"
                  class="hover:text-primary"
                >{{ site.phone }}</a>
              </li>
              <li v-if="site?.email">
                <a
                  :href="`mailto:${site.email}`"
                  class="hover:text-primary"
                >{{ site.email }}</a>
              </li>
              <li v-if="site?.serviceAreaSummary">
                {{ site.serviceAreaSummary }}
              </li>
            </ul>
          </div>
          <p class="text-sm text-dimmed">
            Protected by Cloudflare Turnstile. Your details are stored securely and used only to respond to your enquiry.
          </p>
        </aside>
      </div>
    </section>
  </div>
</template>
