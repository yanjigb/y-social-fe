/* eslint-disable react/prop-types */
import React from "react";
import { Palette } from "lucide-react";
import { memo } from "react";
import { Offcanvas } from "react-bootstrap";
import isEqual from "react-fast-compare";
import { BackgroundTheme, ColorTheme } from "../../../ui";

import "./styles.css";

const MobileCustomTheme = ({ toggleTheme, onToggleTheme }) => {
  return (
    <Offcanvas
      show={toggleTheme}
      onHide={onToggleTheme}
      placement="bottom"
      className="custom-theme"
    >
      <Offcanvas.Header closeButton className="bg-white text-black">
        <Offcanvas.Title className="d-flex align-items-center gap-3">
          <Palette className="sidebar-icon" size={20} />
          <h3 className="mb-0">Custom Theme</h3>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ColorTheme className="mt-0" />
        <BackgroundTheme />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default memo(MobileCustomTheme, isEqual);
