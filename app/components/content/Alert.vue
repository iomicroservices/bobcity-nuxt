<script setup lang="ts">
withDefaults(defineProps<{
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  icon?: string
  variant?: 'solid' | 'outline' | 'soft' | 'subtle'
}>(), {
  color: 'primary',
  variant: 'subtle',
  icon: 'i-lucide-info'
})
</script>

<template>
  <UAlert
    :color="color"
    :icon="icon"
    :variant="variant"
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
  </UAlert>
</template>
