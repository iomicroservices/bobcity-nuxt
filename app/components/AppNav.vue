<script setup lang="ts">
const site = await useSiteSettings()

const items = computed(() =>
  (site.value?.nav ?? []).map(item => ({
    label: item.label,
    to: item.to
  }))
)
</script>

<template>
  <UNavigationMenu
    :items="items"
    content-orientation="vertical"
    class="hidden xl:flex"
  />
</template>
