// "use client"
import 'mapbox-gl/dist/mapbox-gl.css';

import { fetchBlogContent } from '@/app/actions/blog-server'
import Foot from '@/components/Common/Foot';
import Comments from '@/components/Comments/Comments';
import Recommend from './recommends';
import BlogComments from './comments';
import type { Metadata, ResolvingMetadata } from 'next'
import PageContent from './page_content';


export async function generateMetadata({ params }: any): Promise<Metadata> {
  const lang = (await params).lang
  const blog_id = (await params).blog_id

  const blog = await fetchBlogContent(blog_id, lang)

  return {
    title: `${blog.title} | ${lang === 'zh' ? '你好我是Mofei' : 'Hi! I am Mofei!'}`,
  }
}


export default async function Home({ params }: { params: Promise<{ lang: 'zh' | 'en', blog_id: string }> }) {
  const lang = (await params).lang
  const blog_id = (await params).blog_id
  const blog = await fetchBlogContent(blog_id, lang)


  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.mofei.life/${lang}/blog/article/${blog._id}`
    },
    "headline": blog.title,
    "description": blog.introduction,
    "image": blog.cover,
    "author": {
      "@type": "Person",
      "name": "Mofei Zhu",
      "alternateName": "朱文龙",
      "url": "https://www.mofei.life",
      "description": "Mofei Zhu, a software engineer from China, sharing life and work experiences in Finland, exploring tech, family, and cultural adventures.",
      "sameAs": [
        "https://www.instagram.com/zhu_wenlong",
        "https://github.com/zmofei"
      ]
    },
    "publisher": {
      "@type": "Person",
      "name": "Mofei Zhu",
      "alternateName": "朱文龙",
      "url": "https://www.mofei.life",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.mofei.life/img/mofei-logo_500_500.svg"
      }
    },
    "datePublished": blog.pubtime,
    "dateModified": blog.pubtime,
    "keywords": blog.keywords
  };


  return <>
    {/* structured data */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />

    {/* Main html */}
    <div className='min-h-screen
      mt-20 px-5 
      md:mt-32 md:px-10 
    '>
      <PageContent params={{ content: blog, lang, blog_id }} />
      {/* Recommend blogs */}

      <Recommend links={blog.links} />

      {/* Comments */}
      <BlogComments lang={lang} message_id={blog_id} />
    </div >

    {/* Foot */}
    <div className='mt-10 md:mt-20'>
      <Foot />
    </div>
  </>

}
