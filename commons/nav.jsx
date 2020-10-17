import Link from 'next/link';
import React, { useRef } from "react";
import styles from './nav.module.scss';
import logo from '../public/static/img/logo.png';

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

  const { module } = props;

  return (
    <div className={`${styles.head} ${(props.path === '/' ? styles.index : styles.dark)}`}>
      <div className={styles.logo}>
        <img src={logo} alt="logo"></img>
        <span>Hi! I'm Mofei!</span>
      </div>
      <button className={styles['global-nav-btn']} id="navTar" onClick={onClickMenu} ref={navBtn} />
      <ul className={styles.nav} ref={navDom} >
        <li>
          <Link href="/" >
            <a onClick={onClickMenu}  >
              <Lan en="Index" zh="首页" className={module === '/' ? styles.active : ''} />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/blog/[page]" as="/blog/1" >
            <a onClick={onClickMenu} className={module === '/blog' ? styles.active : ''}>
              <Lan en="Blog" zh="博客" />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/lab" as="/lab">
            <a onClick={onClickMenu} className={module === '/lab' ? styles.active : ''}>
              <Lan en="Lab" zh="实验室" />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/message" as="/message" >
            <a onClick={onClickMenu} className={module === '/message' ? styles.active : ''}>
              <Lan en="Message" zh="留言" />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/links" as="/links" >
            <a onClick={onClickMenu} className={module === '/links' ? styles.active : ''}>
              <Lan en="Friends" zh="小伙伴" />
            </a>
          </Link>
        </li>
        <li>
          <Link href="#" as="#" >
            <a onClick={() => {
              const targetLan = props.lan === 'en' ? 'zh' : 'en';
              console.log('@changeLan', targetLan);
              props.changeLan(targetLan);
              onClickMenu();
            }}>
              <Lan en="中文" zh="English" />
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/api/rss?lan=${props.lan}`} >
            <a onClick={onClickMenu} target="_blank">
              &#xe905;
            </a>
          </Link>
        </li>
      </ul>
    </div >
  )
}


const mapStateToProps = (state) => {
  console.log('??', state)
  const lan = state.lan;
  return { lan }
};

const mapDispatchToProps = dispatch => ({
  changeLan: (lan) => {
    console.log('changeLan', lan)
    dispatch({
      type: 'SET_LANGUAGE',
      lan
    })
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(nav);