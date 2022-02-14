import Nav from './nav';
import Head from 'next/head';
import { connect } from 'react-redux';
import lan from '../i18n/languagefn.js';
import Copyright from './copyright.jsx';

import { useRouter } from 'next/router'

function Layout(props) {
  const router = useRouter();
  const { locale, locales, defaultLocale } = router;
  const copyright = props.nocopyright ? '' : <Copyright />;
  return (
    <>
      <Head>
        <title>{props.title || lan(locale, { 'zh': "朱文龙(Mofei)的自留地", 'en': 'Hi! I am Mofei!' })}</title>
        <meta charSet="UTF-8" />
        <meta name="description" content={props.description || lan(locale, { 'zh': "朱文龙的自留地", 'en': 'Hi! I am Mofei!' })} />
        <meta name="keywords" content="朱文龙,Mofei,HTML,CSS,JavaScript" />
        <meta name="author" content={lan(locale, { 'zh': "朱文龙", 'en': 'Mofei Zhu' })} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/x-icon" href="https://cdn.zhuwenlong.com/upload/image/logo_128.ico" />
      </Head>
      <Nav module={props.module} />
      {props.children}
      {copyright}
    </>
  )
}

function stateToProps(state) {
  const lan = state.lan;
  return { lan }
}

export default Layout // connect(stateToProps, null)(Layout);