"use client"
import 'mapbox-gl/dist/mapbox-gl.css';

import { motion } from "motion/react"
import Pagination from '@/components/Common/Pagination';
import Foot from '@/components/Common/Foot';
import { useEffect, useRef, useState, use } from 'react';
import Link from 'next/link';

import { fetchBlogList } from '@/app/actions/blog'

import ParallaxBackground from './ParallaxBackground'
import BlogBannerTitle from './BlogBannerTitle'


export default function Home({ params }: { params: any }) {

  const { lang, blog_page }: { lang: 'zh' | 'en', blog_page: number } = use(params)

  const [blogList, setBlogList] = useState([])
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchBlogList(blog_page, lang).then((res) => {
      setBlogList(res.data)
      const totalCount = res.count
      const pageSize = 12
      setTotalPages(Math.ceil(totalCount / pageSize))
    })
  }, [blog_page, lang])

  return (
    <>
      <div className=' container max-w-[2000px] m-auto'>
        <BlogBannerTitle lang={lang} />
      </div >
      <div className='grid  text-black bg-none mt-10 gap-x-6 container max-w-[2000px] m-auto min-h-lvh
        grid-cols-1 px-5 gap-y-10
        md:grid-cols-2 md:px-10 md:gap-y-20
        lg:grid-cols-3 
      '>
        {blogList.map((blog: any, index: number) => {
          return (
            <Link href={`/blog/article/${blog._id}`} target='_blank'>
              <motion.div
                key={index}
                className=''
                initial={{ opacity: 0, y: 50 }} // 初始透明度和位置
                animate={{ opacity: 1, y: 0 }} // 动画结束时恢复正常
                transition={{
                  duration: 0.2, // 动画时长
                  delay: index * 0.1, // 根据索引延迟
                }}
              >
                <ParallaxBackground blog={blog} />
                <motion.div
                  className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#a1c4fd] to-[#c2e9fb] line-clamp-2
                  text-xl mt-2
                  md:text-2xl md:mt-4'
                  initial={{ opacity: 0, x: -200 }} // 标题初始位置
                  animate={{ opacity: 1, x: 0 }} // 标题淡入和上滑
                  exit={{ opacity: 0, x: 200 }} // 标题淡出和下滑
                  transition={{
                    duration: 0.2,
                    delay: index * 0.1, // 延迟时间稍微不同
                  }}
                >
                  {blog.title}
                </motion.div>
                <motion.div className='text-gray-200 line-clamp-3
                text-base mt-2
                md:text-md md:mt-5'
                  initial={{ opacity: 0, x: -200 }} // 介绍初始位置
                  animate={{ opacity: 1, x: 0 }} // 介绍淡入和上滑
                  exit={{ opacity: 0, x: 200 }} // 介绍淡出和下滑
                  transition={{
                    duration: 0.2,
                    delay: 0.5 + index * 0.1, // 延迟时间稍微不同
                  }}
                >
                  {blog.introduction}
                </motion.div>
              </motion.div>
            </Link>
          )
        })}
      </div>

      {totalPages > 1 && (<div className='py-8 mt-10'>
        <Pagination lang={lang} currentPage={Number(blog_page)} totalPages={totalPages} baseURL='/blog/' onPageChange={(page: number) => {
          console.log('page', page)
        }}
        />
      </div>)}

      <div className='mt-24'>
        <Foot />
      </div>
    </>
  );
}
