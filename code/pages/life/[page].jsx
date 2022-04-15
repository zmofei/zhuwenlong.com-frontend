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
  const router = useRouter();
  let currentPage = Number(router.query.page || 1);
  const [tags, setTags] = useState(props.data.tags);
  const [blogLists, setBlogLists] = useState(props.data.blogLists);
  const [page, setPage] = useState(props.data.page);
  const [pagetotal, setPagetotal] = useState(props.data.pagetotal);
  const [currentTag, setCurrentTag] = useState(props.data.currentTag);

  useEffect(() => {
    fetch(`${config.dbHost}/api/blog/tags`)
      .then(r => r.json())
      .then(res => {
        setTags(res.list)
      });
  }, [currentTag]);

  useEffect(() => {
    const page = currentPage || 1;

    blogReqSource && blogReqSource();

    fetch(`${config.dbHost}/api/blog/lists?page=${page || 1}&tags=${currentTag ? currentTag : ''}&pagesize=12`)
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
    if (tags && tags.length > 0) {
      return tags.map((t, index) => (
        <Link
          key={t.classid + Math.random()}
          href={'/blog/1' + (t.classid ? `?tags=${t.classid}` : '')}
        >
          <a
            className={currentTag ? Number(currentTag) === t.classid ? CSS.active : '' : index === 0 ? CSS.active : ''}
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
    if (classinfo && classinfo.length > 0) {
      return (
        <div className={CSS["blog-tag"]}>
          {
            classinfo.map(info => (
              info && (
                <Link key={`blogclass_${info.classid}`}
                  href={`/blog/1?tags=${info.classid}`}
                >
                  <a onClick={
                    () => {
                      setCurrentTag(info.classid);
                    }
                  }>
                    <Lan en={info['classname-en'] || info['classname']} zh={info.classname} />
                  </a>
                </Link>
              )
            ))
          }
        </div >
      )
    } else {
      return '';
    }
  }

  function getBlogLists() {
    if (blogLists && blogLists.length > 0) {
      const blogDom = blogLists.map(blog => (
        <div key={`blog_${blog._id}`} className={CSS[`blog-block`]}>
          <Link
            href={`/blog/article/${blog._id}`}
            passHref
          >
            <div className={CSS['blog-cover']}>
              <iframe src="//player.bilibili.com/player.html?aid=467256321&bvid=BV1TL411P7Y5&cid=549928159&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowFullScreen="true"> </iframe>
            </div>
          </Link>
          {getBlogClass(blog.classid)}
          <Link
            href={`/blog/article/${blog._id}`}
            passHref
          >
            <iframe src="//player.bilibili.com/player.html?aid=467256321&bvid=BV1TL411P7Y5&cid=549928159&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowFullScreen="true"> </iframe>
          </Link>
          {/* <div>
            
          </div> */}
          <div className={CSS["blog-info"]}>
            <div className={CSS["blog-time"]}>
              <span>&#xe904;</span>
              <span title={moment(blog.pubtime).format('YYYY-MM-DD HH:mm:ss')}>
                {new Date() - new Date(blog.pubtime) > 1000 * 3600 * 24 * 365 ? moment(blog.pubtime).format('YYYY-MM-DD') : moment(blog.pubtime).fromNow()}
              </span>
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
      ));
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
      title={lan(props.lan, { 'zh': "我的世界 - 朱文龙(Mofei)的自留地", 'en': 'Life - Hi! I am Mofei!' })}
      module="/life"
    >
      <div className={CSS.blogBody}>
        <div className={CSS.blogContent}>
          <div className={CSS.subNav}>
            {getSubNav()}
          </div>
          <div className={CSS['blog-list']}>
            {getBlogLists()}
          </div>


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
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const page = ctx.query.page || 1;
  const currentTag = ctx.query.tags;
  const ret = {}
  await Promise.all([
    fetch(`${config.dbHost}/api/blog/tags`),
    fetch(`${config.dbHost}/api/blog/lists?page=${page || 1}&tags=${currentTag ? currentTag : ''}&pagesize=12`)
  ]).then(([tags, lists]) => {
    return Promise.all([tags.json(), lists.json()]);
  }).then(([tags, lists]) => {
    ret.tags = tags.list;
    ret.blogLists = lists.list;
    ret.pagetotal = Math.ceil(lists.page.count / lists.page.limit);
    ret.page = page;
  }).catch((e) => {
    console.log('error', e.message)
  });
  return { props: { data: { ...ret, currentTag: ctx.query.tags || '' } } }
}

function stateToProps(state) {
  const lan = state.lan;
  return { lan }
}

export default connect(stateToProps, null)(Blog);