<script setup lang="ts">
const { data: posts } = await useAsyncData('blog-posts', () =>
  queryCollection('blog').order('date', 'DESC').all()
)

useSeoMeta({
  title: 'Blog',
  description: 'Tips and project notes from the Bob City team.'
})
</script>

<template>
  <div>
    <SectionsHeroBanner
      eyebrow="Blog"
      title="Practical notes from the job"
      description="Guides, prep tips, and updates from our day-to-day work."
    />

    <section class="bob-section">
      <div class="bob-container space-y-8">
        <article
          v-for="post in posts"
          :key="post.path"
          class="border-b border-default pb-8"
        >
          <p class="text-xs tracking-wide text-dimmed uppercase">
            {{ post.date }}
          </p>
          <h2 class="font-display mt-2 text-2xl font-semibold">
            <NuxtLink
              :to="post.path"
              class="text-highlighted hover:text-primary"
            >
              {{ post.title }}
            </NuxtLink>
          </h2>
          <p class="mt-2 max-w-2xl text-muted">
            {{ post.description }}
          </p>
        </article>
      </div>
    </section>
  </div>
</template>
