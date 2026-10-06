<script setup lang="ts">
withDefaults(defineProps<{
  primaryTo?: string
  secondaryTo?: string
  variant?: 'solid' | 'outline' | 'soft' | 'subtle' | 'naked'
  orientation?: 'vertical' | 'horizontal'
}>(), {
  variant: 'subtle',
  orientation: 'horizontal'
})
</script>

<template>
  <UPageCTA
    :variant="variant"
    :orientation="orientation"
    class="rounded-xl"
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
      v-if="$slots.links || primaryTo || secondaryTo"
      #links
    >
      <slot name="links">
        <UButton
          v-if="primaryTo"
          :to="primaryTo"
          size="lg"
          trailing-icon="i-lucide-arrow-right"
        >
          <slot
            name="primary"
            mdc-unwrap="p"
          >
            Get a free quote
          </slot>
        </UButton>
        <UButton
          v-if="secondaryTo"
          :to="secondaryTo"
          size="lg"
          color="neutral"
          variant="ghost"
        >
          <slot
            name="secondary"
            mdc-unwrap="p"
          >
            Learn more
          </slot>
        </UButton>
      </slot>
    </template>

    <slot />
  </UPageCTA>
</template>
