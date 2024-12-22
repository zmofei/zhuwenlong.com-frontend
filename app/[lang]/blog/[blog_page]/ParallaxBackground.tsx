"use client"
import 'mapbox-gl/dist/mapbox-gl.css';

import { motion, useScroll, useTransform, } from "motion/react"
import { useRef } from 'react';


export default function ParallaxBackground({ blog }: { blog: any }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    }); // 获取滚动位置
    const backgroundPosition = useTransform(
        scrollYProgress,
        [0, 1], // 滚动范围
        [-20, 20] // 背景位置变化范围
    );


    return (
        <motion.div className="w-full relative overflow-hidden  
            h-56 
            md:h-96
            bg-slate-700 
            bg-opacity-50
            "
            initial={{ scale: 1 }} // 初始状态
            whileHover={{
                scale: 1.05, // 鼠标悬停时放大
                rotate: (0.5 * Math.random() * 2) * ((Math.random() * 1 - 0.5) > 0 ? -1 : 1), // 旋转
            }}
            transition={{
                duration: 0.3, // 动画时间
            }}>
            <motion.div
                ref={ref}
                className='absolute -top-[20px] left-0 -bottom-[20px] right-0'
                style={{
                    backgroundImage: `url(${blog.cover || '/img/mofei-logo.svg'})`,
                    backgroundSize: `${blog.cover ? 'cover' : 'contain'}`,
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    backgroundOrigin: "padding-box",
                    translateY: backgroundPosition,
                    margin: blog.cover ? 0 : "60px",
                }}
            />
        </motion.div>
    );
}
