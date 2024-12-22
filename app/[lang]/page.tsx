"use client"
import 'mapbox-gl/dist/mapbox-gl.css';

import AnimatedTitle from "@/components/Home/AnimatedTitle";
import VideoBackground from "@/components/Home/VideoBackground";
import { motion, useScroll, useTransform, AnimatePresence, MotionValue } from "motion/react"

import HomeMap from "@/components/Home/Map";
import Lan from "@/components/util/Language";
import { useEffect, useRef, useState, use } from 'react';
import Foot from '@/components/Common/Foot';


export default function Home({ params }: { params: Promise<{ lang: string }> }) {

  const { lang } = use(params)

  const [mapInteracting, setMapInteracting] = useState(false);

  const mapTitleVariants = {
    visible: { transform: "translateY(0)" },
    hidden: { transform: "translateY(20px)" },
  };

  const scrollTar = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollTar,
    // offset: ["start end", "end end"],
  });

  function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance]);
  }

  const y = useParallax(scrollYProgress, 20);

  return (
    <>
      <div className="snap-y snap-mandatory overflow-y-scroll w-full">

        <div className="h-svh w-full flex items-center justify-center snap-start pt-30 relative">

          <VideoBackground />

          <div className="w-full max-w-7xl z-10 ">
            {/* <div className='bg-yellow-400 py-10'> */}
            <AnimatedTitle />
            {/* </div> */}
            <motion.div className="w-full max-w-7xl z-10 text-center 
             px-5  text-xl pt-10
             md:px-10 md:text-3xl md:pt-20"
              initial={{ opacity: 0, translateY: 0 }}
              animate={{ opacity: 1, translateY: -60 }}
              transition={{ duration: 0.5, delay: 2 }}>
              <Lan lang={lang} candidate={{
                "zh": "嘿, 我是Mofei! 你想和我一起探索在芬兰的软件工程师的生活与经历么？",
                "en": "Hi, would you like to join me in exploring the life of a software engineer in Finland?"
              }} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, }}
              whileInView={{ opacity: 0.8 }}
              transition={{ duration: 0.8, delay: 2 }}
              viewport={{ once: false, amount: 0.1 }}
            >
              <motion.div className='absolute left-[50%] translate-x-[-50%]
                bottom-20 
                md:bottom-40'
                animate={{
                  y: [0, -10, 0], // 循环上下移动的关键帧
                }}
                transition={{
                  duration: 1, // 完成一个循环所需时间
                  repeat: Infinity, // 无限循环
                  ease: "easeInOut", // 平滑的动画过渡
                }}
              >
                <img src="/img/down-arrow-svgrepo-com.svg" alt="down" className="h-5 w-5 md:h-10 md:w-10 mx-auto mt-10" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="h-svh w-full flex relative justify-center snap-start bg-black overflow-hidden">
          <div className='w-full max-w-screen-2xl leading-normal
            text-xl 
            md:text-4xl '>
            <motion.div
              className={`z-20 pt-10 md:pt-60 relative leading-loose text-center `}
              layout
              initial={{ opacity: 0, }} // 初始状态
              whileInView={{ opacity: 1, }} // 在视口内时触发动画
              viewport={{ amount: 0.2 }} // 配置触发条件：只触发一次，当 20% 进入视口时
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }} // 动画过渡效果
            >
              <motion.h2
                layout
                variants={mapTitleVariants}
                animate={mapInteracting ? "hidden" : "visible"}
                className={`z-20 align-bottom  text-center relative w-full bg-clip-text bg-gradient-to-r from-[#a1c4fd] to-[#c2e9fb] 
                  md:flex md:justify-center `}
              >
                <img src="/img/travel-svgrepo-com.svg" alt="222" className="h-14 
                block ml-auto mr-auto
                md:inline-block md:mr-2 md:ml-0" />
                <span className='inline-block font-extrabold text-transparent line-clamp-2

                '>
                  <Lan lang={lang} candidate={{
                    "zh": <>
                      <p>探索 –  是我的人生目标，也是信仰。</p>
                    </>,
                    "en": <>
                      To explore – this is my life’s mission and my guiding principle.
                    </>
                  }} />
                </span>
              </motion.h2>
            </motion.div>

            <motion.div
              className={`z-20 relative leading-loose 
                px-5 text-base mt-4
                md:px-10 md:text-2xl md:mt-10
              `}
              initial={{ opacity: 0, }} // 初始状态
              whileInView={{ opacity: 1, }} // 在视口内时触发动画
              viewport={{ amount: 0.2 }} // 配置触发条件：只触发一次，当 20% 进入视口时
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} // 动画过渡效果
            >
              <AnimatePresence>
                {!mapInteracting && (
                  <Lan
                    lang={lang}
                    candidate={{
                      zh: (
                        <>
                          {[
                            "嗨，我是 Mofei，一个在芬兰工作的软件工程师，我从 2010 年开始，先后工作于上海易班，北京百度，上海Mapbox 和 赫尔辛基Mapbox。",
                            "这里是我的个人博客，它见证着那个曾经梦想着开着咖啡厅讲述着自己环游世界故事的小男孩的成长。",
                            "很高兴认识你！也很开心你愿意探索我的故事！希望我的文字能让你感受到一丝温暖或启发。",
                            '如果愿意，欢迎在留言板上说声“Hi”，让我知道，你也曾来过这里。',
                          ].map((text, index) => (
                            <motion.p
                              className='container max-w-8xl m-auto leading-loose'
                              key={`${index}_en`}
                              initial={{ opacity: 0, y: 0 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                            >
                              {text}
                            </motion.p>
                          ))}
                        </>
                      ),
                      en: (
                        <>
                          {[
                            "Hi, I’m Mofei, a software engineer in Finland. Since 2010, I’ve worked at Yiban, Baidu, and Mapbox, spanning Shanghai, Beijing, and Helsinki.",
                            "This blog is my space to share stories of a dreamer—someone who’s always wanted to run a café and explore the world.",
                            "I’m so glad you’re here. I hope my words bring you warmth and inspiration.",
                            'Feel free to drop a ‘Hi’ on the message page to let me know you stopped by!',
                          ].map((text, index) => (
                            <motion.p
                              className='container max-w-8xl m-auto'
                              key={`${index}_en`}
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                            >
                              {text}
                            </motion.p>
                          ))}
                        </>
                      ),
                    }}
                  />)}
              </AnimatePresence>
            </motion.div>

            <AnimatePresence>
              {!mapInteracting &&
                (<>
                  <motion.div
                    initial={{ opacity: .5 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-0 left-0 w-full h-svh z-[1] overlay  items-end justify-center
                      bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent
                      hidden md:flex
                  " />
                  <motion.div
                    initial={{ opacity: .5 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-0 left-0 w-full h-svh z-[1] overlay flex items-end justify-center
                      bg-[rgba(0,0,0,0.8)] md:hidden
                  " />
                </>)
              }
            </AnimatePresence>

            <motion.div className="absolute top-0 left-0 right-0 bottom-0"
            >
              <HomeMap lang={lang} callback={(mapShow: boolean) => {
                setMapInteracting(!mapShow)
              }} />
            </motion.div >



          </div>
        </div>

        <Foot />
      </div >

    </>
  );
}
