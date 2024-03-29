import Link from 'next/link';
import React, { useRef } from "react";
import styles from './nav.module.scss';
import logo from '../public/static/img/logo.png';
import Image from "next/legacy/image"
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
        <div className={styles.log_img}>
          <Image src={logo} width={40} height={40} className="log_img" />
        </div>
        <span>Hi! I'm Mofei!</span>
      </div>
      <button className={styles['global-nav-btn']} id="navTar" onClick={onClickMenu} ref={navBtn} />
      <ul className={styles.nav} ref={navDom} >
        <li>
          <Link
            href="/"
            onClick={onClickMenu}
            className={module === '/' ? styles.active : ''}>
            <Lan en="Index" zh="首页" />
          </Link>
        </li>
        <li>
          <Link
            href="/blog/1"
            onClick={onClickMenu}
            className={module === '/blog' ? styles.active : ''}>
            <Lan en="Blog" zh="博客" />
          </Link>
        </li>
        <li>
          <Link
            href="/lab"
            onClick={onClickMenu}
            className={module === '/lab' ? styles.active : ''}>
            <Lan en="Lab" zh="实验室" />
          </Link>
        </li>
        <li>
          <Link
            href="/message"
            onClick={onClickMenu}
            className={module === '/message' ? styles.active : ''}>
            <Lan en="Message" zh="留言" />
          </Link>
        </li>
        <li>
          <Link
            href="/links"
            onClick={onClickMenu}
            className={module === '/links' ? styles.active : ''}>
            <Lan en="Friends" zh="小伙伴" />
          </Link>
        </li>
        <li>
          <Link
            href="https://fantastical.app/mofei/friend"
            onClick={onClickMenu}
            className={module === '/meet' ? styles.active : ''}>

            <Lan en="Meet Mofei" zh="约我" />

          </Link>
        </li>
        <li>
          <a onClick={() => {
            const newLocation = `https://www.${props.lan !== 'zh' ? 'zhuwenlong.com' : 'himofei.com'}${location.pathname}${location.search}${location.hash}`
            location.href = newLocation
          }}>
            <Lan en="中文" zh="English" />
          </a>
        </li>
        <li>
          <Link href={`/api/rss?lan=${props.lan}`} onClick={onClickMenu} target="_blank"> &#xe905; </Link>
        </li>
      </ul>
    </div >
  );
}


const mapStateToProps = (state) => {
  const lan = state.lan;
  return { lan }
};

const mapDispatchToProps = dispatch => ({
  changeLan: (lan) => {
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