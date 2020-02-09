import Nav from './nav';
import Adsense from './googleAds.jsx';
import CSS from './layout.scss';
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
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <script>
          {(adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: "ca-pub-0645475852185063",
            enable_page_level_ads: true
          })
          }
        </script>
      </Head>
      <Nav />
      {props.children}
      {copyright}
      <Adsense />
    </>
  )
}

function stateToProps(state) {
  const lan = state.lan;
  return { lan }
}

export default connect(stateToProps, null)(Layout);