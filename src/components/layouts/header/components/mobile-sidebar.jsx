
import React, { memo, useRef, useState } from "react";
import { ListGroup, Offcanvas } from "react-bootstrap";
import isEqual from "react-fast-compare";
import { RouteNames } from "../../../../constant/routes";
import {
  Bell,
  Bookmark,
  FileDown,
  Home,
  LayoutDashboard,
  MessageSquare,
  Palette,
  UserRoundCog,
  Video,
} from "lucide-react";
import { useCurrentUser } from "../../../../hooks";
import Global from "../../../../constant/global";

import "./styles.css";
import { CSVLink } from "react-csv";
import { CustomBorderAvatarSetting, Setting } from "../../../ui";

const MobileSidebar = ({ show, onToggleMenu, onToggleTheme }) => {
  const currentUser = useCurrentUser();
  const exportDataRef = useRef(null);
  const [openSettingProfile, setOpenSettingProfile] = useState(false);
  const [openSettingCustomBorderAvatar, setOpenSettingCustomBorderAvatar] =
    useState(false);

  const csvData = [
    ["username", "password", "email"],
    [currentUser?.username, currentUser?.password, currentUser?.email],
  ];

  const handleExportData = () => {
    exportDataRef.current.link.click();
  };

  const onOpenSettingProfile = () => {
    setOpenSettingProfile(!openSettingProfile);
  };

  const onOpenSettingCustomBorderAvatar = () => {
    setOpenSettingCustomBorderAvatar(!openSettingCustomBorderAvatar);
  };

  return (
    <>
      <Offcanvas show={show} onHide={onToggleMenu} className="mobile-sidebar">
        <Offcanvas.Header closeButton className="bg-white text-black">
          <Offcanvas.Title className="fs-2">Yanji Social</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <ListGroup>
            <ListGroup.Item
              className="py-4 border-0 shadow-sm d-flex align-items-center gap-4 mobile-sidebar-item"
              action
              href={RouteNames.HOME}
            >
              <Home className="sidebar-icon" size={20} />
              <h3 className="mb-0">Home</h3>
            </ListGroup.Item>
            <ListGroup.Item
              className="py-4 border-0 shadow-sm d-flex align-items-center gap-4 mobile-sidebar-item"
              action
              href={RouteNames.NOTIFICATION}
            >
              <Bell className="sidebar-icon" size={20} />
              <h3 className="mb-0">Notification</h3>
            </ListGroup.Item>
            <ListGroup.Item
              className="py-4 border-0 shadow-sm d-flex align-items-center gap-4 mobile-sidebar-item"
              action
              href={RouteNames.MESSAGE_PAGE}
            >
              <MessageSquare className="sidebar-icon" size={20} />
              <h3 className="mb-0">Message</h3>
            </ListGroup.Item>
            <ListGroup.Item
              className="py-4 border-0 shadow-sm d-flex align-items-center gap-4 mobile-sidebar-item"
              action
              href={RouteNames.BOOKMARKS}
            >
              <Bookmark className="sidebar-icon" size={20} />
              <h3 className="mb-0">Bookmarks</h3>
            </ListGroup.Item>
            <ListGroup.Item
              className="py-4 border-0 shadow-sm d-flex align-items-center gap-4 mobile-sidebar-item"
              action
              href={RouteNames.MEETING}
              target="_blank"
            >
              <Video className="sidebar-icon" size={20} />
              <h3 className="mb-0">Meeting</h3>
            </ListGroup.Item>
            <ListGroup.Item
              className="py-4 border-0 shadow-sm d-flex align-items-center gap-4 mobile-sidebar-item"
              onClick={onToggleTheme}
            >
              <Palette className="sidebar-icon" size={20} />
              <h3 className="mb-0">Theme</h3>
            </ListGroup.Item>
            <ListGroup.Item
              className="py-4 border-0 shadow-sm d-flex align-items-center gap-4 mobile-sidebar-item"
              onClick={handleExportData}
            >
              <FileDown className="sidebar-icon" size={20} />
              <h3 className="mb-0">Download your data</h3>
            </ListGroup.Item>
            <ListGroup.Item
              className="py-4 border-0 shadow-sm d-flex align-items-center gap-4 mobile-sidebar-item"
              onClick={onOpenSettingProfile}
            >
              <UserRoundCog className="sidebar-icon" size={20} />
              <h3 className="mb-0">Profile Settings</h3>
            </ListGroup.Item>
            <ListGroup.Item
              className="py-4 border-0 shadow-sm d-flex align-items-center gap-4 mobile-sidebar-item"
              onClick={onOpenSettingCustomBorderAvatar}
            >
              <Palette className="sidebar-icon" size={20} />
              <h3 className="mb-0">Custom Border Avatar</h3>
            </ListGroup.Item>
            {currentUser?._id === Global.ADMIN_ID && (
              <ListGroup.Item className="py-4 border-0 shadow-sm mobile-sidebar-item">
                <a
                  href={RouteNames.ADMIN}
                  target="_blank"
                  rel="noreferrer"
                  className="d-flex align-items-center gap-4 "
                >
                  <LayoutDashboard className="sidebar-icon" size={20} />
                  <h3 className="mb-0">Admin Dashboard</h3>
                </a>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>

      <Setting show={openSettingProfile} onHide={onOpenSettingProfile} />
      <CustomBorderAvatarSetting
        show={openSettingCustomBorderAvatar}
        onHide={onOpenSettingCustomBorderAvatar}
      />

      {/* Export user data */}
      <CSVLink
        ref={exportDataRef}
        data={csvData}
        filename={`${currentUser?.username}-data.csv`}
        target="_blank"
        style={{ display: "none" }}
      />
    </>
  );
};

export default memo(MobileSidebar, isEqual);
