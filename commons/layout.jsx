import Nav from './nav';
import Adsense from './googleAds.jsx';
import CSS from './layout.scss';

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