<script setup lang="ts">
withDefaults(defineProps<{
  primaryTo?: string
  secondaryTo?: string
  orientation?: 'vertical' | 'horizontal'
}>(), {
  orientation: 'vertical'
})
</script>

<template>
  <UPageHero :orientation="orientation">
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
      v-if="$slots.links || primaryTo || secondaryTo"
      #links
    >
      <slot name="links">
        <UButton
          v-if="primaryTo"
          :to="primaryTo"
          size="xl"
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
          size="xl"
          color="neutral"
          variant="outline"
        >
          <slot
            name="secondary"
            mdc-unwrap="p"
          >
            View services
          </slot>
        </UButton>
      </slot>
    </template>

    <div
      v-if="$slots.default"
      class="min-w-0 w-full"
    >
      <slot />
    </div>
  </UPageHero>
</template>
