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



/**
 * 将 HTML 字符串解析成 React 元素，并将 `<img>` 替换为自定义的 `<IMAGE>` 组件
 * @param {string} htmlString - 要转换的 HTML 字符串
 * @param {function} ImageComponent - 用于替换 <img> 标签的自定义 React 组件
 * @returns {React.ReactNode} - 转换后的 React 元素
 */
function parseHtmlToReact(htmlString: string) {
    // 使用 DOMParser 将 HTML 字符串解析为 DOM
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    // 递归处理 DOM 节点
    const convertNodeToReact = (node: Node): React.ReactNode => {
        // 如果是文本节点，直接返回文本
        if (node.nodeType === Node.TEXT_NODE) {
            return node.textContent;
        }

        // 如果是元素节点
        if (node.nodeType === Node.ELEMENT_NODE) {
            const { tagName, attributes, childNodes } = node as Element;

            // 获取属性
            const props: { [key: string]: string } = {};
            for (let i = 0; i < attributes.length; i++) {
                const { name, value } = attributes[i];
                // React 中的 `class` 属性要转换为 `className`
                props[name === "class" ? "className" : name] = value;
            }

            // // 如果是 <img> 标签，替换为自定义组件
            // if (tagName.toLowerCase() === "img") {
            //     return (
            //         <ImageComponent
            //             {...props}
            //             key={props.src || Math.random()} // 使用 `src` 作为 key，或者一个随机值
            //         />
            //     );
            // }

            // 对于其他元素，递归处理子节点
            const children = Array.from(childNodes).map((childNode) =>
                convertNodeToReact(childNode)
            );

            // 返回普通 React 元素
            return React.createElement(tagName.toLowerCase(), { ...props, key: Math.random() }, ...children);
        }

        // 对于其他类型的节点（如注释节点），直接忽略
        return null;
    };

    // 获取 <body> 的子节点（跳过 <html> 和 <head> 部分）
    const bodyChildNodes = doc.body.childNodes;

    // 将每个子节点转换为 React 元素
    return Array.from(bodyChildNodes).map((node) => convertNodeToReact(node));
}


export default function PageContent({ params }: { params: { content: any, lang: 'zh' | 'en', blog_id: string } }) {
    const { content: blog, lang, blog_id } = params

    const blogCommentPromptIndex = Math.floor(Math.random() * BlogCommentPrompts.length)

    return <>
        <motion.div className='
                  max-w-7xl mx-auto shadow-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#a1c4fd] to-[#c2e9fb] 
                  text-3xl 
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
                  md:prose-xl'
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
        >
            <HtmlToReact htmlString={blog.html} />
            {/* dangerouslySetInnerHTML={{ __html: blog.html }} /> */}
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
