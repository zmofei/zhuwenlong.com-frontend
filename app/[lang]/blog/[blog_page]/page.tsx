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

import { getRelativeTime } from './utils'


export default async function BlogPage({ params }: { params: any }) {

  const { lang, blog_page }: { lang: 'zh' | 'en', blog_page: number } = await (params)

  const blogInfo = (await fetchBlogList(blog_page, lang));
  const blogList = blogInfo.data;
  const totalPages = Math.ceil(blogInfo.count / 12);
  console.log(totalPages)

  // return (<>1</>)


  // const messageArea = useRef<HTMLDivElement>(null)

  // const baseURL = `/${lang}/blog/`


  return (
    <>
      <div className=' container max-w-[2000px] m-auto'>
        <BlogBannerTitle lang={lang} />
      </div >
      <div id="blogList" className='relative -top-24 invisible'></div>
      <div
        className='grid  text-black bg-none mt-10 gap-x-6 container max-w-[2000px] m-auto min-h-lvh
        grid-cols-1 px-5 gap-y-10
        md:grid-cols-2 md:px-10 2xl:gap-y-16
        lg:grid-cols-3 
      '>
        {blogList.map((blog: any, index: number) => {
          return (
            <Link href={`/${lang}/blog/article/${blog._id}`} target='_blank' className='relative'>
              <div
                key={index}
              >
                <BlogItemBlock blog={blog} index={index} />
              </div>
            </Link>
          )
        })}
      </div>

      <BlogPagination blog_page={Number(blog_page)} totalPages={totalPages} baseURL={`/${lang}/blog`} />

      <div className='mt-10 md:mt-24'>
        <Foot />
      </div>
    </>
  );
}
