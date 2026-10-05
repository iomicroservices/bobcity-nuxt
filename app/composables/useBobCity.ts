export async function useSiteSettings() {
  const { data } = await useAsyncData('site-settings', () =>
    queryCollection('site').first()
  )
  return data
}

export async function useFeaturedServices() {
  const { data } = await useAsyncData('featured-services', () =>
    queryCollection('services')
      .where('featured', '=', true)
      .order('order', 'ASC')
      .all()
  )
  return data
}

export async function useAllServices() {
  const { data } = await useAsyncData('all-services', () =>
    queryCollection('services').order('order', 'ASC').all()
  )
  return data
}
