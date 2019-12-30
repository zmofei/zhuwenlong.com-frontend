import React from "react";
import { Link } from "react-router-dom";
import Lan from '../i18n/languageMap.jsx';
import CSS from './pageNumber.module.scss';


function changePage(page, cb) {
  cb && cb(page)
}

function pageNumber(props) {
  const pageArr = [];
  const bacicPath = props.bacicPath;
  const search = props.search || '';
  const start = Math.max(1, props.current - 2);
  const end = Math.min(props.total, props.current + 2);
  const isSearch = props.type === 'search';

  for (let i = start; i <= end; i++) {
    const searchStr = isSearch ? `${search ? (search + '&') : '?'}page=${i}` : search;
    pageArr.push(
      <Link key={`page_${i}`}
        to={{
          pathname: isSearch ? '' : `${bacicPath}/${i}`,
          search: searchStr,
        }}
        onClick={() => { changePage(i, props.pageChange) }}
        className={i === props.current ? CSS.active : ''}  >{i}</Link>
    )
  }
  return (
    <div className={CSS['blog-pages']}>
      {props.current > 1 ?
        (<Link
          to={{
            pathname: isSearch ? '' : `${bacicPath}/${props.current - 1}`,
            search: isSearch ? `${search ? (search + '&') : '?'}page=${props.current - 1}` : search,
          }}
          onClick={() => { changePage(props.current - 1, props.pageChange) }}
        >
          <Lan en="Previous" zh="上一页" />
        </Link>) : ''}
      {props.current > 3 ? (
        <>
          <Link
            to={{
              pathname: isSearch ? '' : `${bacicPath}/1`,
              search: isSearch ? `${search ? (search + '&') : '?'}page=1` : search,
            }}
            onClick={() => { changePage(1, props.pageChange) }}
            className={`${bacicPath}/1`}>
            1
          </Link>
          <span>...</span>
        </>
      ) : ''}
      {pageArr}
      {props.total - props.current > 3 ? <span>...</span> : ''}
      {props.current < props.total - 3 ? (
        <Link
          to={{
            pathname: isSearch ? '' : `${bacicPath}/${props.total}`,
            search: isSearch ? `${search ? (search + '&') : '?'}page=${props.total}` : search,
          }}
          onClick={() => { changePage(props.total, props.pageChange) }}
        >{props.total}</Link>
      ) : ''}
      {props.current < props.total ? (
        <Link
          to={{
            pathname: isSearch ? '' : `${bacicPath}/${props.current + 1}`,
            search: isSearch ? `${search ? (search + '&') : '?'}page=${props.current + 1}` : search,
          }}
          onClick={() => { changePage(props.current + 1, props.pageChange) }}
        >
          <Lan en="Next" zh="下一页" />
        </Link>
      ) : ''}
    </div>
  )
}

export default pageNumber;