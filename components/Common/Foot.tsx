import React from "react";
import { motion } from "motion/react";

import Link from "next/link";

const Foot: React.FC = () => {


    return (
        <div className="w-full bg-red-500 snap-start overflow-hidden " >
            <div className="container mx-auto flex leading-loose justify-between
                text-xl pt-5 px-5 
                md:text-3xl md:pt-10 md:px-10">
                <motion.div
                    initial={{ opacity: 0, translateY: -100 }}
                    whileInView={{ opacity: 1, translateY: 0 }}
                    transition={{ duration: 0.6, delay: 0., ease: "easeInOut", bounce: 1 }}
                >
                    @2024 Mofei
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, translateY: -100 }}
                    whileInView={{ opacity: 1, translateY: 0 }}
                    transition={{ duration: 0.6, delay: 0., ease: "easeInOut", bounce: 1 }}
                >
                    <ul>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/blog">Blog</Link></li>
                        <li><Link href="/message">Message</Link></li>
                    </ul>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, translateY: -100 }}
                    whileInView={{ opacity: 1, translateY: 0 }}
                    transition={{ duration: 0.6, delay: 0., ease: "easeInOut", bounce: 1 }}
                >
                    <ul>
                        <li><a href="https://github.com/zmofei/" target="_blank">Github</a></li>
                        <li><a href="https://www.instagram.com/zhu_wenlong/" target="_blank">Instagram</a></li>
                        <li><a href="https://mp.weixin.qq.com/s/XdjDDD9hGlsiRYW3gT_qUA?token=1340142450&lang=zh_CN" target="_blank">公众号</a></li>
                    </ul>
                </motion.div>
            </div>
            <motion.div
                initial={{ opacity: 0, translateY: 20 }}
                whileInView={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.6, delay: 0., ease: "easeInOut", bounce: 1 }}
            >
                <svg
                    className="outline-none mt-10 hidden md:flex" viewBox="0 0 2318 135"
                >
                    <foreignObject width="100%" height="100%">
                        <p className="text-[135px] text-center font-extrabold text-white " style={{
                            fontFamily: '"Inter", sans-serif',
                            fontWeight: 700,
                            letterSpacing: "-0px",
                            lineHeight: "1em",
                        }}>HI. I AM MOFEI. NICE TO MEET YOU.</p>
                    </foreignObject>
                </svg>

                <svg
                    className="outline-none flex md:hidden mt-10" viewBox="0 0 2318 200"
                >
                    <foreignObject width="100%" height="100%">
                        <p className="text-[200px] text-center font-extrabold text-white" style={{
                            fontFamily: '"Inter", sans-serif',
                            fontWeight: 700,
                            letterSpacing: "-0px",
                            lineHeight: "1em",
                        }}>HI. I AM MOFEI!</p>
                    </foreignObject>
                </svg>
                <svg
                    className="outline-none flex md:hidden mb-10 " viewBox="0 0 2318 200"
                >
                    <foreignObject width="100%" height="100%">
                        <p className="text-[200px] text-center font-extrabold text-white" style={{
                            fontFamily: '"Inter", sans-serif',
                            fontWeight: 700,
                            letterSpacing: "-0px",
                            lineHeight: "1em",
                        }}>NICE TO MEET YOU!</p>
                    </foreignObject>
                </svg>
            </motion.div>
        </div>
    );
};

export default Foot;