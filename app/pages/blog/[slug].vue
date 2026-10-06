<script setup lang="ts">
const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { data: post } = await useAsyncData(
  () => `blog-${slug.value}`,
  () => queryCollection('blog').path(`/blog/${slug.value}`).first()
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

useSeoMeta({
  title: post.value.seo?.title || post.value.title,
  description: post.value.seo?.description || post.value.description
})
</script>

<template>
  <div v-if="post">
    <UPageHero
      headline="Blog"
      :title="post.title"
      :description="post.description"
    />

    <UContainer class="pb-16 sm:pb-24">
      <article class="mx-auto max-w-3xl">
        <p class="mb-8 text-sm text-dimmed">
          {{ post.date }} · {{ post.author }}
        </p>
        <ContentRenderer
          :value="post"
          class="prose prose-neutral dark:prose-invert max-w-none"
        />
      </article>
    </UContainer>
  </div>
</template>
