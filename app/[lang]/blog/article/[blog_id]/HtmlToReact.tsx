"use client"
import React from "react";
import 'react-photo-view/dist/react-photo-view.css';

import { PhotoProvider, PhotoView } from 'react-photo-view';

const CustomVideo: React.FC<React.VideoHTMLAttributes<HTMLVideoElement>> = ({
    children,
    ...props
}) => {
    const videoRef = React.useRef<HTMLVideoElement>(null);

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    };

    const handleMuteUnmute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
        }
    };

    return (
        <div className="custom-video-wrapper" style={{ position: "relative", width: "100%", maxWidth: "600px" }}>
            <video ref={videoRef} {...props} style={{ width: "100%" }}>
                {children}
            </video>
            <div
                className="custom-controls"
                style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "10px",
                    display: "flex",
                    gap: "10px",
                }}
            >
                <button
                    onClick={handlePlayPause}
                    style={{
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        padding: "5px 10px",
                        cursor: "pointer",
                    }}
                >
                    Play/Pause
                </button>
                <button
                    onClick={handleMuteUnmute}
                    style={{
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        padding: "5px 10px",
                        cursor: "pointer",
                    }}
                >
                    Mute/Unmute
                </button>
            </div>
        </div>
    );
};

/**
 * HtmlToReact Component
 * @param {string} htmlString - 要解析的 HTML 字符串
 * @returns {JSX.Element} - 渲染的 React 元素
 */
const HtmlToReact: React.FC<{ htmlString: string }> = ({ htmlString }) => {
    // 检查 HTML 字符串是否存在
    if (!htmlString) {
        return null;
    }

    if (typeof window === "undefined") {
        return <div dangerouslySetInnerHTML={{ __html: htmlString }} />
    }

    // 递归解析 DOM 节点为 React 元素
    const convertNodeToReact = (node: Node): React.ReactNode => {
        // 文本节点
        if (node.nodeType === Node.TEXT_NODE) {
            return node.textContent;
        }

        // 元素节点
        if (node.nodeType === Node.ELEMENT_NODE) {
            const { tagName, attributes, childNodes } = node as Element;

            // 获取属性
            const props: { [key: string]: string } = {};
            for (let i = 0; i < attributes.length; i++) {
                const { name, value } = attributes[i];
                props[name === "class" ? "className" : name] = value;
            }

            // 自定义处理 <img> 标签
            if (tagName.toLowerCase() === "img") {
                return (
                    <PhotoView key={props.src} src={props.src}>
                        <img src={props.src} alt="" />
                    </PhotoView>

                );
            }

            if (tagName.toLowerCase() === "video") {
                // 强制添加 `controls` 属性
                props.controls = "true";

                // 保留 `<video>` 标签的子节点，如 `<source>` 等
                const children = Array.from(childNodes).map((childNode) =>
                    convertNodeToReact(childNode)
                );

                // 返回修改后的 `<video>` React 元素
                return React.createElement(tagName.toLowerCase(), { ...props, key: Math.random() }, ...children);
            }

            // 递归处理子节点
            const children = Array.from(childNodes).map((childNode) =>
                convertNodeToReact(childNode)
            );

            // 返回普通 React 元素
            return React.createElement(tagName.toLowerCase(), { ...props, key: Math.random() }, ...children);
        }

        // 忽略其他节点类型（如注释节点）
        return null;
    };

    // 在服务器端使用 DOMParser
    let parsedElements: React.ReactNode[] = [];

    // 客户端解析 HTML 字符串
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const bodyChildNodes = doc.body.childNodes;

    parsedElements = Array.from(bodyChildNodes).map((node) =>
        convertNodeToReact(node)
    );


    return <>
        <PhotoProvider>
            {parsedElements}
        </PhotoProvider>
    </>;
};


export default HtmlToReact;