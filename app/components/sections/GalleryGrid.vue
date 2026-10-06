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
  <UPageGrid>
    <UPageCard
      v-for="item in items"
      :key="item.id || item.title"
      :title="item.title"
      :description="item.description"
      variant="subtle"
      class="overflow-hidden"
    >
      <template #header>
        <div class="aspect-4/3 min-w-0 overflow-hidden rounded-lg bg-elevated">
          <img
            :src="item.image"
            :alt="item.title"
            class="size-full object-cover transition duration-500 hover:scale-[1.03]"
            loading="lazy"
          >
        </div>
      </template>
      <template
        v-if="item.location"
        #footer
      >
        <p class="text-xs tracking-wide text-dimmed uppercase">
          {{ item.location }}
        </p>
      </template>
    </UPageCard>
  </UPageGrid>
</template>
