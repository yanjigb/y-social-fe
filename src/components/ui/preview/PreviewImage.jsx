import { memo } from "react";
import { LOGO_YANJI_SOCIAL } from "../../../assets";
import isEqual from "react-fast-compare";

const PreviewImage = ({ imgSrc, width, heigth }) => {
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
        objectFit: "cover",
        width: width,
        height: heigth,
      }}
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
        objectFit: "cover",
        width: width,
        height: heigth,
      }}
    />
  );
};

export default memo(PreviewImage, isEqual);
