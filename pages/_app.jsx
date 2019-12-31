import { Provider } from 'react-redux';
import { createStore } from 'redux';
// import CSS from './_app.scss';

import lan from '../reducers/lan.js';

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
