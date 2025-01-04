"use client"

const VideoBackground = () => {
    return (
        <>
            <video
                className="absolute top-0 left-0 w-full h-full object-cover -z-10"
                id="bgvid"
                autoPlay
                loop
                muted
                playsInline
                poster="//cdn.zhuwenlong.com/image/index/cover-820e030cca.jpg"
            >
                <source src="//cdn.zhuwenlong.com/video/bgvideo-0c73e2c57a.mp4" type="video/mp4" />
                <source src="//cdn.zhuwenlong.com/video/bgvideo-513397179e.webm" type="video/webm" />
                <source src="//cdn.zhuwenlong.com/video/bgvideo-5428b1617d.ogv" type="video/ogg" />
            </video>
            <div className="absolute top-0 left-0 w-full h-full bg-black/70 z-[1] overlay">
                {/* 粒子背景 */}
            </div>

            <style jsx>{`
                .overlay {
                    background-image: radial-gradient(transparent 1px, #0f1115 1px);
                    background-size: 4px 4px; /* 控制点的大小和间距 */
                    backdrop-filter: blur(3px);
                }
                `}</style>
        </>)
}

export default VideoBackground;