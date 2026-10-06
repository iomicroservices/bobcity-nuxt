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
    <UPageHero
      headline="Contact"
      title="Get a free quote"
      description="Tell us what you need. We will confirm availability and next steps."
    />

    <UContainer class="pb-16 sm:pb-24">
      <div class="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <UCard variant="subtle">
          <template #header>
            <h2 class="font-display text-xl font-semibold text-highlighted">
              Request a quote
            </h2>
          </template>
          <ContactForm :services="services || []" />
        </UCard>

        <div class="space-y-6">
          <UCard variant="subtle">
            <template #header>
              <h2 class="font-display text-xl font-semibold text-highlighted">
                Prefer to talk?
              </h2>
            </template>
            <ul class="space-y-3 text-muted">
              <li
                v-if="site?.phone"
                class="flex items-center gap-3"
              >
                <UIcon
                  name="i-lucide-phone"
                  class="size-4 text-primary"
                />
                <a
                  :href="`tel:${site.phone.replace(/\s/g, '')}`"
                  class="hover:text-primary"
                >{{ site.phone }}</a>
              </li>
              <li
                v-if="site?.email"
                class="flex items-center gap-3"
              >
                <UIcon
                  name="i-lucide-mail"
                  class="size-4 text-primary"
                />
                <a
                  :href="`mailto:${site.email}`"
                  class="hover:text-primary"
                >{{ site.email }}</a>
              </li>
              <li
                v-if="site?.serviceAreaSummary"
                class="flex items-start gap-3"
              >
                <UIcon
                  name="i-lucide-map-pin"
                  class="mt-0.5 size-4 text-primary"
                />
                <span>{{ site.serviceAreaSummary }}</span>
              </li>
            </ul>
          </UCard>

          <UAlert
            icon="i-lucide-shield-check"
            color="neutral"
            variant="subtle"
            title="Your details stay private"
            description="Protected by Cloudflare Turnstile. We only use your information to respond to your enquiry."
          />
        </div>
      </div>
    </UContainer>
  </div>
</template>
