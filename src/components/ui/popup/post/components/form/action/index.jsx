/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { memo } from "react";
import isEqual from "react-fast-compare";

const Action = ({ isLoading, isEmptyContent, isImageSrc, isVideoSrc }) => {
  return !isLoading ? (
    <input
      type="submit"
      className="w-100 form__status text-white py-3 border-0 rounded fs-4 fw-bold mt-4"
      value="Post"
      disabled={!isEmptyContent && !isImageSrc && !isVideoSrc}
    />
  ) : (
    <button
      className="text-center bg-white text-black py-3 w-100 border-0 rounded fs-5 fw-bold mt-4"
      disabled
      style={{
        cursor: "not-allowed",
      }}
    >
      Uploading post...
    </button>
  );
};

export default memo(Action, isEqual);
