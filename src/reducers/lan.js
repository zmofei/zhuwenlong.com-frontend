import Cookie from 'js-cookie';
import { canUseDOM } from 'exenv';

let defaultLan = Cookie.get('lan') || 'zh';
if (!defaultLan) {
  if (canUseDOM) {
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