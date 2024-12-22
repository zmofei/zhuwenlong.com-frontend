"use client";
const AnimatedTitle = () => {
    return (
        <div className="flex items-center justify-center title-box px-5 md:px-10 w-full h-auto">
            <svg id="title" className="animated-stroke" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 498 75"
                width="100%"
                height="auto"
            >
                <path strokeWidth="2" fill="none" d="M14.91,4.05V73H0V4.05Z" />
                <path strokeWidth="2" fillOpacity={0} className="red" d="M26.24,29.66A130.3,130.3,0,0,0,31,0H46.06c-.77,9.61-4,21.55-8.28,29.66Z" />
                <path strokeWidth="2" fill="none" d="M115.09,47.14c0-11.77.18-25,.48-32.75h-.47C111.86,28.46,105,51.43,98.35,73H85.66c-5-18.86-12.16-45-15.18-58.8H70c.59,8.09.88,22.28.88,34.1V73H57.3V4.05H79.49c5.37,18,11.4,40.62,13.47,50.89h.11c1.69-9.06,9.26-33.22,15-50.89h21.39V73H115.09Z" />
                <path strokeWidth="2" fill="none" d="M227.88,47.14c0-11.77.19-25,.49-32.75h-.47c-3.24,14.07-10.14,37-16.75,58.61h-12.7c-5-18.86-12.15-45-15.18-58.8h-.46c.59,8.09.88,22.28.88,34.1V73H170.1V4.05h22.18c5.38,18,11.4,40.62,13.48,50.89h.11c1.69-9.06,9.26-33.22,15-50.89h21.38V73H227.88Z" />
                <path strokeWidth="2" fill="none" d="M322.17,38.29c0,19.19-11.53,35.71-33.92,35.71-21.64,0-33-15.72-33-35.47,0-20.07,12.51-35.48,33.92-35.48C309.38,3.05,322.17,17.18,322.17,38.29Zm-51.49-.06c0,13.46,5.91,23.64,18.14,23.64,13.25,0,17.95-11.1,17.95-23.39,0-13-5.34-23.3-18.19-23.3C276.12,15.18,270.68,24.8,270.68,38.23Z" />
                <path strokeWidth="2" fill="none" d="M335.2,4.05h48.12V16.27H349.75v16.9H381.2V45.38H349.75V73H335.2Z" />
                <path strokeWidth="2" fill="none" d="M441.84,43.26h-33V60.78h36.38L443.47,73H394.4V4.05h48.89V16.27H408.86V31h33Z" />
                <path strokeWidth="2" fill="none" d="M470.8,4.05V73H455.9V4.05Z" />
                <circle strokeWidth="2" fillOpacity={0} className="red" cx="485" cy="61" r="12" />
            </svg>

            {/* 动画样式 */}
            <style jsx>
                {`
                    .title-box {
                        animation: transform-animation 3s ease-in-out forwards; /* 动画效果 */
                    }

                    .animated-stroke path,.animated-stroke circle {
                        stroke-dasharray: 300; /* 路径总长度（根据实际路径调整） */
                        stroke-dashoffset: 300; /* 初始值为路径长度 */
                        animation: stroke-animation 3s ease-in-out forwards; /* 动画效果 */
                    }
                    
                    .animated-stroke path {
                        fill: white;
                        stroke: #fff;
                        fill-opacity: 0;
                        stroke-dasharray: 0;
                        stroke-dashoffset: 0;
                    }

                    .animated-stroke .red {
                        stroke: #FF5851;
                        fill: #FF5851;
                    }

                    @keyframes transform-animation {
                        0% {
                            transform: translateY(0);
                        }

                        50% {
                            transform: translateY(0);
                        }

                        90% {
                            transform: translateY(-40px);
                        }

                        100% {
                            transform: translateY(-40px);
                        }
                    }
            
                    @keyframes stroke-animation {
                        0% {
                            stroke-dasharray: 1000;
                            stroke-dashoffset: 1000;
                            transform: translateY(0);
                        }

                        50% {
                            fill-opacity: 0;
                        }

                        90% {
                            stroke-dashoffset: 0;
                            fill-opacity: 0.8;
                            top: 0;
                        }

                        100% {
                            stroke-dasharray: 1000;
                            stroke-dashoffset: 0;
                            stroke-width: 0;
                            stroke-opacity: 1;
                            fill-opacity: 1;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default AnimatedTitle;