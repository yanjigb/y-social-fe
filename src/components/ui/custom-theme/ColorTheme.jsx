
import React, { memo } from "react";
import "./style/color.css";

import { useTheme } from "../../../hooks";
import ChooseColorBtn from "../../ui/button/choose-color";
import { LocalStorageKeys } from "../../../constant/local-storage-key";
import clsx from "clsx";

const ColorTheme = ({ className = "" }) => {
  const { setTextColors } = useTheme();
  const textColorTheme = localStorage.getItem(LocalStorageKeys.TEXT_COLOR);

  const handleTextColorChange = (color) => {
    localStorage.setItem(LocalStorageKeys.TEXT_COLOR, color);
    setTextColors(color);
  };

  const renderColorThemeMenu = () => {
    return (
      <div className="choose-color d-flex justify-content-between align-items-center">
        <ChooseColorBtn
          colorName="color-1"
          textColorTheme={textColorTheme}
          onTextColorChange={handleTextColorChange}
        />
        <ChooseColorBtn
          colorName="color-2"
          textColorTheme={textColorTheme}
          onTextColorChange={handleTextColorChange}
        />
        <ChooseColorBtn
          colorName="color-3"
          textColorTheme={textColorTheme}
          onTextColorChange={handleTextColorChange}
        />
        <ChooseColorBtn
          colorName="color-4"
          textColorTheme={textColorTheme}
          onTextColorChange={handleTextColorChange}
        />
        <ChooseColorBtn
          colorName="color-5"
          textColorTheme={textColorTheme}
          onTextColorChange={handleTextColorChange}
        />
      </div>
    );
  };

  return (
    <div className={clsx("color flex flex-col gap-3", className)}>
      <h4 className="font-bold fs-4">Color</h4>
      {renderColorThemeMenu()}
    </div>
  );
};

export default memo(ColorTheme);
