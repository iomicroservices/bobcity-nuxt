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

    <footer class="border-t border-default">
      <div class="bob-container py-12">
        <div class="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <AppLogo />
            <p class="mt-3 max-w-md text-sm text-muted">
              {{ site?.tagline }}
            </p>
          </div>
          <div>
            <p class="text-sm font-semibold text-highlighted">
              Explore
            </p>
            <ul class="mt-3 space-y-2 text-sm">
              <li
                v-for="item in site?.nav"
                :key="item.to"
              >
                <NuxtLink
                  :to="item.to"
                  class="text-muted hover:text-primary"
                >
                  {{ item.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div>
            <p class="text-sm font-semibold text-highlighted">
              Contact
            </p>
            <ul class="mt-3 space-y-2 text-sm text-muted">
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
        </div>
        <div class="mt-10 flex flex-col gap-2 border-t border-default pt-6 text-xs text-dimmed sm:flex-row sm:items-center sm:justify-between">
          <p>© {{ new Date().getFullYear() }} Bob City. All rights reserved.</p>
          <p>bobcity.co.uk</p>
        </div>
      </div>
    </footer>
  </UApp>
</template>
