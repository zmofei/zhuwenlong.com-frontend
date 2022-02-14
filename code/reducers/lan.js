import Cookie from 'js-cookie';
let defaultLan = Cookie.get('lan') || 'zh';

if (!defaultLan) {
  if (process.browser) {
    defaultLan = window.location.hostname.indexOf('himofei.com') !== -1 ? 'en' : 'zh';
  }
}

const lan = (state = { lan: defaultLan }, action) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      console.log('receive lan', action.lan, Object.assign({}, state, { lan: action.lan }))
      Cookie.set('lan', action.lan, { expires: 999999 });
      const newState = { ...state, lan: action.lan };
      console.log(newState);
      return { ...state, lan: action.lan };
    default:
      return state;
  }
}

export default lan;
