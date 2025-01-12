"use client"

import { motion, AnimatePresence } from "motion/react"

import { useLanguage } from "@/components/Context/LanguageContext"

import ParallaxBackground from './ParallaxBackground'
import { getRelativeTime } from './utils'

export default function BlogItemBlock({ blog, index }: { blog: any, index: number }) {
    const lang = useLanguage().lang
    return (<>
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
        <div className='invisible mt-2 '>{getRelativeTime(blog.pubtime, lang == 'zh' ? 'zh-CN' : 'en-US')}</div>
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
    </>)
}