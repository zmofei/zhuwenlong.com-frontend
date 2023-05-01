import Cookie from 'js-cookie';
let defaultLan = Cookie.get('lan') || 'zh';

if (!defaultLan) {
  if (typeof window !== "undefined") {
    defaultLan = window.location.hostname.indexOf('himofei.com') !== -1 ? 'en' : 'zh';
  }
}

const lan = (state = { lan: defaultLan }, action) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      Cookie.set('lan', action.lan, { expires: 999999 });
      const newState = { ...state, lan: action.lan };
      return { ...state, lan: action.lan };
    default:
      return state;
  }
}

export default lan;
