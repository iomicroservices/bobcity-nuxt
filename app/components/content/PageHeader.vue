<script setup lang="ts">
defineProps<{
  headline?: string
}>()
</script>

<template>
  <UContainer class="pt-10 sm:pt-14">
    <UPageHeader :headline="headline">
      <template
        v-if="$slots.headline"
        #headline
      >
        <slot
          name="headline"
          mdc-unwrap="p"
        />
      </template>

      <template
        v-if="$slots.title"
        #title
      >
        <slot
          name="title"
          mdc-unwrap="p"
        />
      </template>

      <template
        v-if="$slots.description"
        #description
      >
        <slot
          name="description"
          mdc-unwrap="p"
        />
      </template>

      <slot />
    </UPageHeader>
  </UContainer>
</template>
