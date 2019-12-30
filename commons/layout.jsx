import Nav from './nav';
import Adsense from './googleAds.jsx';

function Layout(props) {
  return (
    <>
      <Nav />
      {props.children}
      <Adsense />
    </>
  )
}

export default Layout;