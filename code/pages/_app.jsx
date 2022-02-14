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
    <Component {...pageProps} />
  )
}

export default MyApp;
