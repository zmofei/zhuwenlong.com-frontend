/* global gtag */

import React from "react";
import { BrowserRouter, StaticRouter, Route } from "react-router-dom";
import Nav from './commons/nav';
import Home from './home/home';
import Blog from './blog/blog';
import Article from './blog/article';
import Lab from './lab/lab';
import Links from './links/links';
import Message from './message/message';
import Copyright from './commons/copyright';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import CSS from './App.module.scss';
import { canUseDOM } from 'exenv';

import lan from './reducers/lan.js';

const Router = canUseDOM ? BrowserRouter : StaticRouter;

const store = createStore(lan);

function App(args) {
  if (!canUseDOM) {
    let lan = 'zh';
    if (args && args.hostname && args.hostname.indexOf('himofei.com') !== -1) {
      lan = 'en'
    }
    store.dispatch({
      type: 'SET_LANGUAGE',
      lan
    });
  };

  return (
    <Router location={args && args.url}>
      <Provider store={store}>
        <Route children={({ location }) => (
          <Nav path={location.pathname} />
        )} />

        <Route exact path="/" component={Home} />
        <Route exact path="/blog" component={Blog} />
        <Route exact path="/blog/:page" component={Blog} />
        <Route exact path="/blog/article/:id" component={Article} />
        <Route exact path="/lab" component={Lab} />
        <Route exact path="/links" component={Links} />
        <Route exact path="/message" component={Message} />
        
        <Route path="/" render={props => {
          // google analystics
          if (!canUseDOM) return;
          gtag('config', 'UA-109405512-1', {
            'page_path': `${props.location.pathname}${props.location.search}`
          });
          // for copy right 
          if (props.location.pathname !== '/') {
            return <Copyright />
          }
        }} />
      </Provider>
    </Router>
  );
}

export default App;
