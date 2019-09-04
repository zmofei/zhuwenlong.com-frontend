import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import CSS from './article.module.scss';
import axios from 'axios';
import moment from 'moment';

import avatra from '../static/img/avatar.jpg';
import blogMoney from '../static/img/blog/money.png';
import Message from '../commons/message.jsx';
import Lan from '../i18n/languageMap.jsx';
import Adsense from '../commons/googleAds.jsx';
import hljs from 'highlight.js';

const oldTitle = document.title;
function Article(props) {
  const id = props.match.params.id;
  const [blog, setBlog] = useState(null);
  const [like, setLike] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const titleDom = useRef(null);

  useEffect(() => {
    // Update the document title using the browser API
    const H1Txt = (titleDom && titleDom.current && titleDom.current.innerText);
    document.title = H1Txt ? (H1Txt + ' - ' + oldTitle) : oldTitle;
    return () => {
      document.title = oldTitle;
    }
  });
  useEffect(() => {
    hljs.initHighlightingOnLoad();
    axios.get(`/api/blog/article/${id}`)
      .then(res => {
        setBlog(() => {
          return res.data.data;
        })
        setLike(() => {
          return res.data.data.like
        })
      })
  }, [])

  function likeArticle(id) {
    if (isLike) return false;
    axios.post(`/api/blog/like/${id}`)
      .then(res => {
        setLike(like => {
          return like += 1;
        })

        setIsLike(() => true)
      })
  }

  function getBlog() {
    if (blog) {
      return (
        <>
          <div className={CSS.articleBody}>
            <section className={CSS.blog}>
              <section className={CSS.article}>
                <section className={CSS["article-content"]}>
                  <h1 ref={titleDom}>
                    <Lan en={blog['title-en'] || blog['title']} zh={blog.title} />
                  </h1>
                  <div className={`${CSS["commend-user"]} ${CSS["article-pubinfo"]}`}>
                    <div className={CSS["commend-avatar"]}><img src={avatra} alt="avatar" /></div>
                    <div className={CSS["commend-info"]}>
                      <div className={CSS["commend-name"]}>
                        <Link to="/">Mofei Zhu </Link>
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
                    <div className={CSS["blog-money"]}>
                      {/* <img src={blogMoney} alt="sponsorship" /> */}
                    </div>
                    <Adsense />
                  </div>
                </section>
                <section className={CSS["article-tags"]}>
                  {blog.classid.map(klass => <Link key={`class_${klass.classid}`} to={{
                    pathname: `/blog/1`,
                    search: `?tags=${klass.classid}`
                  }}
                  >
                    <Lan en={klass['classname-en'] || klass['classname']} zh={klass.classname} />
                  </Link>)}
                </section>
                <section className={CSS["article-info"]}>
                  <div className={CSS["article-fns"]}>
                    <div
                      className={`${CSS["article-info-makegood"]} ${CSS["article-fns-block"]} ${isLike ? CSS.active : ''}`}
                      onClick={() => { likeArticle(blog._id) }}>&#xe903;</div>
                  </div>
                  <span className={CSS["article-info-icon"]}>&#xe900;</span>
                  <span>{blog.visited}</span>
                  <span className={CSS["article-info-icon"]}>&nbsp;&#xe903;</span>
                  <span className={CSS["count"]} id="goodCount">{like}</span>
                  <span className={CSS["article-info-icon"]}>&nbsp;&#xe902;</span>
                  <span>{blog.comment}</span>

                </section>
              </section>
            </section>
          </div>
          <section className={CSS.message}>
            <div className={CSS.messageBox}>
              <Message id={id} />
            </div>
          </section>
        </>
      )
    } else {
      return ''
    }
  }

  return getBlog();
}

export default Article;