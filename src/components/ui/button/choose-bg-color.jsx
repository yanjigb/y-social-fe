
import React, { memo } from "react";
import isEqual from "react-fast-compare";

const ChooseBgBtn = ({ bgName, bgTheme, content, onBackgroundChange }) => {
  return (
    <div
      key={bgName}
      className={bgName + (bgTheme === bgName ? " active" : "")}
      onClick={() => onBackgroundChange(bgName)}
    >
      <span className="d-none d-md-block"></span>
      <h5 htmlFor={bgName} className="fs-5">{content}</h5>
    </div>
  );
};

export default memo(ChooseBgBtn, isEqual);
