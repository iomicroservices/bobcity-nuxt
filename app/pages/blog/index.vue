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
    <UPageHero
      headline="Blog"
      title="Practical notes from the job"
      description="Guides, prep tips, and updates from our day-to-day work."
    />

    <UPageSection>
      <template #body>
        <UPageGrid>
          <UPageCard
            v-for="post in posts"
            :key="post.path"
            :title="post.title"
            :description="post.description"
            :to="post.path"
            variant="subtle"
            spotlight
          >
            <template #footer>
              <p class="text-xs tracking-wide text-dimmed uppercase">
                {{ post.date }}
              </p>
            </template>
          </UPageCard>
        </UPageGrid>
      </template>
    </UPageSection>
  </div>
</template>
