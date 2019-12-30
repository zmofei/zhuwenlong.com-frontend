import { NavLink } from "react-router-dom";
import React, { useRef } from "react";
import logo from '../static/img/logo-ico.png'
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
          <NavLink to="/" exact={true} activeClassName={CSS.active} onClick={onClickMenu}>
            <Lan en="Index" zh="首页" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/blog/1" activeClassName={CSS.active} onClick={onClickMenu}>
            <Lan en="Blog" zh="博客" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/lab" activeClassName={CSS.active} onClick={onClickMenu}>
            <Lan en="Lab" zh="实验室" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/message" activeClassName={CSS.active} onClick={onClickMenu}>
            <Lan en="Message" zh="留言" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/links" activeClassName={CSS.active} onClick={onClickMenu}>
            <Lan en="Friends" zh="小伙伴" />
          </NavLink>
        </li>
        <li>
          <NavLink to="#" activeClassName={CSS.active} onClick={() => {
            props.changeLan(props.lan === 'en' ? 'zh' : 'en');
            onClickMenu();
          }}>
            <Lan en="中文" zh="English" />
          </NavLink>
        </li>
        <li>
          <NavLink to={`/rss?lan=${props.lan}`} target="_blank" activeClassName={CSS.active} onClick={onClickMenu}>
            &#xe905;
          </NavLink>
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