import React from "react";
import { connect } from 'react-redux';

function lan(props) {
  return <span>{props && props[props.lan]}</span>;
}

const mapStateToProps = state => {
  return { lan: state.lan };
};

export default connect(
  mapStateToProps
)(lan);