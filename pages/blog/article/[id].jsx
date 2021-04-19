import React, { useEffect, useState, useRef } from "react";
import Link from 'next/link';
import CSS from './article.module.scss';
import fetch from 'isomorphic-unfetch'
import moment from 'moment';
import { useRouter } from 'next/router'
import Layout from '../../../commons/layout';
import lan from '../../../i18n/languagefn.js';
import { connect } from 'react-redux';

import config from '../../../config';

// /static/img/avatar.jpg
import avatra from '../../../public/static/img/avatar.jpg';
import Message from '../../../commons/message.jsx';
import Lan from '../../../i18n/languageMap.jsx';
// import hljs from 'highlight.js';
// import javascript from 'highlight.js/lib/languages/javascript';
import hljs from 'highlight.js';
// import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/vs2015.css';
// hljs.registerLanguage('javascript', javascript);

function Article(props) {
  const router = useRouter();
  const { blog } = props;
  const like = blog.like;

  const [isLike, setIsLike] = useState(false);
  const titleDom = useRef(null);

  useEffect(() => {
    // hljs.registerLanguage('javascript', javascript);
    hljs.highlightAll();
  }, []);

  async function likeArticle(id) {
    if (isLike) return false;
    // 
    await fetch(`${config.dbHost}/api/blog/like/${id}`, {
      method: 'POST',
    })
      .then(() => {
        setIsLike(() => true)
      })
  }

  const zhTtitle = blog.title;
  const enTitle = blog['title-en'] || blog['title'];

  return (
    <Layout
      title={lan(props.lan, { zh: `${zhTtitle} - 朱文龙的自留地`, en: `${enTitle} - Hi! I am Mofei!` })}
      module="/blog"
    >
      <div className={CSS.articleBody}>
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
          {process.browser && <Message id={router.query.id} />}
        </div>
      </section>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
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
