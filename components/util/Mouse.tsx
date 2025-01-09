"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimate, stagger } from "motion/react"

const CustomCursor = () => {
    const cursorSize = 30;
    const cursorRef = useRef<HTMLDivElement>(null);

    const [isEnlarged, setIsEnlarged] = useState(false); // 状态用于管理是否放大
    const [cursorX, setCursorX] = useState(0); // 鼠标 X 坐标
    const [cursorY, setCursorY] = useState(0); // 鼠标 Y 坐标
    const [cursorOpacity, setCursorOpacity] = useState(0); // 鼠标透明度

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            if (cursorRef.current) {
                setCursorX(e.clientX); // 更新鼠标 X 坐标
                setCursorY(e.clientY); // 更新鼠标 Y 坐标
                setCursorOpacity(1);
                // 只更新 translate 部分
                // cursorRef.current.style.opacity = "1"; // 恢复完全不透明
            }
        };

        const hideCursor = () => {
            if (cursorRef.current) {
                setCursorOpacity(0);
                // cursorRef.current.style.opacity = "0"; // 鼠标移出屏幕时隐藏
            }
        };

        const showCursor = () => {
            if (cursorRef.current) {
                setCursorOpacity(1);
                // cursorRef.current.style.opacity = "1"; // 鼠标移入屏幕时恢复不透明
            }
        };

        const enlargeCursor = () => {
            setIsEnlarged(true); // 设置放大状态
        };

        const shrinkCursor = () => {
            setIsEnlarged(false); // 恢复默认状态
        };

        // 事件委托：将事件绑定到 document
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === "A" || target.tagName === "BUTTON") {
                enlargeCursor(); // 悬停在 <a> 或 <button> 时放大
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === "A" || target.tagName === "BUTTON") {
                shrinkCursor(); // 离开 <a> 或 <button> 时恢复
            }
        };

        // 全局鼠标事件
        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseout", (e) => {
            if (!e.relatedTarget) hideCursor(); // 鼠标移出窗口时隐藏
        });
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "visible") showCursor();
            else hideCursor();
        });

        // 事件委托绑定
        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseout", handleMouseOut);

        // 清理事件监听器
        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseout", hideCursor);
            document.removeEventListener("visibilitychange", hideCursor);
            document.removeEventListener("visibilitychange", showCursor);
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseout", handleMouseOut);
        };
    }, [isEnlarged]);

    return (
        <>
            {/* 自定义鼠标圆点 */}
            <motion.div
                ref={cursorRef}
                animate={{ scale: isEnlarged ? 1.5 : 1, opacity: cursorOpacity }}
                transition={{ type: "spring", damping: 10, stiffness: 200, duration: 0.3 }}
                style={{
                    translateX: cursorX - cursorSize / 2,
                    translateY: cursorY - cursorSize / 2,
                }}
                className={`
                    hidden md:block
                    opacity-0
                    fixed top-0 left-0 w-[20px] h-[20px] bg-white rounded-full pointer-events-none z-[10000] 
                    scale-100 mix-blend-difference transition-opacity duration-1000`}
            />

            {/* 全局样式 */}
            <style jsx global>{`
        *,a,button,div {
          cursor: none;
        }`}</style>
        </>
    );
};

export default CustomCursor;