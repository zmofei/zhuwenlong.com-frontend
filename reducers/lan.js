import Cookie from 'js-cookie';
let defaultLan = Cookie.get('lan');

if (!defaultLan) {
  if (process.browser) {
    defaultLan = window.location.hostname.indexOf('himofei.com') !== -1 ? 'en' : 'zh';
  }
}



const lan = (state = { lan: defaultLan }, action) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      Cookie.set('lan', action.lan, { expires: 999999 });
      return Object.assign({}, state, { lan: action.lan });
    default:
      return state;
  }
}

export default lan;
