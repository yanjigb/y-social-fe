/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { memo } from "react";
import isEqual from "react-fast-compare";

const TextAreaStyles = {
  overflowY: "auto",
  width: "100%",
  height: "10em",
  resize: "none",
};

const Content = ({ onChangeContent, content, user }) => {
  return (
    <div className="form__input">
      <textarea
        id="post-input"
        className="input overflowXHidden"
        maxLength="5000"
        style={TextAreaStyles}
        onChange={onChangeContent}
        placeholder={`What's in your mind, ${user.username}?`}
        value={content}
      ></textarea>
    </div>
  );
};

export default memo(Content, isEqual);
