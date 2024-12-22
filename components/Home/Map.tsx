import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useAnimate, stagger } from "motion/react"
import Lan from "@/components/util/Language";

import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibW9mZWkiLCJhIjoiY2w1Z3Z6OWw1MDNlaDNjcXpqMjZsMG5oZCJ9.nqfToaqgxmm3jbJzu6bK6Q';

function HomeMap({ lang, callback }: { lang: string, callback: Function }) {
    const mapContainer = useRef(null);
    const [userInteracting, setUserInteracting] = useState(false);
    useEffect(() => {
        // if (!mapContainer.current) return;
        if (!mapContainer.current) return;
        const map = new mapboxgl.Map({
            container: mapContainer.current as HTMLElement,
            zoom: 3.5,
            maxZoom: 6,
            center: [121, 31],
            pitch: 45,
            style: 'mapbox://styles/mofei/cm41b6m6r006c01s6clcm4etw',
            projection: 'globe', // Display the map as a globe
        });

        let spinEnabled = true;
        let userInteracting = false;

        function spinGlobe() {
            const zoom = map.getZoom();

            const secondsPerRevolution = 200;
            // Above zoom level 5, do not rotate.
            const maxSpinZoom = 5;
            // Rotate at intermediate speeds between zoom levels 3 and 5.
            const slowSpinZoom = 3;


            if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
                let distancePerSecond = 360 / secondsPerRevolution;
                if (zoom > slowSpinZoom) {
                    // Slow spinning at higher zooms
                    const zoomDif =
                        (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
                    distancePerSecond *= zoomDif;
                }
                const center = map.getCenter();
                center.lng -= distancePerSecond;
                // Smoothly animate the map over one second.
                // When this animation is complete, it calls a 'moveend' event.
                map.easeTo({ center, duration: 1000, easing: (n) => n });
            }
        }

        spinGlobe()

        // Pause spinning on interaction
        map.on('mousedown', () => {
            userInteracting = true;
        });

        // Restart spinning the globe when interaction is complete
        map.on('mouseup', () => {
            userInteracting = false;
            spinGlobe();
        });

        // These events account for cases where the mouse has moved
        // off the map, so 'mouseup' will not be fired.
        map.on('dragend', () => {
            userInteracting = false;
            spinGlobe();
        });

        map.on('pitchend', () => {
            userInteracting = false;
            spinGlobe();
        });
        map.on('rotateend', () => {
            userInteracting = false;
            spinGlobe();
        });

        map.on('touchstart', () => {
            userInteracting = true;
        });

        map.on('touchend', () => {
            userInteracting = false;
            spinGlobe();
        });


        map.on('moveend', () => {
            spinGlobe();
        });

        return () => {
            map.remove();
        }
    }, [mapContainer]);

    return (
        <>
            <div className='absolute top-0 left-0 w-full h-full' ref={mapContainer}></div>
            <div className="absolute top-0 left-0 w-full h-full flex items-end justify-center text-center z-10 pointer-events-none">
                <motion.div
                    layout
                    whileHover={{ scale: 1.2, rotate: 3 }}
                    onClick={() => {
                        setUserInteracting(!userInteracting)
                        callback && callback(userInteracting)
                    }}
                    className={`bg-black p-3 cursor-pointer bg-opacity-10 pointer-events-auto
                        ${(userInteracting ? 'mb-0' : 'mb-20')} 
                        ${userInteracting ? 'bg-opacity-10' : 'bg-opacity-50'}
                    `}
                >
                    <p className='text-center p-3'>
                        <svg className="size-10 inline-block" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1021.76 464.448v-1.024c-0.608-7.712-1.632-14.848-2.656-22.56v-1.024C983.936 191.456 770.528 0 511.968 0c-282.72 0-512 229.472-512 512s229.472 512 512 512 512-229.472 512-512c0-15.84-1.216-32.32-2.24-47.552zM892.288 251.84c1.024 1.632 2.656 3.648 3.648 5.088 1.024 2.016 2.656 3.648 3.648 5.696 2.656 3.648 4.672 7.104 6.72 10.784 0.608 0.608 1.024 1.632 1.632 2.016l6.112 10.784c0.608 0.608 0.608 1.024 1.024 2.016a459.36 459.36 0 0 1 55.904 178.656c-109.152 18.496-134.144 35.776-144.928 64.448-8.736 22.56-5.696 41.056-0.608 53.664-3.04 3.04-6.72 6.112-9.152 8.736-24 22.56-44.512 42.496-44.512 71.136 0 13.824 3.648 28.256 7.712 43.104 1.632 5.088 3.648 12.192 4.672 17.888-5.088 6.72-12.192 15.84-17.472 29.28-3.04 2.048-6.72 4.672-10.784 7.712-3.04-18.496-3.648-42.08-1.632-50.208 11.776-36.384-2.048-61.984-13.216-76.832a70.656 70.656 0 0 0-1.024-34.336c-7.712-27.232-31.296-44.512-59.968-44.512-10.176 0-19.904 2.048-29.28 4.064-5.088 1.024-10.784 2.656-15.84 3.04h-0.416c-1.632 0-10.784-4.064-22.56-22.976 3.04-9.152 15.84-27.04 20.928-33.728 9.76-13.216 17.888-24 20.544-38.816 2.656-12.8 1.632-26.016 0.608-40.448-0.608-3.648-0.608-9.152-1.024-13.824 11.168-8.736 34.336-30.272 29.28-64.032 0-4.672 2.048-14.432 3.648-21.536 4.672-1.632 9.152-2.656 12.192-3.04 34.336-5.088 47.168-35.36 53.248-53.248 18.912-6.72 58.336-18.912 129.056-38.816 3.648 7.104 7.712 12.608 11.776 18.304zM273.792 483.744c-2.656 3.648-4.672 7.712-6.72 11.168h-5.696c-4.064 0-7.712 0-11.168-0.608-26.624-70.112-50.624-85.984-71.744-91.68-4.672-1.632-9.152-2.016-12.8-3.04-9.76-24.608-34.336-43.104-81.504-59.36 0-0.608 0.416-1.024 0.416-1.632 1.024-3.04 2.656-5.696 3.648-8.128 0.608-1.632 1.632-3.04 2.016-5.088 1.024-1.632 1.632-3.648 2.656-5.088 1.024-2.016 2.016-4.672 3.04-6.72 0-0.608 0.608-1.024 0.608-1.632a465.472 465.472 0 0 1 111.584-145.952c44.512 116.672 63.424 127.04 89.024 132.512 25.6 5.696 63.008 16.864 81.92 24.608-21.536 11.168-42.08 22.56-55.904 35.776-19.104 19.296-52.832 78.848-49.376 124.8zM51.008 512c0-42.496 5.696-83.936 16.864-123.36 25.6 8.736 47.168 19.52 50.624 30.688 9.152 29.664 27.04 27.232 45.536 32.32 18.912 5.696 40.448 67.68 44.512 79.264 4.064 12.192 36.384 14.848 52.64 14.848 16.448 0 51.232 32.32 61.984 43.104s9.152 36.384 2.656 74.176c-6.72 37.792 17.472 43.104 18.912 56.928 1.632 13.216 24 27.04 29.664 44.512s6.72 42.08-4.064 64.448c-10.784 22.976-13.216 52.64-9.152 70.112 1.024 5.696-4.064 22.976-11.776 44.512-173.984-66.048-298.368-234.368-298.368-431.52z m325.216 161.184v-1.632c2.656-14.848 5.088-29.664 5.696-44.512l7.712 4.672c4.064 2.656 9.152 5.696 14.432 8.736 3.648 2.048 7.712 3.648 11.168 5.088 6.72 35.776 31.296 47.168 47.168 50.624 6.112 1.632 12.8 2.048 19.904 2.048 5.696 0 10.784-0.608 15.456-0.608-31.52 20.736-56.096 58.144-68.896 87.808a158.208 158.208 0 0 0-6.112-36.384c-6.112-19.52-18.912-33.728-27.04-43.104-1.024-1.024-1.632-2.048-2.656-3.04-4.064-13.824-12.192-23.36-16.864-29.664 0.416 0.608 0.416 0.608 0 0zM512 972.768c-43.488 0-85.984-6.112-126.016-17.472 5.696-19.904 10.176-36.8 11.776-43.104 5.696-19.904 67.68-66.048 72.768-89.024 5.696-22.976 34.752-74.176 63.424-85.984 28.256-12.192 27.232-59.36 9.152-79.264-8.128-9.152-19.52-11.168-31.712-11.168-9.76 0-19.904 1.632-28.672 1.632-3.04 0-6.112 0-8.736-1.024-17.472-4.064-4.064-34.752-10.784-43.104-2.656-3.04-5.696-3.648-9.76-3.648h-6.72c-5.088 0-11.168-0.608-18.912-4.672-15.456-8.128-28.672-20.928-48.576-20.928-2.656 0-5.088 0-8.128 0.608s-5.696 0.608-8.736 0.608c-20.544 0-37.792-12.192-53.248-29.28-17.472-18.912 24-45.536 16.448-61.984-8.128-16.448 14.848-71.136 33.728-90.048s84.96-43.104 89.024-57.92c4.064-14.848-13.216-33.728-27.04-48.576-13.216-14.848-89.024-34.752-113.216-40.448-12.8-3.04-37.408-60.96-57.92-115.648 75.2-50.624 164.832-80.896 261.6-80.896 130.08 0 247.36 54.272 331.296 140.864-58.944 16.864-129.056 37.792-132.512 44.096-6.72 10.784-10.784 38.816-19.904 40.448s-49.6 10.784-51.232 22.976c-1.632 12.192-10.784 44.512-8.128 59.36s-24 19.904-28.256 37.792c-4.064 17.472 2.656 49.6 0 63.424-2.656 13.216-60.352 66.048-37.792 104.864 20.544 35.36 44.512 51.616 68.704 51.616 2.656 0 5.088 0 8.128-0.416 16.448-2.656 29.28-7.104 37.792-7.104 5.696 0 9.152 2.048 10.784 7.712 4.064 14.432-10.784 26.016 0 39.84 10.784 13.408 21.536 21.536 14.848 42.08-6.72 19.904-4.064 70.112 5.696 96.736 9.152 27.04 9.152 43.104 21.536 45.536 1.632 0.608 2.656 0.608 4.064 0.608 11.168 0 24.608-9.152 38.816-26.016 16.448-18.912 32.32-18.912 37.792-37.792 5.696-18.912 22.976-25.6 22.976-44.512s-13.216-52.64-13.216-67.68c0-14.848 63.424-57.92 61.984-75.2-1.632-17.472-18.912-18.912-10.784-40.448 4.064-11.168 53.664-22.56 99.392-30.688-5.28 250.4-209.952 453.248-461.792 453.248z m0 0" fill="#ffffff" />
                        </svg>
                    </p>
                    <p className='text-base md:text-xl'>{userInteracting ?
                        <Lan lang={lang} candidate={{ "zh": '关闭地图交互', en: "Disable map interaction", }} /> :
                        <Lan lang={lang} candidate={{ "zh": '点击打开地图交互', en: "Click to enable map interaction" }} />}</p>
                </motion.div>
            </div>
            {/* {!userInteracting && <div className="absolute top-0 left-0 w-full h-full bg-black/70 z-[1] overlay flex items-end pb-20 justify-center" />}
            <style jsx>{`
                .overlay {
                    background-color: transparent;
                    background-image: radial-gradient(transparent 1px, rgba(255, 255, 255, 0.6) 1px);
                    background-size: 4px 4px;
                    backdrop-filter: blur(1px);
                    mask: linear-gradient(rgb(0, 0, 0) 20%, rgba(0, 0, 0, 0) 60%);
                    opacity: .3;
                }
                `}</style> */}
        </>
    );
}

export default HomeMap;