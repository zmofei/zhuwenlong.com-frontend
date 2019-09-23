/* global gtag */

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
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

import lan from './reducers/lan.js';

const store = createStore(lan);

function BasicExample() {
  return (
    <Router >
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

export default BasicExample;
