"use client"
import 'mapbox-gl/dist/mapbox-gl.css';
import sha256 from 'crypto-js/sha256';
import { motion, } from "motion/react"
import Pagination from '@/components/Common/Pagination';
import { useEffect, useState, use, useRef } from 'react';

import { fetchMessageList, getToken, postMessage } from '@/app/actions/blog'

import { HomeIcon } from '@heroicons/react/24/outline'

const updateLinks = (htmlContent: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    // 修改所有 <a> 的属性
    doc.querySelectorAll('a').forEach((a) => {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer'); // 添加安全属性
        a.style.color = '#ff6b6b'; // 浅红色

        // 添加新窗口图标
        const icon = document.createElement('span');
        icon.style.marginLeft = '4px';
        icon.style.fontSize = '0.5em';
        icon.style.color = '#ff6b6b';
        icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4 inline-block align-top"><path fill-rule="evenodd" d="M15.75 2.25H21a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V4.81L8.03 17.03a.75.75 0 0 1-1.06-1.06L19.19 3.75h-3.44a.75.75 0 0 1 0-1.5Zm-10.5 4.5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V10.5a.75.75 0 0 1 1.5 0v8.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V8.25a3 3 0 0 1 3-3h8.25a.75.75 0 0 1 0 1.5H5.25Z" clip-rule="evenodd" /></svg>'; // 使用 Unicode 符号
        a.appendChild(icon);
    });

    return doc.body.innerHTML; // 返回修改后的 HTML
};

export default function Comments(params: any) {

    const { lang, message_id, message_page = 1, singlePageMode = false } = params
    const messageArea = useRef<HTMLDivElement>(null);
    const baseURL = '/message/'

    const [blogList, setBlogList] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    const [messagePage, setMessagePage] = useState(message_page)
    const [messageInput, setMessageInput] = useState('')
    const [edit, setEdit] = useState(false)
    const editableDivRef = useRef<HTMLDivElement>(null);
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    const [username, setUsername] = useState('Mofei\'s Friend')
    const [email, setEmail] = useState('')
    const [hashemail, setHashemail] = useState('')
    const [website, setWebsite] = useState('')
    const [freshId, setFreshId] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const email = localStorage.getItem('email') || ''
        setEmail(email)
        setHashemail(sha256(email).toString())
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
        const storedWebsite = localStorage.getItem('website') || '';
        setWebsite(storedWebsite);
    }, [])

    useEffect(() => {
        setIsLoading(true)
        fetchMessageList(message_id, messagePage).then((res) => {
            setBlogList(res.data)
            const totalCount = res.count
            const pageSize = 10
            setTotalPages(Math.ceil(totalCount / pageSize))
            setIsLoading(false)
        })
    }, [message_id, messagePage, lang, freshId])

    useEffect(() => {
        // get token
        getToken()
    }, [])

    const handlePaste = (event: { preventDefault: () => void; clipboardData: any; }) => {
        event.preventDefault();
        const text = (event.clipboardData || window.Clipboard).getData("text");

        // 获取当前选择范围
        const selection = window.getSelection();
        if (!selection || !selection.rangeCount) return;

        const range = selection.getRangeAt(0);

        // 删除当前选中的内容
        range.deleteContents();

        // 创建文本节点
        const textNode = document.createTextNode(text);
        range.insertNode(textNode);

        // 调整光标位置到插入文本的末尾
        range.setStartAfter(textNode);
        range.setEndAfter(textNode);

        // 清除旧的选择并设置新的光标位置
        selection.removeAllRanges();
        selection.addRange(range);
    };

    const handleInput = () => {
        const updatedContent = editableDivRef.current ? editableDivRef.current.innerText : ''; // 获取纯文本内容
        setMessageInput(updatedContent);
    };

    const handleEmail = (email: string) => {
        console.log('email', email, sha256(email))
        setHashemail(sha256(email).toString())
    }

    const handleSubmit = () => {
        console.log('messageInput', messageInput)


        postMessage(message_id, {
            content: messageInput,
            email,
            name: username,
            website
        }).then((res) => {
            if (singlePageMode) {
                setFreshId(freshId + 1)
                setMessagePage(1)
            } else {
                // Change url hash, push to history
                history.pushState({}, '', `${baseURL}1`)
                setFreshId(freshId + 1)
                setMessagePage(1)
            }
        })

    }

    const chineseMessages = [
        "今天有什么好玩的事？",
        "给我点灵感吧！",
        "世界那么大，你想说点什么？",
        "你的留言会被认真对待（真的）",
        "嘿，说句话呗！",
        "你的一小步，我的一大步！",
        "别害羞，尽管说！",
        "留言区已经准备好了，快点开聊！",
        "输入点内容吧，我保证不挑剔。",
        "听说在这里留言会很酷。"
    ];

    const englishMessages = [
        "What's on your mind today?",
        "Give me some inspiration!",
        "The world is big, say something!",
        "Hey, say something!",
        "Don't be shy, just type away!",
        "Write something, I won't judge.",
        "I heard leaving a comment here is pretty cool."
    ];

    function getRelativeTime(timestamp: string, lang = 'en') {
        const now = Date.now();
        const diff = now - new Date(timestamp).getTime();
        const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });


        const seconds = Math.floor(diff / 1000);
        if (seconds < 60) return rtf.format(-seconds, 'second');

        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return rtf.format(-minutes, 'minute');

        const hours = Math.floor(minutes / 60);
        if (hours < 24) return rtf.format(-hours, 'hour');

        const days = Math.floor(hours / 24);
        if (days < 30) return rtf.format(-days, 'day');

        const months = Math.floor(days / 30);
        if (months < 12) return rtf.format(-months, 'month');

        const years = Math.floor(months / 12);
        return rtf.format(-years, 'year');
    }

    const [chineseMessagesIndex, setChineseMessagesIndex] = useState(Math.floor(Math.random() * chineseMessages.length));
    const [englishMessagesIndex, setEnglishMessagesIndex] = useState(Math.floor(Math.random() * englishMessages.length));

    return (
        <>

            {/* Post */}
            <motion.div className='relative'
                initial={{ opacity: 0, translateY: 50, }}
                animate={{ opacity: 1, translateY: 0 }}
                whileInView={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.5, type: 'spring', bounce: 0.2, delay: 0.5 }}

            >
                <div className='w-0 h-0 absolute -top-20 md:-top-32 left-0 overflow-hidden invisible' ref={messageArea}></div>
                <div className='bg-gray-800 mt-10 rounded-lg shadow-lg break-all text-base overflow-hidden relative border border-gray-600 focus:border-blue-800'>
                    <div className='bg-gray-800 rounded-lg shadow-lg break-all text-base md:text-xl py-2 flex  '>
                        <div className='w-10 h-10 md:w-20 md:h-20 mt-2 ml-2 md:mt-5 md:ml-10 mr-2'>
                            <img className='w-10 h-10 md:w-20 md:h-20 rounded-sm'
                                onClick={() => setEdit(!edit)}
                                src={`https://assets-eu.mofei.life/gravatar/${hashemail || '0000000000'}?s=200`}
                            /></div>

                        <div className='flex-1 p-2 md:p-5 md:pl-5 text-base'>
                            <h2 className='font-extrabold ' onClick={() => setEdit(!edit)}>
                                <span className=''>
                                    {username ? username : 'Mofei\'s Friend'} </span>
                                <span className='text-gray-400'> ({lang == 'zh' ? '点击编辑' : 'Click to edit'})
                                </span>
                            </h2>
                            <div>
                                {edit && (
                                    <div className='mt-4 mb-6 text-gray-400' >
                                        <div className='mb-4'>
                                            <label htmlFor="email" className="block font-medium ">
                                                {lang == 'zh' ? '昵称' : 'Nickname'}
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="search"
                                                    value={username}


                                                    onChange={(e) => {
                                                        setUsername(e.target.value)
                                                        // save to local storage
                                                        localStorage.setItem('username', e.target.value)
                                                    }}
                                                    placeholder="Mofei's Friend"
                                                    className="block w-full rounded-md bg-[#435063]  px-3 py-1.5 text-base  placeholder:text-gray-400  text-white"
                                                />
                                            </div>
                                        </div>
                                        <div className='mb-4'>
                                            <label htmlFor="email" className="block font-medium">
                                                {lang == 'zh' ?
                                                    '邮箱（用于显示留言头像）' :
                                                    <span>Email (Used to display <a href='https://gravatar.com/' target="_blank" className='underline'> the avatar</a>)</span>}
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="search"
                                                    value={email}

                                                    onChange={(e) => {
                                                        setEmail(e.target.value)
                                                        localStorage.setItem('email', e.target.value)

                                                        // 清除之前的定时器
                                                        if (debounceTimeout.current) {
                                                            clearTimeout(debounceTimeout.current);
                                                        }

                                                        // 设置新的定时器
                                                        debounceTimeout.current = setTimeout(() => {
                                                            console.log('update email', e.target.value)
                                                            handleEmail(e.target.value)
                                                        }, 1000);
                                                    }}
                                                    placeholder="you@example.com"
                                                    className="block w-full rounded-md bg-[#435063] px-3 py-1.5 text-base  placeholder:text-gray-400  text-white"
                                                />
                                            </div>
                                        </div>
                                        <div className='mb-4'>
                                            <label htmlFor="email" className="block text-sm/6 font-medium">
                                                {lang == 'zh' ? '网站 (有效网站会在留言姓名后显示链接)' : 'Website (Valid websites will be displayed as links after the message name)'}
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    autoComplete='off'
                                                    id="email"
                                                    name="email"
                                                    type="search"
                                                    value={website}
                                                    onChange={(e) => {
                                                        setWebsite(e.target.value)
                                                        localStorage.setItem('website', e.target.value)
                                                    }}
                                                    placeholder="https://example.com"
                                                    className="block w-full rounded-md bg-[#435063] px-3 py-1.5 text-base  placeholder:text-gray-400  text-white"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className='mb-2 relative' >
                                <div contentEditable translate='no' className='outline-none py-2' ref={editableDivRef} onPaste={handlePaste} onInput={handleInput} />
                                <div className='absolute top-0 left-0 py-2 pointer-events-none text-gray-500 truncate w-full'>{(
                                    messageInput !== '' && messageInput !== '\n'
                                ) ? '' : (
                                    lang == 'zh' ? chineseMessages[chineseMessagesIndex] : englishMessages[englishMessagesIndex]
                                )}</div>
                            </div>
                            <div>
                                <button className=' p-2 px-6 border-blue-100 border rounded-md text-sm '
                                    onClick={() => {
                                        handleSubmit()
                                        console.log('messageInput', messageInput)
                                    }}>{
                                        lang == 'zh' ? '发送' : 'Send'
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* List */}
            <div className='container max-w-[2000px] m-auto'>
                <motion.div className=''
                    initial={{ opacity: 0, translateY: 200 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ duration: 1.4 }}
                >
                    {isLoading && ([...Array(10)].map((_, index) => {
                        return (<motion.div className='
                            mt-5
                            md:mt-10
                            ' key={`${index}_loading`}
                            initial={{ opacity: 0, translateY: 50, }}
                            whileInView={{ opacity: 1, translateY: 0 }}
                            transition={{ duration: 0.5, type: 'spring', bounce: 0.2, }}
                        >

                            <div className='bg-gray-800 rounded-lg shadow-lg break-all
                                text-base
                                md:text-xl
                                py-2
                                flex  
                            '>
                                <motion.div className='mt-2 ml-2 mr-2
                                w-10 h-10 
                                md:w-20 md:h-20 md:mt-10 md:ml-10 bg-slate-700 rounded-md'
                                    animate={{ opacity: 0.5 }}
                                    initial={{ opacity: 0.3 }}
                                    transition={{ repeat: Infinity, duration: 1, repeatType: 'reverse' }} />
                                <div className='
                                    flex-1 
                                    p-2
                                    md:p-10 md:pl-4
                                    text-base
                                '>
                                    <motion.h2 className='font-extrabold bg-slate-700 w-32 inline-block h-4 md:h-6 rounded-md'
                                        animate={{ opacity: 0.5 }}
                                        initial={{ opacity: 0.3 }}
                                        transition={{ repeat: Infinity, duration: 1, repeatType: 'reverse' }}
                                    />
                                    <motion.div className='mt-2 bg-slate-700 w-full inline-block h-4 md:h-6 rounded-md'
                                        animate={{ opacity: 0.5 }}
                                        initial={{ opacity: 0.3 }}
                                        transition={{ repeat: Infinity, duration: 1, repeatType: 'reverse' }} />
                                    <motion.h2 className='mt-2 md:mt-4 font-extrabold bg-slate-700 w-32 inline-block h-4 md:h-6 rounded-md' animate={{ opacity: 0.5 }}
                                        initial={{ opacity: 0.3 }}
                                        transition={{ repeat: Infinity, duration: 1, repeatType: 'reverse' }} />
                                </div>
                            </div>
                        </motion.div>)
                    }))}

                    {
                        blogList.map((blog: any, index: number) => {
                            return (
                                <motion.div className='
                                    mt-5
                                    md:mt-10
                                    ' key={blog._id}
                                    initial={{ opacity: 0, translateY: 50, }}
                                    whileInView={{ opacity: 1, translateY: 0 }}
                                    transition={{ duration: 0.5, type: 'spring', bounce: 0.2, }}
                                >
                                    <div className='bg-gray-800 rounded-lg shadow-lg
                                        text-base
                                        md:text-xl
                                        py-2
                                        flex  
                                    '>
                                        <div className='mt-2 ml-2 mr-2
                                        w-10 h-10 
                                        md:w-20 md:h-20 md:mt-10 md:ml-10'>
                                            <img className='rounded-sm
                                                w-10 h-10 
                                                md:w-20 md:h-20'
                                                src={`https://assets-eu.mofei.life/gravatar/${blog.email || '0000000000'}?s=200`}
                                            />
                                        </div>
                                        <div className='
                                            flex-1 
                                            p-2
                                            md:p-10 md:pl-4
                                            text-base
                                        '>
                                            <h2 className='font-extrabold '>
                                                {blog.name}
                                                {blog.blog ? (
                                                    <a
                                                        href={blog.blog.startsWith('http://') || blog.blog.startsWith('https://') ? blog.blog : `https://${blog.blog}`}
                                                        target='_blank'
                                                        className="text-[#f05a54] underline ml-1"
                                                    ><HomeIcon className='inline-block size-5' /></a>
                                                ) : ''}
                                            </h2>
                                            <div className='mt-2' dangerouslySetInnerHTML={{
                                                __html: updateLinks(
                                                    lang == 'zh' ? (blog.translate_zh || blog.content) : (blog.translate_en || blog.content)
                                                )
                                            }} />
                                            <div className='mt-2 text-gray-500' title={new Date(blog.time).toLocaleDateString(
                                                lang == 'zh' ? 'zh-CN' : 'en-US'
                                                , {
                                                    weekday: "short",
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                    hour: "numeric",
                                                    minute: "numeric",
                                                })}>
                                                {getRelativeTime(blog.time, lang == 'zh' ? 'zh-CN' : 'en-US')}

                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })
                    }
                </motion.div>
            </div>


            {totalPages > 1 && (<div className='py-8 
                mt-5
                md:mt-10
                '>
                <Pagination lang={lang} key={freshId} currentPage={Number(messagePage)} totalPages={totalPages} baseURL={baseURL} singlePageMode={singlePageMode} onPageChange={(page: number) => {
                    if (singlePageMode) {
                        setMessagePage(page)
                    } else {
                        // Change url hash, push to history
                        history.pushState({}, '', `${baseURL}${page}`)
                        setMessagePage(page)
                    }
                    setFreshId(freshId + 1)

                    messageArea.current && messageArea.current.scrollIntoView({
                        behavior: 'smooth', // 平滑滚动
                        block: 'start',     // 元素滚动到视口顶部
                    });

                }}
                />
            </div>)}


        </>
    );
}
