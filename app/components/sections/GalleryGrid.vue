<script setup lang="ts">
defineProps<{
  items: Array<{
    id?: string
    title: string
    description?: string
    image: string
    location?: string
  }>
}>()
</script>

<template>
  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <figure
      v-for="item in items"
      :key="item.id || item.title"
      class="group"
    >
      <div class="aspect-[4/3] overflow-hidden bg-steel-900">
        <img
          :src="item.image"
          :alt="item.title"
          class="size-full object-cover opacity-90 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
          loading="lazy"
        >
      </div>
      <figcaption class="mt-3">
        <h3 class="font-display text-lg font-semibold text-highlighted">
          {{ item.title }}
        </h3>
        <p
          v-if="item.description"
          class="mt-1 text-sm text-muted"
        >
          {{ item.description }}
        </p>
        <p
          v-if="item.location"
          class="mt-1 text-xs tracking-wide text-dimmed uppercase"
        >
          {{ item.location }}
        </p>
      </figcaption>
    </figure>
  </div>
</template>
