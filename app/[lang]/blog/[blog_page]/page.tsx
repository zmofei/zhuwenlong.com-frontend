import 'mapbox-gl/dist/mapbox-gl.css';

import { motion, AnimatePresence } from "motion/react"
import Pagination from '@/components/Common/Pagination';
import Foot from '@/components/Common/Foot';
import { use } from 'react';
import Link from 'next/link';

import { fetchBlogList } from '@/app/actions/blog-server';

import ParallaxBackground from './ParallaxBackground'
import BlogBannerTitle from './BlogBannerTitle'
import BlogItemBlock from './BlogItemBlock'
import BlogPagination from './BlogPagination'

import type { Metadata, ResolvingMetadata } from 'next'


export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { lang, blog_page }: { lang: 'zh' | 'en', blog_page: number } = await (params)

  return {
    alternates: {
      canonical: `https://www.mofei.life/${lang}/blog/${blog_page}`,
      languages: {
        'en': `https://www.mofei.life/en/blog/${blog_page}`,
        'zh': `https://www.mofei.life/zh/blog/${blog_page}`,
      }
    },
  }
}


export default async function BlogPage({ params }: { params: any }) {

  const { lang, blog_page }: { lang: 'zh' | 'en', blog_page: number } = await (params)

  const blogInfo = (await fetchBlogList(blog_page, lang));
  const blogList = blogInfo.list;
  const totalPages = Math.ceil(blogInfo.count / 12);




  return (
    <>
      <div className=' container max-w-[2000px] m-auto'>
        <BlogBannerTitle lang={lang} />
      </div >
      <div id="blogList" className='relative -top-24 invisible'></div>
      {blogList && (<div
        className='grid  text-black bg-none mt-10 gap-x-6 container max-w-[2000px] m-auto 
        grid-cols-1 px-5 gap-y-10
        md:grid-cols-2 md:px-10 2xl:gap-y-16
        lg:grid-cols-3 
      '>
        {blogList?.map((blog: any, index: number) => {
          return (
            <Link href={`/${lang}/blog/article/${blog._id}`} className='relative' prefetch={true}>
              <div
                key={index}
              >
                <BlogItemBlock blog={blog} index={index} />
              </div>
            </Link>
          )
        })}
      </div>)}

      {!blogList && (
        <div className="flex flex-col items-center justify-center text-white mt-20">
          <div className="text-center p-6 bg-gray-800 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-semibold mb-2">😕 {lang == 'zh' ? '没有找到博客' : ' No Blog Found'}</h1>
            <p className="text-gray-400">{lang == 'zh' ? '您访问的页面没有博客内容，请返回首页。' : ' The page you visited has no blog content. Please return to the homepage.'} </p>
            <a href='/blog/1'
              className="inline-block mt-4 px-6 py-2 text-lg font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
            >
              {lang == 'zh' ? '返回博客列表第一页' : 'Return to first page of blog list'}
            </a>
          </div>
        </div>
      )}

      <BlogPagination blog_page={Number(blog_page)} totalPages={totalPages} baseURL={`/${lang}/blog`} />

      <div className='mt-10 md:mt-24'>
        <Foot />
      </div>
    </>
  );
}
