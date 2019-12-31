import React, { useEffect, useState } from "react";
import Link from 'next/link';
import CSS from './blog.module.scss';
import axios from 'axios';
import moment from 'moment';
import Lan from '../../i18n/languageMap.jsx';
import Page from '../../commons/pageNumber';
import { useRouter } from 'next/router'
import Layout from '../../commons/layout';

let blogReqSource;

function Blog(props) {
  const router = useRouter();
  let currentPage = Number(router.query.page || 1);

  const [tag, setTag] = useState(null);
  const [blogLists, setBlogLists] = useState([]);
  const [page, setPage] = useState({
    current: currentPage,
    total: 1
  });

  function getSearchObj() {
    const searchObj = {};
    location.search.substring(1).split('&').forEach(kv => {
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

    const page = currentPage;


    let { tags } = { ...getSearchObj() };
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    blogReqSource && blogReqSource();

    const CancelToken = axios.CancelToken;

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
        setBlogLists(() => res.data.list);
        setPage(data => {
          data.total = Math.ceil(res.data.page.count / res.data.page.limit);
          data.current = page;
          return data;
        });

      });
  }, [currentPage])


  function getSubNav() {
    if (tag && tag.length > 0) {
      let { tags } = { ...getSearchObj() };
      return tag.map((t, index) => (
        <Link
          key={t.classid + Math.random()}
          href="/blog/[page]"
          as={'/blog/1' + (t.classid ? `?tags=${t.classid}` : '')} >
          <a className={tags ? Number(tags) === t.classid ? CSS.active : '' : index === 0 ? CSS.active : ''}>
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
    let { tags } = { ...getSearchObj() };
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
      return blogLists.map(blog => (
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

  console.log(page.total)

  return (
    <Layout>
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
              key={page.total}
              total={page.total}
              current={page.current}
              bacicPath='/blog'
              search={(getSearchObj().tags ? `?tags=${getSearchObj().tags}` : '')}
            /> : ''}
          </div>
        </div>
      </div>
    </Layout>
  )
}

Blog.getInitialProps = async (ctx) => {
  console.log(12);
  return {
    a: 1
  }
};

export default Blog;