<script setup lang="ts">
const props = defineProps<{
  items: Array<{
    id?: string
    question: string
    answer: string
  }>
}>()

const accordionItems = computed(() =>
  props.items.map((item, index) => ({
    label: item.question,
    content: item.answer,
    value: item.id || String(index)
  }))
)
</script>

<template>
  <UAccordion
    type="multiple"
    :items="accordionItems"
    :unmount-on-hide="false"
  />
</template>
