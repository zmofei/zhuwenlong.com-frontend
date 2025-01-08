// "use client"
import 'mapbox-gl/dist/mapbox-gl.css';
import Head from 'next/head';

import { motion, } from "motion/react"
// import { useEffect, useState, use } from 'react';
import { use } from 'react';
import { fetchBlogContent } from '@/app/actions/blog-server'
import Foot from '@/components/Common/Foot';
import Comments from '@/components/Comments/Comments';
import type { Metadata, ResolvingMetadata } from 'next'
import PageContent from './page_content';


const BlogCommentPrompts = [
  { "zh": "这篇文章花了不少心思写，希望能听听你的看法！", "en": "I put a lot of thought into this post—would love to hear your thoughts!" },
  { "zh": "如果这篇文章对你有帮助，或者让你有新的想法，欢迎留言！", "en": "If this post was helpful or sparked new ideas, feel free to leave a comment!" },
  { "zh": "关于文章中的内容，有任何见解都可以告诉我哦！", "en": "Got any insights on the content of this post? Let me know!" },
  { "zh": "你的反馈会让我写出更好的文章，期待你的留言！", "en": "Your feedback will help me write better posts—looking forward to it!" },
  { "zh": "文章中的内容是否对你有启发？留言分享你的观点吧！", "en": "Did this post inspire any ideas? Share your thoughts in the comments!" },
  { "zh": "如果有任何疑问或者不同意见，欢迎留言一起讨论！", "en": "Have questions or a different perspective? Let’s discuss in the comments!" },
  { "zh": "写这篇文章时想了很多问题，不知道你怎么看？", "en": "I had so many questions while writing this—what’s your take?" },
  { "zh": "这篇文章只是我的想法，你的观点一定能让它更丰富！", "en": "This post is just my perspective—your input will make it richer!" },
  { "zh": "你的留言可能会让更多人从中受益，欢迎分享你的看法！", "en": "Your comment might help others too—feel free to share your thoughts!" },
  { "zh": "如果觉得文章有值得讨论的地方，欢迎留言和我交流！", "en": "If there’s something worth discussing, leave a comment and let’s talk!" }
];


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
      {/* Comments */}
      <div className='max-w-7xl mx-auto 
              mt-5 text-xl 
              md:mt-18 md:text-3xl
            '>
        <Comments lang={lang} message_id={blog_id} singlePageMode={true} />
      </div>
    </div >

    {/* Foot */}
    <div className='mt-10 md:mt-20'>
      <Foot />
    </div>
  </>

}
