"use client";
import { motion, } from "motion/react"
import { useLanguage } from '@/components/Context/LanguageContext'
import { useEffect, useState } from "react";
import Link from "next/link";

import { HashtagIcon } from '@heroicons/react/24/outline'


export default function Recommend({ blogRecommend }: { blogRecommend: Array<any> }) {

    if (!blogRecommend) {
        return <></>
    }


    const { lang } = useLanguage()


    return blogRecommend.length == 0 ? <></> : (
        <div className='max-w-7xl mx-auto 
              mt-10 text-xl 
              md:mt-18 md:text-3xl
              mb-10
            '>
            <motion.div>
                <motion.h3
                    className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#a1c4fd] to-[#c2e9fb] mb-6'
                    animate={{ opacity: 1, translateY: 0 }}
                    initial={{ opacity: 0, translateY: 20 }}
                >{lang == 'zh' ? '更多你可能感兴趣的文章' : 'More Articles You Might Be Interested In'}</motion.h3>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 overflow-hidden">
                {[...blogRecommend.slice(0, 10)].map((recommend: any, index: number) => {
                    const link = recommend.metadata
                    const title = lang == 'zh' ? link.title : link['title_en']
                    return (
                        <div key={`recommends_${index}`} className='mt-0'>
                            <motion.div
                                className="w-full truncate inline-block"
                                animate={{ opacity: 1, translateY: 0 }}
                                initial={{ opacity: 0, translateY: 20 }}
                            >
                                <Link
                                    href={`/${lang}/blog/article/${link.blog_id}`} target='_blank'
                                    className='text-base md:text-xl text-gray-400 hover:text-gray-200'
                                    title={title}
                                >
                                    <HashtagIcon className="size-4 mr-2 inline-block" />{title}
                                </Link>
                            </motion.div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}