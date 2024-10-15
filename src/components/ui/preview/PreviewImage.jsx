/* eslint-disable react/prop-types */
import React, { memo } from "react";
import { LOGO_YANJI_SOCIAL } from "../../../assets";
import isEqual from "react-fast-compare";
import clsx from "clsx";

const PreviewImage = ({ imgSrc, width, heigth, className }) => {
  return imgSrc ? (
    <img
      src={imgSrc}
      loading="lazy"
      role="img"
      decoding="async"
      alt="preview_image"
      width={200}
      height={200}
      style={{
        aspectRatio: "16/9",
        width: width,
        height: heigth,
      }}
      className={clsx("object-fit-cover", className)}
    />
  ) : (
    <img
      src={LOGO_YANJI_SOCIAL}
      loading="lazy"
      role="img"
      decoding="async"
      alt="preview_image"
      width={200}
      height={200}
      style={{
        aspectRatio: "16/9",
        width: width,
        height: heigth,
      }}
      className={clsx("object-fit-cover", className)}
    />
  );
};

export default memo(PreviewImage, isEqual);
