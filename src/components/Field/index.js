import React from "react";
import PropTypes from "prop-types";
import { STATE } from "src/constant";
import "./styles.scss";

const Field = ({
  field, state, finished, onLeftClick, onRightClick
}) => {
  const classNames = ["field-div"];
  if (finished) {
    if (state === STATE.INIT) {
      classNames.push(field >= 0 ? "not-touched" : "not-found-mine");
    }
    if (state === STATE.CLEAR) {
      classNames.push(field >= 0 ? `number-${field}` : "red-mine");
    }
    if (state === STATE.MINE) {
      classNames.push(field >= 0 ? "not-mine" : "marked-mine");
    }
  } else {
    if (state === STATE.INIT) {
      classNames.push("init");
    }
    if (state === STATE.CLEAR) {
      classNames.push(`number-${field}`);
    }
    if (state === STATE.MINE) {
      classNames.push("marked-mine");
    }
  }

  return (
    <div
      className={classNames.join(" ")}
      onClick={onLeftClick}
      onContextMenu={onRightClick}
    />
  );
};
Field.propTypes = {
  field        : PropTypes.number.isRequired,
  state        : PropTypes.string.isRequired,
  finished     : PropTypes.bool.isRequired,
  onLeftClick  : PropTypes.func.isRequired,
  onRightClick : PropTypes.func.isRequired,
};

export default Field;
