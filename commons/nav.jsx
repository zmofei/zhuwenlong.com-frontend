import Link from 'next/link';
import React, { useRef } from "react";
import CSS from './nav.scss';
import logo from '../public/static/img/logo-ico.png';

import Lan from '../i18n/languageMap.jsx';
import { connect } from 'react-redux';

function nav(props) {
  const navDom = useRef(null);
  const navBtn = useRef(null);
  const onClickMenu = () => {
    if (getComputedStyle(navBtn.current).display === 'block') {
      navDom.current.style.display = getComputedStyle(navDom.current).display === 'none' ? 'block' : 'none';
    }
  }

  return (
    <div className={`${CSS.head} ${(props.path === '/' ? CSS.index : CSS.dark)}`}>
      <div className={CSS.logo}>
        <img src={logo} alt="logo"></img>
        <span>Hi! I'm Mofei!</span>
      </div>
      <button className={CSS['global-nav-btn']} id="navTar" onClick={onClickMenu} ref={navBtn} />
      <ul className={CSS.nav} ref={navDom} >
        <li>
          <Link href="/" >
            <a onClick={onClickMenu}>
              <Lan en="Index" zh="首页" />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/blog/[page]" as="/blog/1">
            <a onClick={onClickMenu}>
              <Lan en="Blog" zh="博客" />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/lab" as="/lab">
            <a onClick={onClickMenu}>
              <Lan en="Lab" zh="实验室" />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/message" as="/message" >
            <a onClick={onClickMenu}>
              <Lan en="Message" zh="留言" />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/links" as="/links">
            <a onClick={onClickMenu}>
              <Lan en="Friends" zh="小伙伴" />
            </a>
          </Link>
        </li>
        <li>
          <Link href="#" as="#" >
            <a onClick={() => {
              props.changeLan(props.lan === 'en' ? 'zh' : 'en');
              onClickMenu();
            }}>
              <Lan en="中文" zh="English" />
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/rss?lan=${props.lan}`} >
            <a onClick={onClickMenu} target="_blank">
              &#xe905;
            </a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

const mapStateToProps = ({ lan }) => ({
  lan
});

const mapDispatchToProps = dispatch => ({
  changeLan: lan => dispatch({
    type: 'SET_LANGUAGE',
    lan
  })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(nav);