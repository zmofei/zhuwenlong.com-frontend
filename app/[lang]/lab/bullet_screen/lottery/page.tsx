"use client"
import React, { useState, useEffect, useRef, use } from "react";
import confetti from "canvas-confetti";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import HyperText from "@/components/ui/hyper-text";
import SparklesText from "@/components/ui/sparkles-text";
import PulsatingButton from "@/components/ui/pulsating-button";



import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";



const Danmaku = () => {


    const mixedMessages = [{ "id": 1, "text": "Hello everyone! 👋" }, { "id": 2, "text": "Is anyone here? 🤔" }, { "id": 3, "text": "Happy New Year! 🎉" }, { "id": 4, "text": "This is so lively! 🥳" }, { "id": 5, "text": "Wishing you all the best in 2025! 🌟" }, { "id": 6, "text": "Cheers to health and happiness! 🥂" }, { "id": 7, "text": "Is there any gift for me? 🎁" }, { "id": 8, "text": "Wishing everyone good luck! 🍀" }, { "id": 9, "text": "Long time no see, sending blessings! 🙌" }, { "id": 10, "text": "Haha, stay joyful in 2025! 😄" }, { "id": 11, "text": "May your dreams come true! ✨" }, { "id": 12, "text": "So excited for the New Year! 🥰" }, { "id": 13, "text": "Sending my love to you all! ❤️" }, { "id": 14, "text": "What a warm atmosphere! 🌈" }, { "id": 15, "text": "Stay healthy and safe in 2025! 💪" }, { "id": 16, "text": "This place is amazing! 😍" }, { "id": 17, "text": "Happy New Year, everyone! 🕊️" }, { "id": 18, "text": "Any food recommendations? 🍔" }, { "id": 19, "text": "Wishing everyone great success! 🚀" }, { "id": 20, "text": "It's such a special day! 🌹" }, { "id": 21, "text": "Making a wish for 2025! 🌠" }, { "id": 22, "text": "Joy and love all year long! 💕" }, { "id": 23, "text": "Stay happy every day! 😊" }, { "id": 24, "text": "A brand new year, full of hope! 🌻" }, { "id": 25, "text": "May wealth flow to you in 2025! 💰" }, { "id": 26, "text": "I love the vibes here! 🎶" }, { "id": 27, "text": "Sending best wishes to you! 🌸" }, { "id": 28, "text": "Wow, what a great celebration! 🎆" }, { "id": 29, "text": "Grateful for everyone here! 🥰" }, { "id": 30, "text": "Let's make 2025 amazing! 🔥" }, { "id": 31, "text": "Hei kaikki! 👋" }, { "id": 32, "text": "Onko täällä ketään? 🤔" }, { "id": 33, "text": "Hyvää uutta vuotta! 🎉" }, { "id": 34, "text": "Onpa vilkasta! 🥳" }, { "id": 35, "text": "Toivotan sinulle kaikkea hyvää vuodelle 2025! 🌟" }, { "id": 36, "text": "Tervehdys terveydelle ja onnellisuudelle! 🥂" }, { "id": 37, "text": "Onko lahjoja tarjolla? 🎁" }, { "id": 38, "text": "Toivotan kaikille hyvää onnea! 🍀" }, { "id": 39, "text": "Pitkästä aikaa, lähetän siunauksia! 🙌" }, { "id": 40, "text": "Haha, pysy iloisena vuonna 2025! 😄" }, { "id": 41, "text": "Toivottavasti unelmasi toteutuvat! ✨" }, { "id": 42, "text": "Niin innoissani uudesta vuodesta! 🥰" }, { "id": 43, "text": "Lähetän rakkautta kaikille! ❤️" }, { "id": 44, "text": "Miten lämmin tunnelma täällä onkaan! 🌈" }, { "id": 45, "text": "Pysykää terveinä ja turvassa vuonna 2025! 💪" }, { "id": 46, "text": "Tämä paikka on upea! 😍" }, { "id": 47, "text": "Hyvää uutta vuotta kaikille! 🕊️" }, { "id": 48, "text": "Onko ruokasuosituksia? 🍔" }, { "id": 49, "text": "Toivotan kaikille suurta menestystä! 🚀" }, { "id": 50, "text": "Tämä on niin erityinen päivä! 🌹" }, { "id": 51, "text": "Teen toivomuksen vuodelle 2025! 🌠" }, { "id": 52, "text": "Iloa ja rakkautta koko vuodeksi! 💕" }, { "id": 53, "text": "Ole onnellinen joka päivä! 😊" }, { "id": 54, "text": "Uusi vuosi, täynnä toivoa! 🌻" }, { "id": 55, "text": "Toivottavasti vauraus seuraa sinua vuonna 2025! 💰" }, { "id": 56, "text": "Rakastan tätä tunnelmaa täällä! 🎶" }, { "id": 57, "text": "Lähetän parhaita toivotuksia sinulle! 🌸" }, { "id": 58, "text": "Vau, mikä upea juhla! 🎆" }, { "id": 59, "text": "Olen kiitollinen kaikille täällä! 🥰" }, { "id": 60, "text": "Tehdään vuodesta 2025 mahtava! 🔥" }, { "id": 61, "text": "大家好！👋" }, { "id": 62, "text": "有人在吗？🤔" }, { "id": 63, "text": "新年快乐！🎉" }, { "id": 64, "text": "好热闹啊！🥳" }, { "id": 65, "text": "愿2025年幸福满满！🌟" }, { "id": 66, "text": "祝健康与快乐相随！🥂" }, { "id": 67, "text": "有没有红包？🎁" }, { "id": 68, "text": "愿大家好运常伴！🍀" }, { "id": 69, "text": "好久不见，送上祝福！🙌" }, { "id": 70, "text": "哈哈，2025年开心每一天！😄" }, { "id": 71, "text": "愿你的梦想成真！✨" }, { "id": 72, "text": "新年快到了，好激动！🥰" }, { "id": 73, "text": "嘿嘿，送上我的祝福啦！❤️" }, { "id": 74, "text": "好温馨的气氛啊！🌈" }, { "id": 75, "text": "愿2025年平安健康！💪" }, { "id": 76, "text": "这里真热闹！😍" }, { "id": 77, "text": "新年快乐，万事顺心！🕊️" }, { "id": 78, "text": "有没有好吃的推荐？🍔" }, { "id": 79, "text": "祝福所有人顺顺利利！🚀" }, { "id": 80, "text": "今天好特别啊！🌹" }, { "id": 81, "text": "新年许愿中……🌠" }, { "id": 82, "text": "2025年幸福满满！💕" }, { "id": 83, "text": "开心每一天！😊" }, { "id": 84, "text": "新的一年充满希望！🌻" }, { "id": 85, "text": "愿大家财源广进！💰" }, { "id": 86, "text": "好喜欢这个氛围！🎶" }, { "id": 87, "text": "送上最美好的祝愿！🌸" }, { "id": 88, "text": "哇，这真是一个美好的庆典！🎆" }, { "id": 89, "text": "感恩每一个在场的人！🥰" }, { "id": 90, "text": "让我们一起迎接2025年吧！🔥" }, { "id": 91, "text": "第一次在赫尔辛基过春节，好热闹啊！🎉" }, { "id": 92, "text": "虽然在海外，但有这样的活动太有年味了！🥳" }, { "id": 93, "text": "赫尔辛基的春节活动真给力，太骄傲了！🔥" }, { "id": 94, "text": "家人们，2025年继续发光发热！❤️" }, { "id": 95, "text": "祝大家春节快乐，在芬兰也能感受团圆！🌟" }, { "id": 96, "text": "海外也能这样过春节，感动到想哭！😭" }, { "id": 97, "text": "虽然远在北欧，但年味一点都没少！💕" }, { "id": 98, "text": "感谢赫尔辛基的春节活动，让我们感受到家的温暖！🧧" }, { "id": 99, "text": "芬兰这么冷，这里却好热闹！😍" }, { "id": 100, "text": "祝大家在异国他乡一切顺利，新年大吉！🍀" }, { "id": 101, "text": "赫尔辛基的朋友们，大家一起加油，2025更好！💪" }, { "id": 102, "text": "北欧的春节氛围竟然这么浓厚，感恩有你们！🌹" }, { "id": 103, "text": "虽然不在国内，但这里比国内还热闹！🎆" }, { "id": 104, "text": "赫尔辛基的冬天好冷，但春节活动太暖心了！🔥" }, { "id": 105, "text": "想不到异国他乡也能这么有年味，感谢组织者！🙏" }, { "id": 106, "text": "愿所有华人在海外都能平安喜乐！❤️" }, { "id": 107, "text": "赫尔辛基的小伙伴们，春节快乐，事事顺心！✨" }, { "id": 108, "text": "今年的赫尔辛基春节活动真的太用心了！👏" }, { "id": 109, "text": "家乡的味道飘到了北欧，春节快乐！🍜" }, { "id": 110, "text": "在芬兰的华人朋友们，大家2025年一起发大财！💰" }, { "id": 111, "text": "这个春节活动太棒了，像在国内一样热闹！🥰" }, { "id": 112, "text": "虽然身在异乡，但心依然和家乡连在一起！🕊️" }, { "id": 113, "text": "芬兰华人新春快乐，咱们团结在一起！🌈" }, { "id": 114, "text": "2025年在北欧一起努力，春节快乐！🚀" }, { "id": 115, "text": "赫尔辛基华人给大家拜年啦！🎉" }, { "id": 116, "text": "祝大家在芬兰生活顺利，事业节节高升！🌟" }, { "id": 117, "text": "北欧的冬天好冷，春节活动却充满温情！❤️" }, { "id": 118, "text": "愿大家在赫尔辛基也能找到家的感觉！🌹" }, { "id": 119, "text": "祝所有华人新年好运连连，生活红红火火！🔥" }, { "id": 120, "text": "这个春节活动太赞了，让我们感受到家的温暖！🥂" }, { "id": 121, "text": "大家一起在赫尔辛基过大年，幸福感满满！💕" }, { "id": 122, "text": "赫尔辛基的小伙伴们，2025年继续努力奋斗！💪" }, { "id": 123, "text": "在北欧也能感受浓厚年味，太棒了！🎆" }, { "id": 124, "text": "愿芬兰华人朋友们2025年幸福安康！🌟" }, { "id": 125, "text": "赫尔辛基春节活动的年味让我想起家乡！🧧" }, { "id": 126, "text": "感谢主办方，这里的氛围让我倍感亲切！👏" }, { "id": 127, "text": "芬兰的春节氛围太暖心了！祝大家新年快乐！❤️" }, { "id": 128, "text": "愿大家在北欧也能年年有余，心想事成！🍀" }, { "id": 129, "text": "赫尔辛基春节的年味让我感受到家的温暖！🌹" }, { "id": 130, "text": "这个春节活动太棒了！希望2025年大家都顺利！🚀" }, { "id": 131, "text": "虽然在异国，但春节的气氛一点也不输国内！💕" }, { "id": 132, "text": "赫尔辛基的小伙伴们，祝大家新春快乐！🔥" }, { "id": 133, "text": "愿所有华人在异乡都能幸福美满！🌸" }, { "id": 134, "text": "2025年赫尔辛基春节活动让人好感动！🎆" }, { "id": 135, "text": "祝每个人在北欧的生活都蒸蒸日上！💰" }, { "id": 136, "text": "感谢大家的到来，让春节充满欢乐与团圆！🥳" }, { "id": 137, "text": "北欧的冬天很冷，但春节活动让我感到温暖！❤️" }, { "id": 138, "text": "赫尔辛基的小伙伴们，愿我们一起度过一个愉快的新年！🧧" }, { "id": 139, "text": "2025年愿大家平安喜乐，新春快乐！🌠" }]

    const colors = [
        { bg: 'bg-yellow-400', tx: 'text-black' }, // 黄色背景 + 黑色文字
        { bg: 'bg-red-500', tx: 'text-white' },   // 红色背景 + 白色文字
        { bg: 'bg-green-500', tx: 'text-white' }, // 绿色背景 + 白色文字
        { bg: 'bg-blue-500', tx: 'text-white' },  // 蓝色背景 + 白色文字
        { bg: 'bg-purple-500', tx: 'text-white' },// 紫色背景 + 白色文字
        { bg: 'bg-pink-400', tx: 'text-black' },  // 粉色背景 + 黑色文字
        { bg: 'bg-teal-400', tx: 'text-black' },  // 青绿色背景 + 黑色文字
        { bg: 'bg-orange-300', tx: 'text-black' },// 橙色背景 + 黑色文字
        { bg: 'bg-red-400', tx: 'text-white' },   // 浅红色背景 + 白色文字
        { bg: 'bg-cyan-400', tx: 'text-black' },  // 浅青色背景 + 黑色文字
        { bg: 'bg-amber-200', tx: 'text-black' }, // 琥珀色背景 + 黑色文字
        { bg: 'bg-rose-500', tx: 'text-white' },  // 玫瑰红背景 + 白色文字
        { bg: 'bg-lime-500', tx: 'text-black' },  // 酸橙色背景 + 黑色文字
        { bg: 'bg-indigo-600', tx: 'text-white' },// 靛蓝背景 + 白色文字
        { bg: 'bg-fuchsia-500', tx: 'text-white' },// 紫红背景 + 白色文字
        { bg: 'bg-gray-300', tx: 'text-black' },  // 浅灰背景 + 黑色文字
        { bg: 'bg-sky-500', tx: 'text-white' },   // 天空蓝背景 + 白色文字
        { bg: 'bg-emerald-500', tx: 'text-white' } // 翡翠绿背景 + 白色文字
    ]

    const handleClick = () => {
        const end = Date.now() + 3 * 1000; // 3 seconds
        const colors = ["#FFEE58", "#FF82AC", "#4FFFB0", "#6FCFFF", "#FF7D7D", "#DFFF5F", "#FFAA33", "#E68FFF"];

        const frame = () => {
            if (Date.now() > end) return;

            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                startVelocity: 80,
                origin: { x: 0, y: 0.5 },
                colors: colors,
                scalar: 2
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                startVelocity: 80,
                origin: { x: 1, y: 0.5 },
                colors: colors,
                scalar: 2
            });

            requestAnimationFrame(frame);
        };

        frame();
    };

    const [messageQueue, setMessageQueue] = useState<Message[]>([]);

    useEffect(() => {
        const fetchAllMessages = async () => {
            try {
                const response = await fetch('https://eu.finshare.fi/api/finshare/wall/lottery_message');
                const data = await response.json();
                console.log('Fetched all messages:', data);
                setMessageQueue(data);
            } catch (error) {
                console.error('Failed to fetch all messages:', error);
            }
        };
        fetchAllMessages();
    }, []);



    // 添加弹幕
    const addMessage = (text: any, luckone = false) => {
        console.log('text', text)
        const content = JSON.parse(text.content);
        // console.log(id)
        // console.log(String("id").)
        setMessages((prev) => {
            console.log("prev", prev);
            return [...prev, {
                animate_id: `${text.id}+${Math.random()}`,
                id: text.id,
                text: content.message,
                luckone,
                speed: Math.random() * 20 + 30, // 速度
                bg: colors[Math.floor(Math.random() * colors.length)]
            }]
        });
    };

    interface Message {
        animate_id: string;
        id: number;
        text: string;
        luckone: boolean;
        speed: number;
        bg: { bg: string; tx: string };
    }

    const [messages, setMessages] = useState<Message[]>([]); // 存储弹幕列表
    const [start, setStart] = useState(true); // 控制弹幕的开始和暂停
    const [winningNumber, setWinningNumber] = useState<number | null>(0); // 中奖号码


    // mock自动添加弹幕
    useEffect(() => {
        const interval = setInterval(() => {
            if (start && messageQueue.length > 0) {
                addMessage(messageQueue[Math.floor(Math.random() * messageQueue.length)]);
            }
        }, 200); // 每2秒添加一条弹幕
        return () => clearInterval(interval);
    }, [start, messageQueue]);

    const handleAnimationEnd = (msgId: any) => {
        // 移除动画结束的消息
        setMessages((prev) => prev.filter((msg) => msg.id !== msgId));
    };

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // 设置视频播放速度
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.8; // 0.5 倍速播放
        }
    }, []);

    return (

        <div className="absolute w-full h-full bg-cover bg-center backdrop-blur-lg overflow-hidden">
            <video
                ref={videoRef}
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="https://assets-eu.mofei.life/video/chinesenewyear-bg.mp4"
                autoPlay
                loop
                muted
                playsInline
            ></video>
            {/* 粒子背景 */}
            <div className="absolute top-0 left-0 w-full h-full bg-red/80 z-[1] overlay" />


            <style jsx>{`
                @keyframes flicker {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.6; }
                    }

                    .overlay {
                    background-image: radial-gradient(transparent 1px, #0f1115 1px);
                    background-size: 4px 4px; /* 控制点的大小和间距 */
                    backdrop-filter: blur(3px);
                }
                `}</style>
            {/* 弹幕展示 */}
            {messages.map((msg) => (
                <div
                    className="max-w-full"
                    key={`${msg.animate_id}`}
                    style={{
                        animation: `${(msg.luckone ? "luckone" : "roll")} ${(msg.luckone ? "2" : "1")}s  forwards`,
                        zIndex: 2,
                        position: "absolute",
                        left: "50%",
                        whiteSpace: "nowrap",
                        willChange: "transform, opacity",
                        color: "white",
                        fontSize: "18px",
                        top: `50%`, // 随机分布在屏幕的不同高度
                        transform: `translate(-50%, -50%)`,
                    }}
                    onAnimationEnd={() => {
                        !msg.luckone && handleAnimationEnd(msg.id)
                    }}
                >
                    <p className="text-center">
                        <span className={`inline-flex items-center rounded-full p-4 text-5xl shadow-lg max-w-full overflow-hidden break-words text-ellipsis font-medium ${msg.bg.tx} ${msg.bg.bg}`}>
                            {msg.text}
                        </span>
                        <br />

                        <span className="text-3xl">Ticket Number: <b>🎟️ {msg.id}</b></span>
                    </p>
                </div>
            ))}
            <style jsx>{`
                  @keyframes roll {
                    0% {
                        transform: perspective(1000px) translateY(300%) translateX(-50%) rotateX(-60deg);
                        opacity: 0;
                    }

                    50% {
                        transform: perspective(1000px) translateY(-200%) translateX(-50%)  rotateX(0deg);
                        opacity: 1;
                        scale: 1.2;
                    }


                    100% {
                        transform: perspective(1000px) translateY(-400%) translateX(-50%) rotateX(60deg);
                        opacity: 0;
                    }
                    }

                    @keyframes luckone {
                    0% {
                        transform: perspective(1000px) translateY(300%) translateX(-50%) rotateX(-60deg);
                        opacity: 0;
                    }

                    50% {
                        transform: perspective(1000px) translateY(-200%) translateX(-50%)  rotateX(0deg);
                        opacity: 1;
                        scale: 1.2;
                    }


                    80% {
                        transform: perspective(1000px) translateY(-200%) translateX(-50%)  rotateX(0deg);
                        opacity: 1;
                        scale: 2;
                        
                    }
                        100% {
                        transform: perspective(1000px) translateY(-200%) translateX(-50%)  rotateX(0deg);
                        opacity: 1;
                        scale: 1.5;
                        
                    }
                    }
                `}</style>
            <div className="z-10 relative top-40 text-center">

                <h1
                    className={cn(
                        `inline font-extrabold text-6xl animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                    )}
                >
                    <SparklesText className="text-6xl font-extrabold text-white" text="🎉 Lucky Draw 🎁" />
                </h1>

            </div>

            {winningNumber != undefined && (
                <div className="z-10 absolute text-center w-full transform transition-transform duration-300 bottom-[15%]">
                    🎟️ Winning Number: <span className="text-red-400">{winningNumber}</span>
                </div>
            )}

            <div className={`z-10 absolute text-center w-full transform transition-transform duration-300 bottom-[15%]`}>
                <PulsatingButton
                    className=" inline-block px-8 py-4 text-4xl font-bold text-white rounded-xl bg-gradient-to-r from-red-500 to-orange-500 hover:from-orange-500 hover:to-red-500 shadow-lg transform transition-transform duration-300 hover:scale-105 active:scale-95"
                    onClick={() => {
                        if (start) {
                            handleClick();
                            addMessage(messageQueue[Math.floor(Math.random() * messageQueue.length)], true);
                            setWinningNumber(messageQueue[Math.floor(Math.random() * messageQueue.length)].id)
                        } else {
                            setMessages([]);
                            setWinningNumber(null);
                        }
                        setStart(!start);
                    }}
                >
                    {start ? "Who is the lucky one? 🎊" : "Next lucky one 🍀"}
                </PulsatingButton>
            </div>
        </div >
    );
};

export default Danmaku;