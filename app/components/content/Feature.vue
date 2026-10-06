<script setup lang="ts">
withDefaults(defineProps<{
  icon?: string
  to?: string
  orientation?: 'horizontal' | 'vertical'
}>(), {
  orientation: 'horizontal'
})
</script>

<template>
  <UPageFeature
    :icon="icon"
    :to="to"
    :orientation="orientation"
  >
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
  </UPageFeature>
</template>
