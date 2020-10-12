import React, { useEffect, useState } from "react";
import Link from 'next/link';
import CSS from './blog.module.scss';
import moment from 'moment';
import Lan from '../../i18n/languageMap.jsx';
import lan from '../../i18n/languagefn.js';
import Page from '../../commons/pageNumber';
import { useRouter } from 'next/router'
import Layout from '../../commons/layout';
import fetch from 'isomorphic-unfetch';
import { connect } from 'react-redux';
import AdSense from 'react-adsense';

import config from '../../config';

let blogReqSource;

function getSearchObj(router) {
  const search = router.asPath.split('?');
  let searchStr = '';
  if (search.length >= 2) {
    searchStr = search[1];
  }
  const searchObj = {};
  searchStr.split('&').forEach(kv => {
    const kvArr = kv.split('=');
    searchObj[kvArr[0]] = kvArr[1];
  });
  return searchObj;
}

function Blog(props) {
  // console.log(2)
  const router = useRouter();
  let currentPage = Number(router.query.page || 1);

  const tag = props.tags;

  const [blogLists, setBlogLists] = useState(props.blogLists);
  const [page, setPage] = useState(props.page);
  const [pagetotal, setPagetotal] = useState(props.pagetotal);



  const [currentTag, setCurrentTag] = useState(getSearchObj(router).tags);


  useEffect(() => {
    const page = currentPage || 1;

    blogReqSource && blogReqSource();

    fetch(`${config.dbHost}/api/blog/lists?page=${page || 1}&tags=${currentTag ? currentTag : ''}`)
      .then(r => r.json())
      .then(res => {
        setBlogLists(() => res.list);
        setPagetotal(() => Math.ceil(res.page.count / res.page.limit));
        setPage(() => page);
      });

    // scroll to top
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [currentPage, currentTag])


  function getSubNav() {
    if (tag && tag.length > 0) {
      let { tags } = { ...getSearchObj(router) };
      return tag.map((t, index) => (
        <Link
          key={t.classid + Math.random()}
          href="/blog/[page]"
          as={'/blog/1' + (t.classid ? `?tags=${t.classid}` : '')}
        >
          <a
            className={tags ? Number(tags) === t.classid ? CSS.active : '' : index === 0 ? CSS.active : ''}
            onClick={() => {
              setCurrentTag(t.classid);
            }}
          >
            <span className={CSS.subNavIcon}>&#xe901;</span>
            <span><Lan en={t['classname-en'] || t['classname']} zh={t.classname} /></span>
            <span className={CSS.subNavCount}>{t.classcount}</span>
          </a>
        </Link>
      ))
    } else {
      const placeHoler = new Array(2).fill(0);
      return placeHoler.map((v, index) =>
        <Link key={index} href="#">
          <a>
            <span className={CSS.placeholdIcon}></span>
            <span className={CSS.placeholdTxt}></span>
            <span className={CSS.placeholdNumber}></span>
          </a>
        </Link>
      )
    }
  }

  function getBlogClass(classinfo) {
    let { tags } = { ...getSearchObj(router) };
    tags = (tags || '').split(',').map(t => Number(t));
    if (classinfo.length > 0) {
      return (
        <div className={CSS["blog-tag"]}>&#xe901; Tags: &nbsp;
          {
            classinfo.map(info => (
              info && (
                <Link key={`blogclass_${info.classid}`}
                  href={`/blog/[page]`}
                  as={`/blog/1?tags=${info.classid}`}
                >
                  <a>
                    <Lan en={info['classname-en'] || info['classname']} zh={info.classname} />
                  </a>
                </Link>
              )
            ))
          }
        </div>
      )
    } else {
      return '';
    }
  }

  function getBlogLists() {
    if (blogLists && blogLists.length > 0) {
      const blogDom = blogLists.map(blog => (
        <div key={`blog_${blog._id}`} className={CSS["blog-content-block"]}>
          <div className={`${CSS["blog-content-text"]} ${CSS["noimg"]}`}>
            <Link
              href={`/blog/article/[id]`}
              as={`/blog/article/${blog._id}`}
            >
              <a>
                <h2><Lan en={blog['title-en'] || blog['title']} zh={blog.title} /></h2>
              </a>
            </Link>
            {getBlogClass(blog.classid)}
            <Link
              href={`/blog/article/[id]`}
              as={`/blog/article/${blog._id}`}
            >
              <a>
                <div className={CSS["blog-review"]}>
                  <Lan en={blog['contentEn'] || blog['content']} zh={blog.content} />...
                </div>
              </a>
            </Link>
            <div className={CSS["blog-info"]}>
              <div className={CSS["blog-time"]}>
                <span>&#xe904;</span>
                <span>{moment(blog.pubtime).format('YYYY-MM-DD HH:mm:ss')}</span>
              </div>
              <div className={CSS["blog-read"]}>
                <span>&#xe900; </span>
                <span>{blog.visited} </span>
                <span>&#xe903; </span>
                <span>{blog.like} </span>
                <span>&#xe902; </span>
                <span>{blog.comment}</span>
              </div>
            </div>
          </div>
        </div>
      ));

      // if (process.browser) {
      //   if (blogDom.length >= 5) {
      //     blogDom.splice(5, 0, <AdSense.Google
      //       style={{ display: 'block' }}
      //       format='fluid'
      //       layoutKey='-ft-1y+18-2v+e1'
      //       client='ca-pub-0645475852185063'
      //       slot='7192293841'
      //     />)
      //   }
      //   if (blogDom.length >= 11) {
      //     blogDom.splice(11, 0, <AdSense.Google
      //       style={{ display: 'block' }}
      //       format='fluid'
      //       layoutKey='-ft-1y+18-2v+e1'
      //       client='ca-pub-0645475852185063'
      //       slot='7192293841'
      //     />)
      //   }
      // }


      return blogDom;
    } else {
      return new Array(3).fill(0).map((v, i) => (
        <div key={i} className={`${CSS["blog-content-block"]} ${CSS.blogPlaceHolder}`}>
          <div className={`${CSS["blog-content-text"]} ${CSS["noimg"]}`}>
            <h2 />
            <div className={CSS['blog-tag']}>
              <span className={CSS.tags}></span>
              <span className={CSS.tagsName}></span>
              <span className={CSS.tagsType}></span>
            </div>

            <div >
              <span className={CSS.reviewBlock}></span>
              <span className={CSS.reviewBlock}></span>
              <span className={CSS.reviewBlock}></span>
            </div>

            <div className={CSS["blog-info"]}>
              <div className={CSS["blog-time"]}>
                <span className={CSS.tags}></span>
              </div>
              <div className={CSS["blog-read"]}>
                <span className={CSS.tags}></span>
              </div>
            </div>
          </div>
        </div>
      ))
    }
  }

  return (
    <Layout
      title={lan(props.lan, { 'zh': "博客 - 朱文龙(Mofei)的自留地", 'en': 'Blog - Hi! I am Mofei!' })}
      module="/blog"
    >
      <div className={CSS.blogBody}>
        <div className={CSS.blogContent}>
          <div className={CSS.subNav}>
            {getSubNav(tag)}
          </div>
          <div>
            {getBlogLists()}
          </div>

          <div className={CSS['blog-pages']}>
            <Page
              key={pagetotal}
              total={pagetotal}
              current={page}
              bacicPath='/blog'
              file={router.route}
              search={(getSearchObj(router).tags ? `?tags=${getSearchObj(router).tags}` : '')}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

Blog.getInitialProps = async (ctx) => {
  // const 
  const page = ctx.query.page || 1;
  const currentTag = getSearchObj(ctx).tags;

  const ret = {}
  await Promise.all([
    fetch(`${config.dbHost}/api/blog/tags`),
    fetch(`${config.dbHost}/api/blog/lists?page=${page || 1}&tags=${currentTag ? currentTag : ''}`)
  ]).then(([tags, lists]) => {
    return Promise.all([tags.json(), lists.json()])
  }).then(([tags, lists]) => {
    ret.tags = tags.list;
    ret.blogLists = lists.list;
    ret.pagetotal = Math.ceil(lists.page.count / lists.page.limit);
    ret.page = page;
  }).catch((e) => {
    console.log('error', e.message)
  });
  return ret;
};

function stateToProps(state) {
  const lan = state.lan;
  return { lan }
}

export default connect(stateToProps, null)(Blog);