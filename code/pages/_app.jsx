import App from 'next/app'
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import lan from '../reducers/lan.js';
import './_app.scss';


export function reportWebVitals(metric) {
  const { id, name, label, value } = metric;
  console.log('metric', metric)

  window.gtag && window.gtag('event', name, {
    event_category:
      label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    event_label: id, // id unique to current page load
    non_interaction: true, // avoids affecting bounce rate.
  })
}

function MyApp({ Component, pageProps, lanStr }) {
  const store = createStore(lan, { lan: lanStr });
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const { ctx } = appContext;

  let host;
  let cookie;
  const appProps = await App.getInitialProps(appContext);
  if (process.browser) {
    host = location.host;
    cookie = document.cookie;
  } else {
    const { url } = ctx.req;
    if (url === '/blog/' || url === '/blog') {
      ctx.res.writeHead(301, {
        Location: '/blog/1'
      });
      ctx.res.end();
    }

    host = ctx.req.headers.host;
    cookie = ctx.req.headers.cookie;
  }

  let lan = 'zh';
  if (/himofei\.com/.test(host.toLocaleLowerCase())) {
    lan = 'en';
  };

  if (cookie) {
    let lans = cookie.match(/lan=(\w+)/);
    if (lans && lans.length >= 2) {
      lan = lans[1];
    }
  }

  appProps.lanStr = lan;
  return { ...appProps }
}

export default MyApp;
