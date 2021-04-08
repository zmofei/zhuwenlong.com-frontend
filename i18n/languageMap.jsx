import React from "react";
import { connect } from 'react-redux';

function lan(props) {
  return <>{props && props[props.lan]}</>;
}

const mapStateToProps = state => {
  return { lan: state.lan };
};

export default connect(
  mapStateToProps
)(lan);