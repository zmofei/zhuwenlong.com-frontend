import React, { useEffect, useState, useRef } from "react";
import CSS from './index.module.scss';
import Image from "next/legacy/image";
import logo from '../public/static/img/index/logo.png';
import fetch from 'isomorphic-unfetch'
import Lan from '../i18n/languageMap.jsx';
import lan from '../i18n/languagefn.js';
import Layout from '../commons/layout';
import config from '../config';
import Head from 'next/head';
import { connect } from 'react-redux';

import Copyright from '../commons/copyright';

function Home(props) {

  // for message
  var username = useRef(null);
  var email = useRef(null);
  var message = useRef(null);
  var sendBtn = useRef(null);
  var tips = useRef(null);
  var nextPage = useRef(null);
  var mapRef = useRef(null)

  const [msgState, setMsgState] = useState(0);
  const [screenHeight, setScreenHeight] = useState(1000);
  const [mapInteraction, setMapInteraction] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isInit, setIsInit] = useState(false);
  const [isMapInit, setIsMapInit] = useState(false);
  // msgState => 0: ready 1: sending 2: sended 3: faild
  // for scroll
  const onClickMore = () => {
    nextPage && nextPage.current.scrollIntoView()
  }


  var inputs = [username, email, message];

  const onSendMSG = () => {
    if (msgState === 1) return;
    setMsgState(() => 1);

    fetch(`${config.dbHost}/api/emailmessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username.current.value,
        email: email.current.value,
        message: message.current.value
      })
    }).then(res => {
      setMsgState(() => 2);
      for (var i in inputs) {
        inputs[i].current.value = '';
      }

      tips.current.innerText = 'Message sended';
      tips.current.style.color = '#A5A5A5';
      tips.current.style.opacity = 1;
      setTimeout(function () {
        tips.current.style.opacity = 0;
      }, 2000);
    }).catch(e => {
      console.log(e)
      setMsgState(() => 3);
      for (var i in inputs) {
        inputs[i].current.removeAttribute('disabled');
      }
      tips.current.innerText = 'Message send failed, Please try again';
      tips.current.style.color = '#FF5F5F';
      tips.current.style.opacity = 1;
      setTimeout(function () {
        tips.current.style.opacity = 0;
      }, 4000);
    })
  }

  useEffect(() => {
    // bind intersection event
    function cb(entries) {
      const [entry] = entries;

      if (entry.isIntersecting && isMapInit != true) {
        setIsMapInit(true);
      }
    }
    const observer = new IntersectionObserver(cb, {
      root: null,
      rootMargin: "0px 0px 200px 0px",
      threshold: 0
    })

    if (mapRef.current) observer.observe(mapRef.current)

    return () => {
      if (mapRef.current) observer.unobserve(mapRef.current)
    }
  }, [isInit])


  useEffect(() => {
    // return false
    // show map
    if (!isInit) {
      return () => { }
    }
    // init map
    mapboxgl.accessToken = 'pk.eyJ1IjoibW9mZWkiLCJhIjoiY2w1Z3Z6OWw1MDNlaDNjcXpqMjZsMG5oZCJ9.nqfToaqgxmm3jbJzu6bK6Q';
    const map = new mapboxgl.Map({
      container: 'mapbox',
      zoom: isMobile ? 2.5 : 3.5,
      maxZoom: 6,
      // hash:true,
      center: [121, 31],
      pitch: 45,
      style: 'mapbox://styles/mofei/cl5hjzmdt000615mibhmjd3yj',
      projection: 'globe', // Display the map as a globe
    });
    // The following values can be changed to control rotation speed:
    // At low zooms, complete a revolution every two minutes.
    const secondsPerRevolution = 200;
    // Above zoom level 5, do not rotate.
    const maxSpinZoom = 5;
    // Rotate at intermediate speeds between zoom levels 3 and 5.
    const slowSpinZoom = 3;

    let userInteracting = false;
    let spinEnabled = true;

    function spinGlobe() {
      const zoom = map.getZoom();
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

    // When animation is complete, start spinning if there is no ongoing interaction
    map.on('moveend', () => {
      spinGlobe();
    });

    spinGlobe();
    return () => {
      map.remove()
    }
  }, [isMapInit])


  // for map
  useEffect(() => {
    let _isMobile = !!((document.body.clientWidth || document.documentElement.clientWidth) < 800);
    const _screenHeight = document.documentElement.clientHeight || document.body.clientHeight;
    setScreenHeight(_screenHeight)
    setIsMobile(_isMobile)
    setIsInit(true)
  }, [])

  return (
    <>
      <Head>
        <title>{lan(props.lan, { 'zh': "朱文龙(Mofei)的自留地", 'en': 'Hi! I am Mofei!' })}</title>
        <meta charSet="UTF-8" />
        <meta name="description" content={lan(props.lan, { 'zh': "朱文龙的自留地", 'en': 'Hi! I am Mofei!' })} />
        <meta name="keywords" content="朱文龙,Mofei,HTML,CSS,JavaScript" />
        <meta name="author" content={lan(props.lan, { 'zh': "朱文龙", 'en': 'Mofei Zhu' })} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="alternate" hrefLang="x-default" href="https://www.zhuwenlong.com/" />
        <link rel="alternate" hrefLang="en" href="https://www.himofei.com/" />
      </Head>
      {isInit && (
        <Layout nocopyright={true} module="/">
          <div className={CSS.homeBody} >
            <div className={CSS.videoBgMobile} style={{ height: screenHeight }}></div>
            {!isMobile && (
              <video className={CSS.videoBg} id="bgvid" autoPlay loop muted playsInline poster="//cdn.zhuwenlong.com/image/index/cover-820e030cca.jpg">
                <source src="//cdn.zhuwenlong.com/video/bgvideo-0c73e2c57a.mp4" type="video/mp4" />
                <source src="//cdn.zhuwenlong.com/video/bgvideo-513397179e.webm" type="video/webm" />
                <source src="//cdn.zhuwenlong.com/video/bgvideo-5428b1617d.ogv" type="video/ogg" />
              </video>
            )}

            <div className={CSS.videobg} style={{ height: screenHeight }}></div>

            <section className={`${CSS.index} ${CSS.indexCover}`} style={{ height: screenHeight }}>
              {isInit && (
                <div className={CSS.title}>
                  <svg id="title" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.96 74">
                    <path d="M14.91,4.05V73H0V4.05Z" />
                    <path className={CSS.red} d="M26.24,29.66A130.3,130.3,0,0,0,31,0H46.06c-.77,9.61-4,21.55-8.28,29.66Z" />
                    <path d="M115.09,47.14c0-11.77.18-25,.48-32.75h-.47C111.86,28.46,105,51.43,98.35,73H85.66c-5-18.86-12.16-45-15.18-58.8H70c.59,8.09.88,22.28.88,34.1V73H57.3V4.05H79.49c5.37,18,11.4,40.62,13.47,50.89h.11c1.69-9.06,9.26-33.22,15-50.89h21.39V73H115.09Z" />
                    <path d="M227.88,47.14c0-11.77.19-25,.49-32.75h-.47c-3.24,14.07-10.14,37-16.75,58.61h-12.7c-5-18.86-12.15-45-15.18-58.8h-.46c.59,8.09.88,22.28.88,34.1V73H170.1V4.05h22.18c5.38,18,11.4,40.62,13.48,50.89h.11c1.69-9.06,9.26-33.22,15-50.89h21.38V73H227.88Z" />
                    <path d="M322.17,38.29c0,19.19-11.53,35.71-33.92,35.71-21.64,0-33-15.72-33-35.47,0-20.07,12.51-35.48,33.92-35.48C309.38,3.05,322.17,17.18,322.17,38.29Zm-51.49-.06c0,13.46,5.91,23.64,18.14,23.64,13.25,0,17.95-11.1,17.95-23.39,0-13-5.34-23.3-18.19-23.3C276.12,15.18,270.68,24.8,270.68,38.23Z" />
                    <path d="M335.2,4.05h48.12V16.27H349.75v16.9H381.2V45.38H349.75V73H335.2Z" />
                    <path d="M441.84,43.26h-33V60.78h36.38L443.47,73H394.4V4.05h48.89V16.27H408.86V31h33Z" />
                    <path d="M470.8,4.05V73H455.9V4.05Z" />
                    <circle className={CSS.red} cx="485" cy="61" r="12" />
                    {/* <line className="red-dot" x1="498.95" y1="59.99" x2="498.95" y2="59.99" stroke="#FF5851" class="red-dot" strokeWidth={1} strokeLinecap="round" /> */}
                  </svg>
                  <h2>
                    <span><Lan en="Open a coffee shop," zh="开一家有故事的咖啡店，" /></span>
                    <span><Lan en="Travel around the world," zh="讲述着我环游世界的故事，" /></span>
                    <span><Lan en="This should be my life." zh="这才应该是我的生活。" /></span>
                  </h2>
                </div>
              )}
              <button className={`${CSS.btn} ${CSS['cover-more']}`} id="More" onClick={onClickMore}>
                <Lan en="More" zh="更多" />
              </button>
            </section>
            <section className={CSS['index-about']} ref={nextPage}>
              <h2><Lan en="Who am I" zh="我是谁" /></h2>
              <h3><Lan en="I wish I were an interesting person" zh="我希望我是一个有趣的人" /></h3>
              <div className={CSS['index-about-who']}>
                <div className={`${CSS['index-about-block']} ${CSS['index-about-identity']}`}>
                  <div className={CSS.img}></div>
                  <p><Lan en="Mofei Zhu (朱文龙)" zh="朱文龙（Mofei Zhu）" /></p>
                  <p><Lan en="Born in 1989 AD, latitude 32.6167° longitude 116.9833°, Earth, Milky Way. Homo sapiens, Homo, Hominidae, Primates, Mammalia." zh="高级动物，人科，人属，智人种，公元1989年诞生于银河系-地球（北纬32.6167°，东经116.9833°）。" /></p>
                  <p><Lan en="Optimistic, Adorable, Passionate, Mysterious and Charming, Tough yet soft, Ambitious, typical Scorpio." zh="性情温和，脑袋中无时不刻充斥着奇怪的想法，爱憎分明，典型天蝎气质。" /></p>
                </div>
                <div className={`${CSS['index-about-block']} ${CSS['index-about-work']}`}>
                  <div className={CSS.img}></div>
                  <p><Lan en="Computer & Program fans" zh="与时俱进的电脑迷、程序控" /></p>
                  <p><Lan en="Start Front-End in 2010, move to Chinese biggest IT company Baidu in 2014 to be an excellent Full Stack engineer. Start a new career at Mapbox in 2018 ." zh="2010年接触前端，2010-2014年在上海易班刷了4年副本，2014-2018年混迹于坐标北京百度，2018-今 带着走向世界的梦想在Mapbox打拼" /></p>
                  <p><Lan en="Work with HTML(5), CSS(3), JAVASCRIPT, NODE.JS, PHP, MONGODB, MySQL, DYNAMODB, REDIS, LINUX, AWS, AIRFLOW, PYTHON, etc." zh="已习得技能 HTML(5), CSS(3), JAVASCRIPT, NODE.JS, PHP, PYTHON, MONGODB, DYMANODB, REDIS, AIRFLOW, LINUX等" /></p>
                </div>
                <div className={`${CSS['index-about-block']} ${CSS['index-about-dream']}`}>
                  <div className={CSS.img}></div>
                  <p><Lan en="Arty & Dream follower" zh="文艺的追梦者" /></p>
                  <p><Lan en="Been to Roof of the World Tibet, Dived into the deep sea in Semporna as Advanced Open Water Diver. The South/North Pole, Mount Everest are the places where I muse go by my foot" zh="去过西藏，认为南极、北极、珠峰是有机会一定要去的地方" /></p>
                  <p><Lan en="Dream of opening a coffee shop, decorated with my IT skills, telling my own story of traveling around the world" zh="梦想开间咖啡店，讲述着自己环游世界的见闻" /></p>
                </div>
              </div>
            </section>
            <section className={CSS['index-travel']} style={{ height: isMobile ? 400 : 900 }} id="map" ref={mapRef}>
              <h2><Lan en="Travel around the world" zh="环游世界" /></h2>
              <h3><Lan en="Exploration is one of my life goals and also my belief" zh="探索 -- 是人生目标，也是信仰" /></h3>
              {!mapInteraction && (<div onClick={() => {
                if (isMobile) {
                  setMapInteraction(true)
                }
              }} onDoubleClick={() => {
                setMapInteraction(true)
              }} className={CSS['index-travel-world-mask']}></div>)}
              <div className={CSS['index-travel-world-mask-tips']}>
                {!mapInteraction && (
                  <span className={CSS['index-travel-world-mask-tips-text']} onClick={() => {
                    setMapInteraction(true)
                  }}>
                    <span>
                      <svg className={CSS['svg-animate']} t="1657604976321" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10220" width="20" height="20"><path d="M620.48 933.376l86.144-202.752 206.208 193.344L960 873.6l-206.272-193.344 196.864-99.072L436.16 424.256 620.48 933.376zM485.824 224.256c0 24.832-20.032 44.928-44.8 44.928l0 0c-24.832 0-44.928-20.096-44.928-44.928L396.096 108.864C396.032 84.032 416.128 64 441.024 64l0 0c24.768 0 44.8 20.032 44.8 44.864L485.824 224.256zM310.464 261.312c17.536 17.472 17.536 45.888 0 63.424l0 0c-17.472 17.472-45.952 17.472-63.424 0L165.44 243.136c-17.472-17.472-17.472-45.888 0-63.36l0 0c17.536-17.536 45.952-17.536 63.424 0L310.464 261.312zM555.264 244.352c-17.472 17.536-17.472 45.952 0 63.488l0 0c17.472 17.472 45.952 17.472 63.488 0l81.472-81.6c17.536-17.472 17.536-45.952 0-63.424l0 0c-17.472-17.536-45.888-17.536-63.36 0L555.264 244.352zM224.256 400.768c24.768 0 44.864 20.032 44.864 44.864l0 0c0 24.768-20.032 44.864-44.864 44.864L108.864 490.432C84.032 490.432 64 470.4 64 445.568l0 0c0-24.768 20.032-44.8 44.864-44.8L224.256 400.768 224.256 400.768zM278.208 556.8C295.68 539.328 324.096 539.328 341.632 556.928l0 0c17.536 17.408 17.536 45.888 0.064 63.36l-81.6 81.536c-17.472 17.536-45.952 17.536-63.424 0l0 0c-17.536-17.536-17.536-45.952 0-63.424L278.208 556.8z" p-id="10221" fill="#ffffff"></path></svg>
                    </span>
                    <span>{isMobile ? '点击' : '双击'}地球打开交互</span>
                  </span>
                )}
                {mapInteraction && (
                  <span className={CSS['index-travel-world-mask-tips-text']} onClick={() => {
                    setMapInteraction(false)
                  }}>
                    <svg t="1657605481248" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14304" width="20" height="20"><path d="M512 960c-247.039484 0-448-200.960516-448-448S264.960516 64 512 64 960 264.960516 960 512 759.039484 960 512 960zM512 128.287273c-211.584464 0-383.712727 172.128262-383.712727 383.712727 0 211.551781 172.128262 383.712727 383.712727 383.712727 211.551781 0 383.712727-172.159226 383.712727-383.712727C895.712727 300.415536 723.551781 128.287273 512 128.287273z" p-id="14305" fill="#ffffff"></path><path d="M557.05545 513.376159l138.367639-136.864185c12.576374-12.416396 12.672705-32.671738 0.25631-45.248112s-32.704421-12.672705-45.248112-0.25631l-138.560301 137.024163-136.447897-136.864185c-12.512727-12.512727-32.735385-12.576374-45.248112-0.063647-12.512727 12.480043-12.54369 32.735385-0.063647 45.248112l136.255235 136.671523-137.376804 135.904314c-12.576374 12.447359-12.672705 32.671738-0.25631 45.248112 6.271845 6.335493 14.496116 9.504099 22.751351 9.504099 8.12794 0 16.25588-3.103239 22.496761-9.247789l137.567746-136.064292 138.687596 139.136568c6.240882 6.271845 14.432469 9.407768 22.65674 9.407768 8.191587 0 16.352211-3.135923 22.591372-9.34412 12.512727-12.480043 12.54369-32.704421 0.063647-45.248112L557.05545 513.376159z" p-id="14306" fill="#ffffff"></path></svg>
                    <span>关闭地球交互</span>
                  </span>
                )}
              </div>
              <div className={CSS['index-travel-world']} id="mapbox"></div>
            </section>
            <section className={CSS['index-coffee']}>
              <h2><Lan en="A Dream follower" zh="一个追梦者" /></h2>
              <h3><Lan en="This world , should a coffee shop called mofei" zh="在这个世界上应该有一家叫莫非的咖啡店" /></h3>
              <p><Lan en="I want to have a cafe" zh="我想有家咖啡馆。" /></p>
              <p><Lan en="Do not need too big, every lazy afternoon, you can meet a group of dreamers with dreams" zh="不用很大，慵懒的午后，刚好能容下一群怀揣着梦想的追梦者。" /></p>
              <p><Lan en="Must have pictures, walk in every corner of the coffee shop, always attract by those, careful taste, this is life" zh="要有相片，散步在屋里的各个角落，总能吸引眼球，细细品味，这才是人生。" /></p>
              <p><Lan en="Be sure to have storys, every sunny afternoon, there will always be a wise sharer, telling of his life. Occasionally there will be rose level characters, telling his Titanic" zh="一定要有故事角，每个阳光满满的下午，总会有位睿智的分享者，述说着他生命中的一个可以是平凡，但总是留给人遐想和回味的故事。偶尔还会有rose级别的人物出现，讲述着TA的“泰坦尼克号”。" /></p>
              <p><Lan en="To be warm. When you sad or unhappy, always think of this coffee shop, find a comfortable sofa, taste the grinding of handmade coffee. listening to the story of 'rose', suddenly laughter can not help laughing, and then not Puzzled cover her mouth, in exchange for all the people knowing smile" zh="要温馨，难过或者不开心的时候，总能想到这家咖啡店，找个舒服的沙发，品味现磨的手工咖啡，听着娓娓道来的故事，突然忍俊不禁的笑出声来，然后不好意思的捂上嘴，换来身边所有人的会心一笑。" /></p>
            </section>
            <section className={CSS['index-content']}>
              <h2><Lan en="Contact me" zh="联系我" /></h2>
              <h3><Lan en="If you need, please feel free contact me." zh="如果有任何问题，可以通过这里给我发邮件" /></h3>
              <div className={CSS['index-content-box']}>
                <div className={CSS['index-content-boxblock']}>
                  <div className={CSS['index-content-boxhalf']}>
                    <label>
                      <p><Lan en="Name/Nickname:" zh="昵称/姓名：" /></p>
                      <p>
                        <input id="username" ref={username} />
                      </p>
                    </label>
                  </div>
                  <div className={CSS['index-content-boxhalf']}>
                    <label>
                      <p><Lan en="Contact information" zh="联系方式：" /></p>
                      <p>
                        <input id="email" ref={email} />
                      </p>
                    </label>
                  </div>
                </div>
                <div className={CSS['index-content-message']}>
                  <label>
                    <p><Lan en="Message" zh="内容：" /></p>
                    <p>
                      <textarea id="message" ref={message}></textarea>
                    </p>
                  </label>
                </div>
                <div className={CSS['index-content-btn']}>
                  <button className={CSS['btn']} id="send" ref={sendBtn} onClick={onSendMSG}>
                    {msgState === 1 ? <Lan en="Sending ..." zh="发送中..." /> : msgState === 3 ? <Lan en="Try again" zh="请重试" /> : <Lan en="Send" zh="发送" />}
                  </button>
                </div><span className={CSS['index-content-tips']} id="tips" ref={tips}><Lan en="Message Sended" zh="消息已发送" /> </span>
              </div>
            </section>
            <section className={CSS['index-copyright']}>
              <div className={CSS['index-copyright-top']}></div>
              <div className={CSS['index-copyright-mid']}>
                <div className={CSS['index-copyright-midleft']}></div>
                <div className={CSS['index-copyright-midcenter']}>
                  <Image src={logo} width="412" height={127} />
                </div>
                <div className={CSS['index-copyright-midright']}></div>
              </div>
              <div className={CSS['index-copyright-bottom']}></div>
            </section>
            <Copyright className={CSS.copyright} />
          </div>
        </Layout>
      )}
    </>
  )
}

function stateToProps(state) {
  const lan = state.lan;
  return { lan }
}

export default connect(stateToProps, null)(Home);