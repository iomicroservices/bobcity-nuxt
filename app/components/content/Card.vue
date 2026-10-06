<script setup lang="ts">
withDefaults(defineProps<{
  icon?: string
  to?: string
  variant?: 'solid' | 'outline' | 'soft' | 'subtle' | 'naked'
  spotlight?: boolean
}>(), {
  variant: 'subtle',
  spotlight: true
})
</script>

<template>
  <UPageCard
    :icon="icon"
    :to="to"
    :variant="variant"
    :spotlight="spotlight"
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

    <template
      v-if="$slots.footer"
      #footer
    >
      <slot name="footer" />
    </template>

    <slot />
  </UPageCard>
</template>
