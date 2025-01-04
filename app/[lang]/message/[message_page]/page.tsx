"use client"
import 'mapbox-gl/dist/mapbox-gl.css';

import { motion, } from "motion/react"
import Foot from '@/components/Common/Foot';
import { useEffect, useState, use } from 'react';

import Comments from '@/components/Comments/Comments';



export default function Home({ params }: { params: any }) {

  const { lang, message_page }: { lang: 'zh' | 'en', message_page: number } = use(params)


  const TitleList = [
    { "zh": "别害羞，留言吧！我等不及想看了！", "en": "Don't be shy, leave a message!" },
    { "zh": "写下你的想法，让我开心一整天吧！", "en": "Share your thoughts and brighten my day!" },
    { "zh": "来吧，说点什么，这会让我特别开心！", "en": "Say something, it would truly make my day!" },
    { "zh": "留言吧，你的每一句话都让我充满期待！", "en": "Your words always fill me with excitement!" },
    { "zh": "让我看到你的留言，它会是我一天中最美好的事情！", "en": "Your message will be the best part of my day!" },
    { "zh": "写点什么吧！你的留言会让这里更有意义！", "en": "Write something meaningful to make this space special!" },
    { "zh": "随便留言吧，哪怕只是一个“Hi”，我都会很开心！", "en": "Say hi, it will surely brighten my day!" },
    { "zh": "每一条留言都让我充满期待，说点什么吧！", "en": "Every message brings me so much joy!" },
    { "zh": "别让我等太久了，快写点什么吧！", "en": "Don't keep me waiting, write something now!" },
    { "zh": "你的留言会点亮我的一天，别犹豫，写下来吧！", "en": "Your message will light up my day, so write it down!" }
  ];
  const [TitleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    setTitleIndex(Math.floor(Math.random() * TitleList.length))
  }, []);


  return (
    <>
      <div className='container max-w-[2000px] m-auto'>
        <div className='overflow-hidden font-extrabold'>
          <motion.h1 className={`container max-w-[2000px] m-auto  font-extrabold ml-5 md:ml-10 text-white leading-tight 
            text-4xl mt-24 
            md:text-[9rem] md:mt-32
            `} >
            <motion.div
              className='no-wrap text-ellipsis overflow-hidden pb-2 pr-10'
              key={TitleIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0 },
              }}
            >
              {
                TitleList[TitleIndex][lang].split('').map((char: string, index: number) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, translateX: -100 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      duration: .5,
                      delay: 0.6 + (lang == 'zh' ? 0.1 : 0.05) * index
                    }}
                  >
                    {char.toUpperCase()}
                  </motion.span>
                ))
              }
            </motion.div>
          </motion.h1>
          <div></div>
        </div >
      </div >

      <div className='container max-w-[2000px] m-auto min-h-screen
        px-5
        mt-5
        md:mt-10
        md:px-10'>
        <Comments lang={lang} message_id="000000000000000000000000" message_page={message_page} />
      </div>

      <div className='mt-10 md:mt-20'>
        <Foot />
      </div>
    </>
  );
}
