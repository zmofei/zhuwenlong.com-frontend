"use client"
import 'mapbox-gl/dist/mapbox-gl.css';

import { motion, AnimatePresence } from "motion/react"
import Lan from "@/components/util/Language";
import { useEffect, useState, use } from 'react';


export default function BlogBannerTitle(params: { lang: 'zh' | 'en' }) {

    const { lang } = params


    const TitleList = [
        { "zh": "生活的热爱", "en": "Love & Life" },
        { "zh": "远方的风景", "en": "Scenery Of Distant" },
        { "zh": "思想的碰撞", "en": "Clash Of Ideas" },
        { "zh": "成长的足迹", "en": "Footprints & Growth" },
        { "zh": "温暖的瞬间", "en": "Warm Moment" },
        { "zh": "未来的期待", "en": "Hope For The Future" },
        { "zh": "一切有趣的事", "en": "Everything Interesting" }
    ]

    const [TitleIndex, setTitleIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setTitleIndex((prevIndex) => {
                if (prevIndex != TitleList.length - 1) {
                    return prevIndex === TitleList.length - 1 ? 0 : prevIndex + 1
                } else {
                    clearInterval(timer)
                    return TitleList.length - 1
                }
            });
        }, lang == 'zh' ? 300 : 300); // 2秒钟切换下一句

        return () => clearInterval(timer); // 清理定时器
    }, []);

    return (
        <>
            <div className=' container max-w-[2000px] m-auto overflow-x-hidden'>
                <div className='overflow-hidden font-extrabold'>
                    <motion.h2 className={`w-full font-extrabold  text-white leading-snug
                        ml-5 mt-20  ${(lang == 'zh' ? 'text-5xl' : 'text-4xl')}
                        lg:ml-10 lg:mt-32 ${(lang == 'zh' ? 'lg:text-8xl' : 'lg:text-7xl')}
                        2xl:ml-10 2xl:mt-32 2xl:leading-tight ${(lang == 'zh' ? '2xl:text-[9rem]' : '2xl:text-[8rem]')}`}
                    >
                        <motion.div
                            className='2xl:-mb-10 inline-block'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 0,
                                delay: 0
                            }}
                        >
                            <Lan lang={lang} candidate={{
                                "zh": "我",
                                "en": "I "
                            }} />
                        </motion.div>
                        {lang == 'en' ? " " : ""}
                        <motion.div
                            className='2xl:-mb-10 inline-block'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 0,
                                delay: .3
                            }}
                        >
                            <Lan lang={lang} candidate={{
                                "zh": "书写",
                                "en": "Write"
                            }} />
                        </motion.div>

                        <motion.div className=''
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 0,
                                delay: .6
                            }}
                        >
                            <AnimatePresence>
                                <motion.div
                                    className='no-wrap text-ellipsis overflow-hidden pb-2 pr-10'
                                    key={TitleIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        opacity: { duration: 0 },
                                    }}
                                    style={{
                                        position: "absolute", // 确保只有一行可见
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        letterSpacing: "-0.05em",
                                    }}
                                >
                                    <Lan lang={lang} candidate={TitleList[TitleIndex]} />
                                    {TitleIndex === TitleList.length - 1 &&
                                        <motion.span
                                            className='inline-block '
                                            initial={{ rotate: 0 }}
                                            animate={{ rotate: 45 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 100,
                                                duration: .4,
                                                // delay: .6
                                            }}
                                        >*</motion.span>
                                    }
                                </motion.div>
                            </AnimatePresence>

                            <div className='invisible no-wrap text-ellipsis overflow-hidden pb-2 pr-2' style={{
                                whiteSpace: "nowrap",
                                letterSpacing: "-0.05em",
                            }}>{TitleList[TitleIndex][lang]}</div>
                        </motion.div>
                    </motion.h2>
                    <div></div>
                </div >

                <div>
                    {TitleIndex !== TitleList.length - 1 && (<div className='box-border 2xl:top-20 invisible
                    ml-5 mt-2
                    xl:ml-10
          '><Lan lang={lang} candidate={{
                            "zh": "*只要心怀梦想，写下的每个字都能点亮世界，哪怕只是开始，也是在书写属于自己的奇迹。",
                            "en": "*As long as you have a dream, every word you write can light up the world. "
                        }} /></div>)}
                    {TitleIndex === TitleList.length - 1 &&
                        (<motion.div className=' box-border 2xl:top-20
                                ml-5 mt-2
                                md:ml-10
                            '
                            initial={{ opacity: 0, translateX: -100 }}
                            animate={{ opacity: 1, translateX: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 100,
                                duration: .5,
                                delay: 0.3
                            }}
                        >
                            <Lan lang={lang} candidate={{
                                "zh": "* 只要心怀梦想，写下的每个字都能点亮世界，哪怕只是开始，也是在书写属于自己的奇迹。",
                                "en": "* As long as you have a dream, every word you write can light up the world. "
                            }} />
                        </motion.div>)
                    }
                </div>

            </div >

        </>
    );
}
