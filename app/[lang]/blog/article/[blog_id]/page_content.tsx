"use client"

import { motion, } from "motion/react"
import React from "react";
import HtmlToReact from './HtmlToReact';

const BlogCommentPrompts = [
    { "zh": "这篇文章花了不少心思写，希望能听听你的看法！", "en": "I put a lot of thought into this post—would love to hear your thoughts!" },
    { "zh": "如果这篇文章对你有帮助，或者让你有新的想法，欢迎留言！", "en": "If this post was helpful or sparked new ideas, feel free to leave a comment!" },
    { "zh": "关于文章中的内容，有任何见解都可以告诉我哦！", "en": "Got any insights on the content of this post? Let me know!" },
    { "zh": "你的反馈会让我写出更好的文章，期待你的留言！", "en": "Your feedback will help me write better posts—looking forward to it!" },
    { "zh": "文章中的内容是否对你有启发？留言分享你的观点吧！", "en": "Did this post inspire any ideas? Share your thoughts in the comments!" },
    { "zh": "如果有任何疑问或者不同意见，欢迎留言一起讨论！", "en": "Have questions or a different perspective? Let’s discuss in the comments!" },
    { "zh": "写这篇文章时想了很多问题，不知道你怎么看？", "en": "I had so many questions while writing this—what’s your take?" },
    { "zh": "这篇文章只是我的想法，你的观点一定能让它更丰富！", "en": "This post is just my perspective—your input will make it richer!" },
    { "zh": "你的留言可能会让更多人从中受益，欢迎分享你的看法！", "en": "Your comment might help others too—feel free to share your thoughts!" },
    { "zh": "如果觉得文章有值得讨论的地方，欢迎留言和我交流！", "en": "If there’s something worth discussing, leave a comment and let’s talk!" }
];



export default function PageContent({ params }: { params: { content: any, lang: 'zh' | 'en', blog_id: string } }) {
    const { content: blog, lang, blog_id } = params

    const blogCommentPromptIndex = Math.floor(Math.random() * BlogCommentPrompts.length)

    return <>
        <motion.div className='
                  max-w-7xl mx-auto shadow-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#a1c4fd] to-[#c2e9fb] 
                  text-3xl 
                  pb-2
                  md:text-5xl 
                  mb-0 md:mb-8
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
        {/* Comments */}
        <div className='max-w-7xl mx-auto 
                  mt-5 text-xl 
                  md:mt-18 md:text-3xl
                '>
            <motion.div>
                <motion.h3
                    className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#a1c4fd] to-[#c2e9fb] '
                    animate={{ opacity: 1, translateY: 0 }}
                    initial={{ opacity: 0, translateY: 20 }}
                >{BlogCommentPrompts[blogCommentPromptIndex][lang]}</motion.h3>
            </motion.div>
        </div>
    </>
}
