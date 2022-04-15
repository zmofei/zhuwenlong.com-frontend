import React, { useEffect, useState, useRef } from "react";
import Link from 'next/link';
import CSS from './article.module.scss';
import fetch from 'isomorphic-unfetch'
import moment from 'moment';
import { useRouter } from 'next/router'
import Layout from '../../../commons/layout';
import lan from '../../../i18n/languagefn.js';
import { connect } from 'react-redux';
import Cookie from 'js-cookie';

import config from '../../../config';

import avatra from '../../../public/static/img/avatar.jpg';
import Message from '../../../commons/message.jsx';
import Lan from '../../../i18n/languageMap.jsx';
const hljs = require('highlight.js/lib/core');
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
hljs.registerLanguage('python', require('highlight.js/lib/languages/python'));
hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'));
hljs.registerLanguage('scss', require('highlight.js/lib/languages/scss'));
hljs.registerLanguage('css', require('highlight.js/lib/languages/css'));
hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'));
hljs.registerLanguage('json', require('highlight.js/lib/languages/json'));
hljs.registerLanguage('php', require('highlight.js/lib/languages/php'));
hljs.registerLanguage('sql', require('highlight.js/lib/languages/sql'));
hljs.registerLanguage('typescript', require('highlight.js/lib/languages/typescript'));
hljs.registerLanguage('htmlbars', require('highlight.js/lib/languages/htmlbars'));

function Article(props) {
  const router = useRouter();
  const blogId = router.query.id;
  const [blog, setBlog] = useState(props.blog);
  const [likeAnimation, setLikeAnimation] = useState(false);

  const initLikeCount = Number(Cookie.get(`article-${blogId}-like`) || 0)
  const [isLike, setIsLike] = useState(false);
  const [selfLikeCount, setSelfLikecount] = useState(0);
  const [renderMessage, setRenderMessage] = useState(false);
  const [remindReadPercentage, setRemindReadPercentage] = useState(100);

  const titleDom = useRef(null);
  const articleBox = useRef(null);



  useEffect(() => {
    setIsLike(initLikeCount > 0);
    setSelfLikecount(initLikeCount);
    setRenderMessage(true);
    hljs.highlightAll();


    // 
    const articleScrollAbleHeight = articleBox.current.scrollHeight - window.innerHeight;
    const undateScroll = () => {
      const currentProgress = window.scrollY;
      const precent = Math.min(1, currentProgress / articleScrollAbleHeight);
      setRemindReadPercentage((1 - precent) * 100)
    }
    window.addEventListener('scroll', undateScroll)

    // 

    return () => {
      window.removeEventListener('scroll', undateScroll)
    }
  }, []);

  async function likeArticle(id) {
    if (likeAnimation) return false;

    // 
    setIsLike(() => true)
    const oldBlog = { ...blog }
    oldBlog.like += 1
    setBlog(oldBlog)

    setLikeAnimation(() => true)
    setTimeout(() => {
      setLikeAnimation(() => false)
    }, 1000)

    //
    if (selfLikeCount < 10) {
      setSelfLikecount(selfLikeCount + 1)
      await fetch(`${config.dbHost}/api/blog/like/${id}`, {
        method: 'POST',
      });

      Cookie.set(`article-${blogId}-like`, selfLikeCount + 1, { expires: 999999 })
    }

  }

  const zhTtitle = blog.title;
  const enTitle = blog['title-en'] || blog['title'];

  return (
    <Layout
      title={lan(props.lan, { zh: `${zhTtitle} - 朱文龙的自留地`, en: `${enTitle} - Hi! I am Mofei!` })}
      module="/blog"
    >
      <div className={CSS.articleBody} ref={articleBox} >
        <div className={CSS.readBar} style={{ transform: `translate(-${remindReadPercentage}%, 0)` }}></div>
        <section className={CSS.blog}>
          <section className={CSS.article}>
            <section className={CSS["article-content"]}>
              <h1 ref={titleDom}>
                <Lan en={enTitle} zh={blog.title} />
              </h1>
              <div className={`${CSS["commend-user"]} ${CSS["article-pubinfo"]}`}>
                <div className={CSS["commend-avatar"]}><img src={avatra} alt="avatar" /></div>
                <div className={CSS["commend-info"]}>
                  <div className={CSS["commend-name"]}>
                    <Link href="/">
                      <a>Mofei Zhu</a>
                    </Link>
                  </div>
                  <div className={CSS["commend-time"]}>
                    <time>{moment(blog.pubtime).format('YYYY-MM-DD HH:mm:ss')}</time>
                  </div>
                </div>
              </div>
              <div className={CSS["blog-content"]}>
                <Lan
                  en={<div dangerouslySetInnerHTML={{ __html: blog['html-en'] || blog.html }} />}
                  zh={<div dangerouslySetInnerHTML={{ __html: blog.html }} />} />
              </div>
            </section>
            <section className={CSS["article-tags"]}>
              {blog.classid && blog.classid.map(klass => <Link key={`class_${klass.classid}`}
                href={`/blog/1?tags=${klass.classid}`}
              >
                <a>
                  <Lan en={klass['classname-en'] || klass['classname']} zh={klass.classname} />
                </a>
              </Link>)}
            </section>
            <section className={CSS["article-info"]}>
              <div className={CSS["article-fns"]}>
                {typeof window !== undefined && <button
                  className={`${CSS["like-btn"]} ${(likeAnimation ? CSS["like-btn-do-anim"] : '')} ${(isLike ? CSS["like-btn-active"] : '')}`}
                  onClick={() => { likeArticle(blog._id) }}>
                  <span className={CSS["like-btn-icon"]}>&#xe903;</span>
                  <div className={CSS["like-btn-selflikecount"]}>
                    +{selfLikeCount}
                  </div>
                  <div className={CSS["like-btn-animation"]}>
                    <span className={CSS["like-btn-animation-item"]}></span>
                    <span className={CSS["like-btn-animation-item"]}></span>
                    <span className={CSS["like-btn-animation-item"]}></span>
                    <span className={CSS["like-btn-animation-item"]}></span>
                    <span className={CSS["like-btn-animation-item"]}></span>
                    <span className={CSS["like-btn-animation-item"]}></span>
                    <span className={CSS["like-btn-animation-item"]}></span>
                    <span className={CSS["like-btn-animation-item"]}></span>
                  </div>
                </button>}
              </div>
              <div className={CSS["article-info-count"]}>
                <span className={CSS["article-info-icon"]}>&#xe900;</span>
                <span>{blog.visited}</span>
                <span className={CSS["article-info-icon"]}>&nbsp;&#xe903;</span>
                <span className={CSS["count"]} id="goodCount">{blog.like}</span>
                <span className={CSS["article-info-icon"]}>&nbsp;&#xe902;</span>
                <span>{blog.comment}</span>
              </div>
            </section>
          </section>
        </section>
      </div>
      <section className={CSS.message}>
        <div className={CSS.messageBox}>
          {renderMessage && <Message id={router.query.id} />}
        </div>
      </section>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  if (!id) {
    return {
      notFound: true,
    }
  }
  const res = await fetch(`${config.dbHost}/api/blog/article/${id}`)
    .then(r => r.json())
  return { props: { blog: res.data } }
}

const mapStateToProps = state => {
  return { lan: state.lan };
};

export default connect(
  mapStateToProps
)(Article);
