"use client";

import { AnimatePresence, motion, useAnimate, stagger, AnimationSequence } from "motion/react"
import { useState, useEffect, use } from "react";


function useMenuAnimation(isOpen: boolean) {
    const [scope, animate] = useAnimate();

    useEffect(() => {
        const menuAnimations: AnimationSequence = isOpen
            ? [
                [
                    "nav",
                    { transform: "translateX(0%)" },
                    { ease: [0.08, 0.65, 0.53, 0.96], duration: 0.4 }
                ],
                [
                    "li",
                    { transform: "scale(1)", opacity: 1, filter: "blur(0px)" },
                    { delay: stagger(0.05), at: "-0.1" }
                ]
            ]
            : [
                ["nav", { transform: "translateX(100%)" }, { at: "-0.1" }],
                [
                    "li",
                    { transform: "scale(0.5)", opacity: 0, filter: "blur(10px)" },
                    { delay: stagger(0.05, { from: "last" }), at: "<" }
                ],

            ];

        animate(menuAnimations);
    }, [isOpen]);

    return scope;
}

function Nav({ lang }: { lang: string }) {
    const [show, setShow] = useState(false);
    const scope = useMenuAnimation(show);

    return (
        <div ref={scope} >
            <div className="fixed z-10 w-full h-16 backdrop-blur-lg bg-black/20 2xl:hidden" />
            <motion.div
                className="fixed z-40
                    left-5 top-5
                    md:left-10  md:top-10"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, transition: { type: "spring", damping: 10, stiffness: 200 } }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", }}
            >
                <a className="flex" href="/">
                    <img src="/img/mofei-logo.svg" alt="嘿, 我是Mofei!" className="h-8 md:h-10" />
                </a>
            </motion.div>


            <motion.div
                layout
                initial={{ backgroundColor: show ? "#ff5555" : '', scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, transition: { type: "spring", damping: 10, stiffness: 200 } }}
                whileHover={{ scale: 1.2, backgroundColor: "#ff5555", rotate: 3 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", damping: 17, stiffness: 200 }}
                className={`fixed rounded-full p-2 px-4 z-40 ${(show ? "bg-[#ff5555]" : "")} cursor-pointer
                    right-5 top-3 text-xl  -mr-4 
                    md:right-10 md:top-10 md:text-2xl md:-mr-2 
                `}
                onClick={() => {
                    setShow(!show)
                }}
            >
                {lang == 'zh' ? (show ? "关闭" : "菜单") : (show ? "Close" : "Menu")}
            </motion.div>

            <nav className="fixed top-0 right-0 bottom-0 will-change-transform translate-x-full z-30">
                <ul className=" bg-[#ff5555] h-full text-right pl-20 
                text-2xl pt-16 pr-5
                md:text-4xl md:pt-24 md:pr-10
                ">
                    <li className="py-3 md:py-4" style={{ "transformOrigin": "top right" }}>
                        <motion.a className="inline-block" whileHover={{ scale: 1.2, rotate: 3 }} href="/">{lang == 'zh' ? '首页' : 'Home'}</motion.a>
                    </li>
                    <li className="py-3 md:py-4" style={{ "transformOrigin": "top right" }}>
                        <motion.a className="inline-block" whileHover={{ scale: 1.2, rotate: -3 }} href="/blog">{lang == 'zh' ? '博客' : 'Blog'}</motion.a>
                    </li>
                    <li className="py-3 md:py-4" style={{ "transformOrigin": "top right" }}>
                        <motion.a className="inline-block" whileHover={{ scale: 1.2, rotate: 3 }} href="/message">{lang == 'zh' ? '留言' : 'Message'}</motion.a>
                    </li>
                    <li className="py-3 md:py-4" style={{ "transformOrigin": "top right" }}>
                        <motion.a className="inline-block" whileHover={{ scale: 1.2, rotate: -3 }} onClick={() => {
                            if (lang == 'zh') {
                                location.href = location.href.replace('/zh', '/en')
                            } else {
                                location.href = location.href.replace('/en', '/zh')
                            }
                        }}>{lang == 'zh' ? 'English' : '中文'}</motion.a>
                    </li>
                </ul>
            </nav>
        </div >
    )
}

export default Nav;