import React, { useState, useEffect, useRef } from "react";
import Link from 'next/link';
import CSS from './message.module.scss';
import Cookie from 'js-cookie';
import fetch from 'isomorphic-unfetch';
import md5 from 'spark-md5';
import moment from 'moment';
import { connect } from 'react-redux';
import Page from '../commons/pageNumber';
import config from '../config';

let avatarInvertId = 0;

function getListByID(id, page, callback) {
    fetch(`${config.dbHost}/api/blog/messagelist?id=${id}&pageNumber=20&page=${page.current}`)
        .then(r => r.json())
        .then(res => {
            console.log(res);
            callback(res || [])
        })
}

function lanSwitch(obj, lan) {
    return obj[lan];
}

function Message(props) {
    let oldMessage = '';
    let oldRepMessage = '';
    if (typeof window !== "undefined") {
        oldMessage = localStorage.getItem('message') || '';
        oldRepMessage = localStorage.getItem('repMessage') || '';
    }

    if (!Cookie.get('userinfo')) {
        Cookie.set('userinfo', {
            name: `${lanSwitch({ en: 'Guest', zh: '游客' }, props.lan)}_` + Math.round(Math.random('1') * 10e3),
            isInit: true
        }, { expires: 999999 })
    }

    const messageBox = useRef(null);

    const [userinfo, setUserinfo] = useState(Cookie.getJSON('userinfo') || {});
    const [changingUserinfo, setChangingUserinfo] = useState(false);
    const [active, setActive] = useState(false);
    const [message, setMessage] = useState(oldMessage);
    const [avatar, setAvatra] = useState(`//avatar.zhuwenlong.com/avatar/${(userinfo && userinfo.email) ? md5.hash(userinfo.email) : ''}`);

    let hasInitData = props.initialData;
    //
    const [messageList, setmessageList] = useState(hasInitData ? hasInitData.list : null);
    const [page, setPage] = useState(hasInitData ?
        {
            current: hasInitData.page.page,
            total: hasInitData.page.total
        } : { current: 1, total: 1 });

    // replay
    const [activeMessage, setActiveMessage] = useState(null);
    const [replyID, setReplyID] = useState(null);
    const [repMessage, setRepMessage] = useState(oldRepMessage);


    useEffect(() => {
        getListByID(props.id, page, rst => {
            console.log(rst);
            setmessageList(() => rst.list);
            setPage(page => {
                return Object.assign({}, page, { total: Math.ceil(rst.page.total / 20) });
            });
        })
    }, [page.current]);



    function updateUserinfo(key, value) {
        if (key === 'reset') {
            setUserinfo(info => {
                const userinfo = {
                    name: `${lanSwitch({ en: 'Guest', zh: '游客' }, props.lan)}_` + Math.round(Math.random('1') * 10e3),
                    isInit: true
                };
                Cookie.set('userinfo', userinfo, { expires: 999999 })
                return userinfo;
            });
        } else {
            setUserinfo(info => {
                const newInfo = { ...info };
                newInfo.isInit = false;
                newInfo[key] = value;
                Cookie.set('userinfo', newInfo, { expires: 999999 })
                return newInfo;
            });
        }
    }

    function repPbulish() {
        if (!repMessage) {
            alert(lanSwitch({ en: 'Hellooooo!! Say something???', zh: "没写东西，不许你回复！！" }, props.lan));
        } else {
            const requestQuery = [
                `message=${repMessage}`,
                `id=${props.id}`,
                `avatar=${avatar}`,
                `replyID=${replyID}`,
            ];

            fetch(`${config.dbHost}/api/blog/message`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                    'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
                },
                body: requestQuery.join('&')
            })
                .then(data => {
                    getListByID(props.id, page, rst => {
                        setmessageList(() => rst.list);
                    });
                    setRepMessage(() => '');
                    setActiveMessage(() => '');
                    setReplyID(() => '');
                    alert(lanSwitch({ en: 'Send Succesfully', zh: "发布成功啦！" }, props.lan));
                })
                .catch(e => {
                    console.log(e);
                })
        }
    }

    function usePbulish() {
        if (!message) {
            alert(lanSwitch({ en: 'You didn\'t write anything', zh: "你啥都就没写呐" }, props.lan));
        } else {

            const requestQuery = [
                `message=${message}`,
                `id=${props.id}`,
                `avatar=${avatar}`,
            ];

            fetch(`${config.dbHost}/api/blog/message`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                    'Accept': '*/*'
                },
                body: requestQuery.join('&')
            })
                .then(data => {
                    getListByID(props.id, page, rst => {
                        setmessageList(() => rst.list);
                    });
                    setMessage(() => '');
                    localStorage.removeItem('message');
                    localStorage.removeItem('repMessage');
                    alert(lanSwitch({ en: 'Send Succesfully', zh: "发布成功啦！" }, props.lan));
                })
                .catch(e => {
                    console.log(e);
                })
        }
    }

    function setUserInfo() {
        return (
            <>
                <div className={CSS["commend-pub-uname"]}
                    onClick={() => {
                        setChangingUserinfo(!changingUserinfo)
                    }}>
                    <span>{userinfo.name} </span>
                    <span>
                        {(changingUserinfo || !userinfo.isInit) ? '' : <span>&#xe906;</span>}
                    </span>
                </div>
                <div className={CSS["commend-input-box"]} style={{
                    display: (changingUserinfo ? 'block' : 'none')
                }}>
                    <input
                        type="text"
                        placeholder={lanSwitch({ en: 'Name', zh: "昵称" }, props.lan)}
                        value={userinfo.name}
                        onChange={e => {
                            updateUserinfo('name', e.target.value)
                        }}
                        onBlur={e => {
                            if (e.target.value === '') {
                                updateUserinfo('reset');
                            }
                        }
                        } />
                    <input
                        type="text"
                        placeholder={lanSwitch({ en: 'Email [optional]', zh: "邮箱（选填，用以展示头像和接收回复信息）" }, props.lan)}
                        value={userinfo.email}
                        onChange={e => {
                            const emailVal = e.target.value;
                            updateUserinfo('email', emailVal);
                            clearInterval(avatarInvertId);
                            avatarInvertId = setTimeout(() => {
                                const avatarHash = md5.hash(emailVal);
                                setAvatra(() => {
                                    return `//avatar.zhuwenlong.com/avatar/${avatarHash}`;
                                })
                            }, 500)
                        }}
                        onBlur={e => {
                            clearInterval(avatarInvertId);
                            const avatarHash = md5.hash(e.target.value);
                            setAvatra(() => {
                                return `//avatar.zhuwenlong.com/avatar/${avatarHash}`;
                            })
                        }} />
                    <input
                        type="text"
                        placeholder={lanSwitch({ en: 'Website [optional]', zh: "网站（选填，友情链接）" }, props.lan)}
                        value={userinfo.blog} onChange={e => {
                            updateUserinfo('blog', e.target.value)
                        }} />
                </div>
            </>
        )
    }

    function getMessageList() {
        if (messageList && messageList.length >= 0) {
            return messageList.map(l => {
                return (
                    <div key={`comment_${l._id}`}
                        className={`${CSS["commend-pub"]} ${l._id === activeMessage ? CSS['commend-active'] : ''}`}
                        onMouseEnter={() => {
                            setActiveMessage(() => {
                                return l._id;
                            });
                        }}
                        onMouseLeave={() => {
                            setActiveMessage(() => {
                                return null;
                            });
                        }}
                    >
                        <div className={CSS["commend-avatar"]}>
                            <img src={l.avatar || '//avatar.zhuwenlong.com/avatar/'} alt="avatar" />
                        </div>

                        <div className={CSS["commend-input"]}>
                            <div className={CSS["commend-info"]}>
                                <div className={CSS["commend-name"]}>
                                    {l.blog ?
                                        <Link
                                            href={`/api/jump?url=${l.blog.indexOf('http') !== -1 ? l.blog : `http://${l.blog}`}`}
                                        >
                                            <a target="_blank">{l.name}&nbsp;</a>
                                        </Link> : <span>{l.name} </span>
                                    }
                                    <span className={CSS["commend-time"]}>
                                        {moment(l.time).format('YYYY-MM-DD HH:mm:ss')}
                                    </span>
                                    <div
                                        className={`${CSS["commend-replay"]} ${CSS["commend-replay-btn"]}`}
                                        onClick={() => {
                                            setReplyID(() => l._id)
                                        }}
                                    >
                                        &#xe8af; {lanSwitch({ en: 'Reply', zh: "回复" }, props.lan)}
                                    </div>
                                </div>
                            </div>
                            <div className={CSS["commend-text"]}
                                dangerouslySetInnerHTML={{ __html: (l.replyTxt || '') + l.content }}></div>
                            <div className={CSS["commend-input-box"]}
                                style={{ display: replyID === l._id ? 'block' : 'none' }}>
                                {setUserInfo()}
                                <textarea
                                    className={CSS.textarea}
                                    placeholder={lanSwitch({ en: 'Let\'s write something (👻 we are support MarkDown)', zh: '写点什么吧（ 👻支持MarkDown哦 )' }, props.lan)}
                                    onChange={e => {
                                        const value = e.target.value;
                                        localStorage.setItem('repMessage', value);
                                        setRepMessage(() => value)
                                    }} value={repMessage}
                                    autoFocus={replyID === l._id ? true : false}
                                />
                                <button
                                    className={CSS['commend-pub-btn']}
                                    onClick={() => { repPbulish() }}
                                >
                                    {lanSwitch({ en: 'Send ', zh: "发布" }, props.lan)}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })
        } else {
            const placeHoler = new Array(4).fill(0);
            return placeHoler.map((v, index) =>
                <div className={`${CSS["commend-pub"]} ${CSS.commendPlaceholder}`} key={index}>
                    <div className={CSS['commend-avatar']}>
                        <div className={CSS['commend-avatar-img']}></div>
                    </div>
                    <div className={CSS['commend-input']}>
                        <div className={`${CSS.commendPlaceholder} ${CSS.placeHolerName}`} />
                        <div className={`${CSS.commendPlaceholder} ${CSS.placeHolerTxt}`} />
                        <div className={`${CSS.commendPlaceholder} ${CSS.placeHolerTxt}`} />
                        <div className={`${CSS.commendPlaceholder} ${CSS.placeHolerTxt}`} />

                    </div>
                </div>
            )
        }
    }

    const commentDom = process.browser ? (
        <div className={CSS["commend-pub"]} onClick={() => { setActive(() => true) }}>
            <div className={CSS["commend-pub-info"]}>
                <div className={CSS["commend-avatar"]}>
                    <img
                        id="useravatar"
                        src={avatar || '//avatar.zhuwenlong.com/avatar/'}
                        alt="avatar" />
                </div>
                <div className={CSS["commend-input"]}>
                    <div className={`${CSS["comment-handle"]} ${active ? CSS['active'] : ''}`}>
                        {setUserInfo()}
                        <div className={CSS["commend-input-box"]}>
                            <textarea
                                className={CSS.textarea}
                                placeholder={
                                    lanSwitch({ en: 'Let\'s write something (👻 we are support MarkDown)', zh: '写点什么吧（ 👻支持MarkDown哦 )' }, props.lan)
                                }
                                onChange={e => {
                                    const value = e.target.value;
                                    localStorage.setItem('message', value);
                                    setMessage(() => value)
                                }} value={message} />
                            <button className={CSS['commend-pub-btn']} onClick={usePbulish}>
                                {lanSwitch({ en: 'Send', zh: '发布' }, props.lan)}
                            </button>
                        </div>
                    </div>
                    <div style={{ display: active ? 'none' : '' }} className={CSS["commend-pub-text"]} id="commendTips">
                        {lanSwitch({ en: 'Leave a message', zh: '留言...' }, props.lan)}
                    </div>
                </div>
            </div>
        </div>
    ) : '';

    return (
        <>
            <section className={CSS["commend-box"]} ref={messageBox}>
                <section className={CSS["commend"]}>
                    <div>
                        {commentDom}
                    </div>
                    {getMessageList()}
                    {page.total > 1 && <Page
                        type="search"
                        total={page.total}
                        current={page.current}
                        pageChange={_page => {
                            messageBox.current.scrollIntoView()
                            setPage(page => {
                                return Object.assign({}, page, { current: _page });
                            });
                        }}
                        bacicPath='/message'
                    />}
                </section>
            </section>
        </>
    )
}

const mapStateToProps = state => {
    return { lan: state.lan };
};

export default connect(
    mapStateToProps
)(Message);