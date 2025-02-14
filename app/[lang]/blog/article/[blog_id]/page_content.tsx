"use client"

import { motion, } from "motion/react"
import React from "react";
import HtmlToReact from './HtmlToReact';
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

export default function PageContent({ params }: { params: { content: any, lang: 'zh' | 'en', blog_id: string } }) {
    const { content: blog, lang, blog_id } = params;


    return <>
        <motion.div className='
                  max-w-7xl mx-auto shadow-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#a1c4fd] to-[#c2e9fb] 
                  text-3xl 
                  pb-2
                  md:text-5xl 
                  mb-0 md:mb-3
                  !leading-normal
                '
            initial={{ translateY: 100, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
        >
            {blog.title}
        </motion.div>
        <motion.div className='max-w-7xl mx-auto prose-stone prose-xl-invert overflow-y-auto break-words 
                  prose-base 
                  md:prose-xl custom-paragraph'
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
        >
            {(() => {
                try {
                    // 使用 HtmlToReact 进行渲染
                    return <HtmlToReact htmlString={blog.html} />;
                } catch (error) {
                    console.error("HtmlToReact failed:", error);
                    // HtmlToReact 渲染失败时回退到 dangerouslySetInnerHTML
                    return <div dangerouslySetInnerHTML={{ __html: blog.html }} />;
                }
            })()}
        </motion.div>
        <div className="text-center my-10">
            <img src="/article/start.png" alt="" className="w-14 md:w-16 inline-block m-2  p-0 align-middle" />
            <div>
                <span className="inline-block text-xl align-middle">THE END</span>
            </div>
        </div>
        {/* previous */}

        {(blog.previous || blog.next) && <div
            className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mt-4  text-base md:text-lg custom-paragraph border-t border-b border-gray-800 py-4 leading-loose"
        >
            {blog.previous && (
                <div className="text-left whitespace-nowrap text-ellipsis overflow-hidden" title={blog.previous.title}>
                    <ChevronLeftIcon className="size-4 md:inline-block hidden" /> <span>{lang == 'zh' ? '上一篇：' : 'Previous: '}</span><Link href={`/${lang}/blog/article/${blog.previous._id}`}>{blog.previous?.title}</Link>
                </div>
            )}
            {/* next */}
            {blog.next && (
                <div className="text-left md:text-right   whitespace-nowrap text-ellipsis overflow-hidden relative pr-3" title={blog.next.title}>
                    <span>{lang == 'zh' ? '下一篇：' : 'Next: '}</span><Link href={`/${lang}/blog/article/${blog.next._id}`}>{blog.next?.title}</Link> <ChevronRightIcon className="size-4 absolute right-0 top-1 mt-1  md:inline-block hidden" />
                </div>
            )}
        </div>}
    </>
}
