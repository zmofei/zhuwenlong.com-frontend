import type { MetadataRoute } from 'next'
import { fetchSiteMap } from './actions/blog'

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const siteUrl = 'https://www.mofei.life';
  const products = await fetchSiteMap()

  return products.flatMap(({ _id, pubtime }: { _id: string, pubtime: string }) => ([{
    url: `${siteUrl}/en/blog/article/${_id}`,
    lastModified: new Date(pubtime),
    alternates: {
      languages: {
        en: `${siteUrl}/en/blog/article/${_id}`,
        zh: `${siteUrl}/zh/blog/article/${_id}`,
      },
    },
    changeFrequency: 'monthly',
    priority: 1,
  }, {
    url: `${siteUrl}/zh/blog/article/${_id}`,
    lastModified: new Date(pubtime),
    alternates: {
      languages: {
        zh: `${siteUrl}/zh/blog/article/${_id}`,
        en: `${siteUrl}/en/blog/article/${_id}`,
      },
    },
    changeFrequency: 'monthly',
    priority: 1,
  }]))

}