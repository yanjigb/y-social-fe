
import React, { memo } from "react";
import isEqual from "react-fast-compare";
import { isMobile, isTablet } from "react-device-detect";
import MobileNav from "./navigation/mobile-nav";
import DesktopNav from "./navigation/desktop-nav";

function Header({ title, link, isSearch = true }) {
  return (
    <>
      {/* <Navigation title={title} link={link} isSearch={isSearch} /> */}
      {isMobile || isTablet ? (
        <MobileNav title={title} link={link} isSearch={isSearch} />
      ) : (
        <DesktopNav title={title} link={link} isSearch={isSearch} />
      )}
    </>
  );
}

export default memo(Header, isEqual);
