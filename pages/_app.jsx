import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Router from 'next/router';

import lan from '../reducers/lan.js';

Router.events.on('routeChangeComplete', () => {
  if (process.env.NODE_ENV !== 'production') {
    const els = document.querySelectorAll('link[href*="/_next/static/css/styles.chunk.css"]');
    const timestamp = new Date().valueOf();
    els[0].href = '/_next/static/css/styles.chunk.css?v=' + timestamp;
  }
});

const store = createStore(lan);

function MyApp({ Component, pageProps, ctx }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

// MyApp.getInitialProps

export default MyApp; 
