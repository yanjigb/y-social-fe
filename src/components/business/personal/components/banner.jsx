
import React, { memo } from "react";
import isEqual from "react-fast-compare";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Image } from "react-bootstrap";

// eslint-disable-next-line no-undef
const Banner = ({ bannerUrl = LOGO_YANJI_SOCIAL }) => {
  return bannerUrl ? (
    <LazyLoadImage
      alt="background"
      src={bannerUrl}
      width={1050}
      height={600}
      className="h-100 w-100"
    />
  ) : (
    <Image
      src={"/images/personal-cover-default.jpg"}
      alt="background"
      width={1050}
      height={600}
      className="h-100 w-100"
    />
  );
};

export default memo(Banner, isEqual);
