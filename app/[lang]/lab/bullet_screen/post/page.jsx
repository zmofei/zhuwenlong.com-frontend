"use client"
import React, { useState, useEffect, use } from "react";
import { BarsArrowUpIcon, UsersIcon, ChatBubbleLeftEllipsisIcon, GifIcon, GiftIcon } from '@heroicons/react/16/solid'


const Message = () => {

    // Get user token from local storage, if not exist, get from api
    useEffect(() => {
        // Get user token from local storage
        let user = localStorage.getItem("fs_token");
        if (!user || user === "undefined") {
            console.log('get user token from api');
            // Get user token from api https://eu.finshare.fi/api/finshare/wall/register
            // Method Post
            fetch("https://eu.finshare.fi/api/finshare/wall/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            }).then((data) => {
                console.log(data);
                localStorage.setItem("fs_token", data.token);
            })

        }
    }, []);

    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const msgs = localStorage.getItem('messages') ? JSON.parse(localStorage.getItem('messages')) : [];
        setMessages(msgs.reverse());
    }, []);

    function sendMessage() {
        setIsSending(true);
        // Post message to api https://eu.finshare.fi/api/finshare/wall/message
        // Body: {
        //     "context": "{\"v\": \"fsw1\", \"message\": \"芬享芬兰，芬享快乐\"}"
        //   }
        // Method Post
        fetch("https://eu.finshare.fi/api/finshare/wall/send-message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + localStorage.getItem("fs_token")
            },
            body: JSON.stringify({
                "context": "{\"v\": \"fsw1\", \"message\": \"" + message + "\"}"
            })
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw response;
        }).then((data) => {
            alert("Send message success.");
            setMessage("");
            setIsSending(false);

            const updatedMessages = [{
                timestamp: new Date().toLocaleTimeString("default", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }),
                msg: message,
                reviewedCtx: data.reviewedCtx
            }, ...messages];
            setMessages(updatedMessages);
            localStorage.setItem('messages', JSON.stringify(updatedMessages));
        }).catch((error) => {
            console.error(error);
            // If status code is 401, get user token from api again
            // If status code is 429, alert "Send message too frequently."
            if (error.status === 401) {
                localStorage.removeItem("fs_token");
                alert("Please try again.");
                window.location.reload();
            } else if (error.status === 429) {
                alert("You can only send message once every 1 minute.");
            } else {
                alert("Send message failed.");
            }
            setIsSending(false);
        })
    }


    return (
        <>
            <div className="absolute w-full h-full bg-cover bg-center backdrop-blur-lg text-white"
                style={{
                    backgroundImage: "url('/img/new_year_bg.jpg')", // 背景图片路径
                }}
            >
                <div className="absolute top-0 left-0 w-full h-full bg-red/80 z-[1] overlay">
                    {/* 粒子背景 */}
                </div>

                <style jsx>{`
                .overlay {
                    background-image: radial-gradient(transparent 1px, #0f1115 1px);
                    background-size: 4px 4px; /* 控制点的大小和间距 */
                    backdrop-filter: blur(3px);
                }
                `}</style>

            </div>
            <div className="absolute w-full bottom-40 top-20 left-0 p-4 overflow-y-auto ">
                <ul role="list" className="-mb-8">
                    {messages.map((msg, index) => {
                        const isReviewed = msg.reviewedCtx?.reason
                        return (
                            <li key={index} className=" py-2 text-white">
                                <span class=" bg-gray-800 w-full text-white text-center leading-normal  overflow-hidden  rounded-lg shadow-lg border border-yellow-500 inline-block px-4 py-2">
                                    <p><span class="font-bold text-3xl m-2 my-1 inline-block"> <> 🎟️ {msg.reviewedCtx.id}</></span></p>
                                    <p>{isReviewed ? "✨ " : "💬"}  {msg.reviewedCtx.reviewed || msg.msg}  </p>
                                    <p><span className="text-gray-400"> @ {msg.timestamp}</span></p>
                                </span>
                            </li>
                        )
                    })}
                </ul>

            </div>
            <div className="absolute w-full left-0 bottom-5 text-white">
                <div className="absolute bottom-0 left-0 w-full p-4">
                    <label htmlFor="query" className="block text-xl font-medium">
                        Send a message
                    </label>
                    <div className="mt-2 flex">
                        <div className="-mr-px grid grow grid-cols-1 focus-within:relative">
                            <input
                                id="query"
                                name="query"
                                type="text"
                                placeholder="Happy New Year! By John"
                                className="col-start-1 row-start-1 block w-full rounded-l-md bg-white py-2 pl-10 pr-3 text-xl text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 "
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <ChatBubbleLeftEllipsisIcon
                                aria-hidden="true"
                                className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"
                            />
                        </div>
                        <button
                            onClick={sendMessage}
                            disabled={isSending}
                            type="button"
                            className="flex shrink-0 items-center gap-x-1.5 rounded-r-md bg-white px-3 py-2 text-xl font-semibold text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 hover:bg-gray-50 focus:relative focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        >
                            {isSending ? "Sending..." : "Send"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Message;