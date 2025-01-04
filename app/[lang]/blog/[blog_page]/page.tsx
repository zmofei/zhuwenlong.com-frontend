"use client"
import 'mapbox-gl/dist/mapbox-gl.css';

import { motion, AnimatePresence } from "motion/react"
import Pagination from '@/components/Common/Pagination';
import Foot from '@/components/Common/Foot';
import { useEffect, useRef, useState, use } from 'react';
import Link from 'next/link';

import { fetchBlogList } from '@/app/actions/blog'

import ParallaxBackground from './ParallaxBackground'
import BlogBannerTitle from './BlogBannerTitle'

function getRelativeTime(timestamp: string, lang = 'en') {
  const now = Date.now();
  const diff = now - new Date(timestamp).getTime();
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });


  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return rtf.format(-seconds, 'second');

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return rtf.format(-minutes, 'minute');

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return rtf.format(-hours, 'hour');

  const days = Math.floor(hours / 24);
  if (days < 30) return rtf.format(-days, 'day');

  const months = Math.floor(days / 30);
  if (months < 12) return rtf.format(-months, 'month');

  const years = Math.floor(months / 12);
  return rtf.format(-years, 'year');
}

export default function Home({ params }: { params: any }) {

  const { lang, blog_page }: { lang: 'zh' | 'en', blog_page: number } = use(params)

  const [blogList, setBlogList] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [blogPage, setMessagePage] = useState(blog_page)
  const [isLoading, setIsLoading] = useState(false)

  const messageArea = useRef<HTMLDivElement>(null)

  const baseURL = `/${lang}/blog/`

  useEffect(() => {
    setIsLoading(true)
    fetchBlogList(blogPage, lang).then((res) => {
      setBlogList(res.data)
      const totalCount = res.count
      const pageSize = 12
      setTotalPages(Math.ceil(totalCount / pageSize))
      setIsLoading(false)
    })
  }, [blogPage, lang])

  return (
    <>
      <div className=' container max-w-[2000px] m-auto'>
        <BlogBannerTitle lang={lang} />
      </div >
      <div ref={messageArea} className='relative -top-24 invisible'></div>
      <div
        className='grid  text-black bg-none mt-10 gap-x-6 container max-w-[2000px] m-auto min-h-lvh
        grid-cols-1 px-5 gap-y-10
        md:grid-cols-2 md:px-10 md:gap-y-20
        lg:grid-cols-3 
      '>
        {isLoading && ([...Array(12)].map((_, index) => {
          return (
            <AnimatePresence>
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }} // 初始透明度和位置
                animate={{ opacity: 1, y: 0 }} // 动画结束时恢复正常
                exit={{ opacity: 0, y: 50 }} // 动画结束时恢复正常
                transition={{
                  duration: 0.2, // 动画时长
                  delay: index * 0.1, // 根据索引延迟
                }}
              >
                {/* <div className='bg-gray-200 h-6 w-1/2 mt-3 rounded-lg'></div> */}
                <motion.div
                  className='w-full relative overflow-hidden bg-slate-700 
                  h-56 
                  md:h-96
                '
                  animate={{ opacity: 0.5 }}
                  initial={{ opacity: 0.3 }}
                  transition={{ repeat: Infinity, duration: 1, repeatType: 'reverse' }}
                />
                <motion.div
                  className='
                  mt-2
                  md:mt-4
                  bg-slate-700 h-6 w-1/2'
                  initial={{ opacity: 0.3, }} // 标题初始位置
                  animate={{ opacity: 0.5, }} // 标题淡入和上滑
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                />
                <motion.div
                  className='
                  mt-2
                  md:mt-4
                  bg-slate-700 h-6 w-full'
                  initial={{ opacity: 0.3, }} // 标题初始位置
                  animate={{ opacity: 0.5, }} // 标题淡入和上滑
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                />
                <motion.div
                  className='
                  mt-2
                  md:mt-4
                  bg-slate-700 h-6 w-full'
                  initial={{ opacity: 0.3, }} // 标题初始位置
                  animate={{ opacity: 0.5, }} // 标题淡入和上滑
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                />

              </motion.div>
            </AnimatePresence>
          )
        }))
        }

        {blogList.map((blog: any, index: number) => {
          return (
            <Link href={`/${lang}/blog/article/${blog._id}`} target='_blank' className='relative'>
              <div
                key={index}
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
                  title={blog.introduction}
                >
                  {blog.introduction}
                </motion.div>
                {/* <div className='mt-2' dangerouslySetInnerHTML={{ __html: blog.content }} /> */}
                <div className=' invisible mt-2 '>{getRelativeTime(blog.pubtime, lang == 'zh' ? 'zh-CN' : 'en-US')}</div>
                <motion.div className='mt-2 text-gray-500 absolute bottom-0'
                  initial={{ opacity: 0, x: -200 }} // 介绍初始位置
                  animate={{ opacity: 1, x: 0 }} // 介绍淡入和上滑
                  exit={{ opacity: 0, x: 200 }} // 介绍淡出和下滑
                  transition={{
                    duration: 0.2,
                    delay: 0.5 + index * 0.1, // 延迟时间稍微不同
                  }}
                  title={new Date(blog.pubtime).toLocaleDateString(
                    lang == 'zh' ? 'zh-CN' : 'en-US'
                    , {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}>
                  {getRelativeTime(blog.pubtime, lang == 'zh' ? 'zh-CN' : 'en-US')}
                </motion.div>
              </div>
            </Link>
          )
        })}
      </div>

      {totalPages > 1 && (<div className='py-8 mt-10'>
        <Pagination lang={lang} currentPage={Number(blog_page)} totalPages={totalPages} baseURL={baseURL} onPageChange={(page: number) => {
          history.pushState({}, '', `${baseURL}${page}`)
          setMessagePage(page)
          messageArea.current && messageArea.current.scrollIntoView({
            behavior: 'smooth', // 平滑滚动
            block: 'start',     // 元素滚动到视口顶部
          });
        }}
        />
      </div>)}

      <div className='mt-10 md:mt-24'>
        <Foot />
      </div>
    </>
  );
}
