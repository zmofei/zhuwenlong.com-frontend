import Link from 'next/link';
import Lan from '../i18n/languageMap.jsx';
import CSS from './pageNumber.module.scss';


function changePage(page, cb) {
  cb && cb(page)
}

function pageNumber(props) {
  const pageArr = [];
  const bacicPath = props.bacicPath;
  const filePath = props.file || bacicPath;
  const search = props.search || '';
  const start = Math.max(1, props.current - 2);
  const end = Math.min(props.total, props.current + 2);
  const isSearch = props.type === 'search';

  for (let i = start; i <= end; i++) {
    const searchStr = isSearch ? `${search ? (search + '&') : '?'}page=${i}` : search;
    const routerAs = (isSearch ? '' : `${bacicPath}/${i}`) + searchStr;
    pageArr.push(
      <Link key={`page_${i}`}
        href={routerAs}
      >
        <a onClick={() => { changePage(i, props.pageChange) }}
          className={i === props.current ? CSS.active : ''}  >{i}</a>
      </Link>
    )
  };

  return (
    <div className={CSS['blog-pages']}>
      {props.current > 1 ?
        (<Link
          href={(isSearch ? '' : `${bacicPath}/${props.current - 1}`) + (isSearch ? `${search ? (search + '&') : '?'}page=${props.current - 1}` : search)}
        >
          <a onClick={() => { changePage(props.current - 1, props.pageChange) }}>
            <Lan en="Previous" zh="上一页" />
          </a>
        </Link>) : ''}
      {props.current > 3 ? (
        <>
          <Link
            href={(isSearch ? '' : `${bacicPath}/1`) + (isSearch ? `${search ? (search + '&') : '?'}page=1` : search)}
          >
            <a onClick={() => { changePage(1, props.pageChange) }}
              className={`${bacicPath}/1`}>
              1
            </a>
          </Link>
          <span>...</span>
        </>
      ) : ''}
      {pageArr}
      {props.total - props.current > 3 ? <span>...</span> : ''}
      {props.current < props.total - 3 ? (
        <Link
          href={(isSearch ? '' : `${bacicPath}/${props.total}`) + (isSearch ? `${search ? (search + '&') : '?'}page=${props.total}` : search)}
        >
          <a onClick={() => { changePage(props.total, props.pageChange) }} >
            {props.total}
          </a>
        </Link>
      ) : ''}
      {props.current < props.total ? (
        <Link
          href={(isSearch ? '' : `${bacicPath}/${props.current + 1}`) + (isSearch ? `${search ? (search + '&') : '?'}page=${props.current + 1}` : search)}
        >
          <a onClick={() => { changePage(props.current + 1, props.pageChange) }}>
            <Lan en="Next" zh="下一页" />
          </a>
        </Link>
      ) : ''}
    </div>
  )
}

export default pageNumber;