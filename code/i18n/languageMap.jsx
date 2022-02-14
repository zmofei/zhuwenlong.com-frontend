import React from "react";
import { connect } from 'react-redux';
import { useRouter } from 'next/router'

function Lan(props) {
  const router = useRouter();
  const { locale, locales, defaultLocale } = router;
  // console.log({ locale, locales, defaultLocale });
  return <>{props && props[locale]}</>;
}

const mapStateToProps = state => {
  return { lan: state.lan };
};

export default Lan
// connect(
//   mapStateToProps
// )(lan);