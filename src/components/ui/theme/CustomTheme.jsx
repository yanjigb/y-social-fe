import { memo } from "react";
import isEqual from "react-fast-compare";
import { BackgroundTheme, ColorTheme, FontSizeTheme } from "../custom-theme";

const CustomTheme = () => {
  return (
    <div
      className="card animate__animated animate__fadeInLeft"
      onClick={(e) => {
        if (e.currentTarget.classList.contains("card")) {
          e.stopPropagation();
        }
      }}
    >
      <h3 className="fs-3 font-bold">Customize your view</h3>
      <p className="text-muted">
        Manage your font size, color, and background.
      </p>

      <>
        <FontSizeTheme />
        <ColorTheme />
        <BackgroundTheme />
      </>
    </div>
  );
};

export default memo(CustomTheme, isEqual);
