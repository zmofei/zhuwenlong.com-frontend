import { Provider } from 'react-redux';
import { createStore } from 'redux';

import lan from '../reducers/lan.js';

function MyApp({ Component, pageProps, lanStr }) {
  const store = createStore(lan, { lan: lanStr });
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

MyApp.getInitialProps = async ({ ctx }) => {
  let lan = 'zh';
  if (/himofei\.com/.test(ctx.req.headers.host.toLocaleLowerCase())) {
    lan = 'en';
  };

  const cookie = ctx.req.headers.cookie;
  if (cookie) {
    let lans = cookie.match(/lan=(\w+)/);
    if (lans && lans.length >= 2) {
      lan = lans[1];
    }
  }
  return { lanStr: lan }
}

export default MyApp; 
