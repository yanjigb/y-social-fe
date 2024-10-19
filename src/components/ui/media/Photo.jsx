/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import {
  LazyLoadImage,
  LazyLoadComponent,
} from "react-lazy-load-image-component";
import { memo } from "react";
import isEqual from "react-fast-compare";
import clsx from "clsx";

const photoStyles = {
  width: "calc(100%)",
};

const videoStyles = {
  height: "30rem",
  width: "100%",
  aspectRatio: "16/9",
};

const videoProps = {
  preload: "metadata",
  controls: true,
  draggable: false,
  muted: true,
  autoPlay: true,
  loop: true,
};

const lazyLoadImageProps = (label, imageSrc, className) => {
  return {
    alt: label,
    src: imageSrc,
    className: clsx("w-100 h-100", className),
    height: "100%",
  };
};

const Photo = ({
  imageSrc = "",
  label = "",
  videoSrc = "",
  isVideo = false,
  postID = "",
  className = "",
  link = `/post/${postID}`,
}) => {
  return (
    <>
      {isVideo ? (
        <div className="photo" style={videoStyles}>
          <LazyLoadComponent>
            <video {...videoProps}>
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </LazyLoadComponent>
        </div>
      ) : (
        <Link to={link} className="photo" style={photoStyles}>
          <LazyLoadImage {...lazyLoadImageProps(label, imageSrc, className)} />
        </Link>
      )}
    </>
  );
};

export default memo(Photo, isEqual);
