<script setup lang="ts">
withDefaults(defineProps<{
  icon?: string
  orientation?: 'vertical' | 'horizontal'
}>(), {
  orientation: 'vertical'
})
</script>

<template>
  <UPageSection
    :icon="icon"
    :orientation="orientation"
  >
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

    <template
      v-if="$slots.default"
      #body
    >
      <slot />
    </template>

    <template
      v-if="$slots.links"
      #links
    >
      <slot name="links" />
    </template>
  </UPageSection>
</template>
