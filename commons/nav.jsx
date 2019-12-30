// import { Link } from "react-router-dom";
import Link from 'next/link';
import React, { useRef } from "react";
import logo from '../public/static/img/logo-ico.png'
import CSS from './nav.module.scss'
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
          <Link href="/" activeClassName={CSS.active} onClick={onClickMenu}>
            <a>
              <Lan en="Index" zh="首页" />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/blog/1" activeClassName={CSS.active} onClick={onClickMenu}>
            <a>
              <Lan en="Blog" zh="博客" />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/lab" activeClassName={CSS.active} onClick={onClickMenu}>
            <a>
              <Lan en="Lab" zh="实验室" />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/message" activeClassName={CSS.active} onClick={onClickMenu}>
            <a>
              <Lan en="Message" zh="留言" />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/links" activeClassName={CSS.active} onClick={onClickMenu}>
            <a>
              <Lan en="Friends" zh="小伙伴" />
            </a>
          </Link>
        </li>
        <li>
          <Link href="#" activeClassName={CSS.active} onClick={() => {
            props.changeLan(props.lan === 'en' ? 'zh' : 'en');
            onClickMenu();
          }}>
            <a>
              <Lan en="中文" zh="English" />
            </a>
          </Link>
        </li>
        <li>
          <Link to={`/rss?lan=${props.lan}`} target="_blank" activeClassName={CSS.active} onClick={onClickMenu}>
            &#xe905;
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