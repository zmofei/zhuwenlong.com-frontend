import Nav from './nav';
import Head from 'next/head';
import { connect } from 'react-redux';
import lan from '../i18n/languagefn.js';
import Copyright from './copyright.jsx';


function Layout(props) {
  const copyright = props.nocopyright ? '' : <Copyright />;
  return (
    <>
      <Head>
        <title>{props.title || lan(props.lan, { 'zh': "朱文龙(Mofei)的自留地", 'en': 'Hi! I am Mofei!' })}</title>
        <meta charSet="UTF-8" />
        <meta name="description" content={props.description || lan(props.lan, { 'zh': "朱文龙的自留地", 'en': 'Hi! I am Mofei!' })} />
        <meta name="keywords" content="朱文龙,Mofei,HTML,CSS,JavaScript" />
        <meta name="author" content={lan(props.lan, { 'zh': "朱文龙", 'en': 'Mofei Zhu' })} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/x-icon" href="https://cdn.zhuwenlong.com/upload/image/logo_128.ico" />
        <link rel="alternate" hrefLang="x-default" href="https://www.zhuwenlong.com/" />
        <link rel="alternate" hrefLang="en" href="https://www.himofei.com/" />
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

export default connect(stateToProps, null)(Layout);