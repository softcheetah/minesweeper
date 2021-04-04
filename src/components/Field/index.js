import React from "react";
import PropTypes from "prop-types";
import { STATE } from "src/constant";
import "./styles.scss";

const Field = ({
  field, state, finished
}) => {
  const classNames = ["field-div"];

  if (finished) {
    classNames.push("finished");
    if (state === STATE.INIT) {
      classNames.push(field >= 0 ? "init" : "not-found-mine");
    }
    if (state === STATE.CLEAR) {
      classNames.push(field >= 0 ? `number-${field}` : "red-mine");
    }
    if (state === STATE.MINE) {
      classNames.push(field >= 0 ? "not-mine" : "marked-mine");
    }
  } else {

  }
  return (
    <div className={classNames.join(" ")} />
  );
};
Field.propTypes = {
  field    : PropTypes.number.isRequired,
  state    : PropTypes.string.isRequired,
  finished : PropTypes.bool.isRequired,
};

export default Field;
