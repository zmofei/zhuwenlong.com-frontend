import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CSS from './blog.module.scss';
import axios from 'axios';
import moment from 'moment';
import Lan from '../i18n/languageMap.jsx';
import Page from '../commons/pageNumber';


let blogReqSource;

function Blog(props) {
  const [tag, setTag] = useState(null);
  const [blogLists, setBlogLists] = useState(null);
  const [page, setPage] = useState({
    current: Number((props.match.params && props.match.params.page) || 1),
    total: 1
  });


  function getSearchObj() {
    const searchObj = {};
    props.location.search.substring(1).split('&').forEach(kv => {
      const kvArr = kv.split('=');
      searchObj[kvArr[0]] = kvArr[1];
    });
    return searchObj;
  }

  useEffect(() => {
    axios.get('/api/blog/tags')
      .then(res => {
        setTag(() => res.data.list);
      });
  }, []);


  useEffect(() => {
    const page = Number(props.match.params.page || 1);

    let { tags } = { ...getSearchObj() };
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    blogReqSource && blogReqSource();

    const CancelToken = axios.CancelToken;

    setBlogLists(() => []);
    axios.get(`/api/blog/lists`, {
      cancelToken: new CancelToken(c => {
        blogReqSource = c;
      }),
      params: {
        page,
        tags
      }
    })
      .then(res => {
        setPage(data => {
          data.total = Math.ceil(res.data.page.count / res.data.page.limit);
          data.current = page;
          return data;
        });
        setBlogLists(() => res.data.list);
      });
  }, [props.match.params.page, props.location.search])


  function getSubNav() {
    if (tag && tag.length > 0) {
      let { tags } = { ...getSearchObj() };
      return tag.map((t, index) => (
        <Link
          className={tags ? Number(tags) === t.classid ? CSS.active : '' : index === 0 ? CSS.active : ''}
          key={t.classid + Math.random()}
          to={{
            pathname: '/blog/1',
            search: t.classid ? `?tags=${t.classid}` : ''
          }} >
          <span className={CSS.subNavIcon}>&#xe901;</span>
          <span><Lan en={t['classname-en'] || t['classname']} zh={t.classname} /></span>
          <span className={CSS.subNavCount}>{t.classcount}</span>
        </Link>
      ))
    } else {
      const placeHoler = new Array(2).fill(0);
      return placeHoler.map((v, index) =>
        <Link key={index} to="#">
          <span className={CSS.placeholdIcon}></span>
          <span className={CSS.placeholdTxt}></span>
          <span className={CSS.placeholdNumber}></span>
        </Link>
      )
    }
  }

  function getBlogClass(classinfo) {
    let { tags } = { ...getSearchObj() };
    tags = (tags || '').split(',').map(t => Number(t));
    if (classinfo.length > 0) {
      return (
        <div className={CSS["blog-tag"]}>&#xe901; Tags: &nbsp;
          {
            classinfo.map(info => (
              info && (
                <Link key={`blogclass_${info.classid}`}
                  to={{
                    pathname: `/blog/1`,
                    search: `?tags=${info.classid}`
                  }}
                  className={tags.indexOf(info.classid) !== -1 ? CSS.active : ''}
                >
                  <Lan en={info['classname-en'] || info['classname']} zh={info.classname} />
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
      return blogLists.map(blog => (
        <div key={`blog_${blog._id}`} className={CSS["blog-content-block"]}>
          <div className={`${CSS["blog-content-text"]} ${CSS["noimg"]}`}>
            <Link
              to={{
                pathname: `/blog/article/${blog._id}`,
              }}
            >
              <h2><Lan en={blog['title-en'] || blog['title']} zh={blog.title} /></h2>
            </Link>
            {getBlogClass(blog.classid)}
            <Link
              to={{
                pathname: `/blog/article/5c36ba26b95a0e17952cffd6`,
              }}
            >
              <div className={CSS["blog-review"]}>
                <Lan en={blog['contentEn'] || blog['content']} zh={blog.content} />...
              </div>
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
    <div className={CSS.blogBody}>
      <div className={CSS.blogContent}>
        <div className={CSS.subNav}>
          {getSubNav(tag)}
        </div>
        <div>
          {getBlogLists()}
        </div>
        <div className={CSS['blog-pages']}>
          {page.total > 1 ? <Page
            total={page.total}
            current={page.current}
            bacicPath='/blog'
            search={(getSearchObj().tags ? `?tags=${getSearchObj().tags}` : '')}
          /> : ''}

        </div>
      </div>
    </div>
  )
}

export default Blog;