<script setup lang="ts">
const site = await useSiteSettings()
const route = useRoute()

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  titleTemplate: title => title ? `${title} · Bob City` : 'Bob City'
})

const mobileItems = computed(() =>
  (site.value?.nav ?? []).map(item => ({
    label: item.label,
    to: item.to
  }))
)

const footerColumns = computed(() => [
  {
    label: 'Explore',
    children: (site.value?.nav ?? []).map(item => ({
      label: item.label,
      to: item.to
    }))
  },
  {
    label: 'Contact',
    children: [
      ...(site.value?.phone
        ? [{ label: site.value.phone, to: `tel:${site.value.phone.replace(/\s/g, '')}` }]
        : []),
      ...(site.value?.email
        ? [{ label: site.value.email, to: `mailto:${site.value.email}` }]
        : [])
    ]
  }
])
</script>

<template>
  <UApp>
    <UHeader class="bg-default/80 backdrop-blur-md">
      <template #left>
        <NuxtLink
          to="/"
          class="rounded-md outline-primary/25 focus-visible:outline-3"
        >
          <AppLogo />
        </NuxtLink>
      </template>

      <template #default>
        <AppNav />
      </template>

      <template #right>
        <UButton
          v-if="site?.phone"
          :to="`tel:${site.phone.replace(/\s/g, '')}`"
          color="neutral"
          variant="ghost"
          icon="i-lucide-phone"
          class="hidden md:inline-flex"
          size="md"
        />
        <UButton
          v-if="site?.cta"
          :to="site.cta.to"
          class="hidden sm:inline-flex"
          size="md"
        >
          {{ site.cta.label }}
        </UButton>
        <UColorModeButton />
      </template>

      <template #body>
        <UNavigationMenu
          :items="mobileItems"
          orientation="vertical"
          class="-mx-2.5"
        />
        <UButton
          v-if="site?.cta"
          :to="site.cta.to"
          class="mt-4 w-full"
          block
        >
          {{ site.cta.label }}
        </UButton>
      </template>
    </UHeader>

    <UMain>
      <NuxtPage :key="route.path" />
    </UMain>

    <UFooter>
      <template #top>
        <UContainer>
          <UFooterColumns :columns="footerColumns">
            <template #left>
              <div class="min-w-0 max-w-sm">
                <AppLogo />
                <p class="mt-3 text-sm text-pretty text-muted">
                  {{ site?.tagline }}
                </p>
                <p
                  v-if="site?.serviceAreaSummary"
                  class="mt-2 text-sm text-pretty text-muted"
                >
                  {{ site.serviceAreaSummary }}
                </p>
              </div>
            </template>
          </UFooterColumns>
        </UContainer>
      </template>

      <template #left>
        <p class="text-sm text-muted">
          © {{ new Date().getFullYear() }} Bob City. All rights reserved.
        </p>
      </template>

      <template #right>
        <p class="text-sm text-muted">
          bobcity.co.uk
        </p>
      </template>
    </UFooter>
  </UApp>
</template>
