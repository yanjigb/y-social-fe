
import {
  Bell,
  Bolt,
  Bookmark,
  Home,
  LayoutDashboard,
  MessageSquare,
  Palette,
  Video,
} from "lucide-react";
import React, { memo } from "react";
import isEqual from "react-fast-compare";
import Global from "../../../constant/global";
import { RouteNames } from "../../../constant/routes";
import { useCurrentUser } from "../../../hooks";
import Button from "../../ui/button/button";

function Sidebar({ active, setActive, isReadNotification }) {
  const currentUser = useCurrentUser();

  return (
    <div className="sidebar d-none d-sm-flex flex-sm-column mt-3">
      <Button
        path={RouteNames.HOME}
        label="Home"
        icon={<Home className="sidebar-icon" size={20} />}
        name={"HOME"}
        active={active}
        setActive={setActive}
      />

      {currentUser && (
        <>
          <Button
            path={RouteNames.NOTIFICATION}
            label="Notification"
            icon={<Bell className="sidebar-icon" size={20} />}
            name={"NOTIFICATION"}
            isReadNotification={isReadNotification}
            active={active}
            setActive={setActive}
          />
          <Button
            path={RouteNames.MESSAGE_PAGE}
            label="Messages"
            icon={<MessageSquare className="sidebar-icon" size={20} />}
            name={"MESSAGES"}
            active={active}
            setActive={setActive}
          />
          <Button
            path={RouteNames.BOOKMARKS}
            label="Bookmarks"
            icon={<Bookmark className="sidebar-icon" size={20} />}
            name={"BOOKMARKS"}
            active={active}
            setActive={setActive}
          />
        </>
      )}
      <Button
        label="Meeting"
        path={RouteNames.MEETING}
        icon={<Video className="sidebar-icon" size={20} />}
        name={"MEETING"}
        active={active}
        setActive={setActive}
        newtab={true}
      />
      <Button
        label="Theme"
        icon={<Palette className="sidebar-icon" size={20} />}
        name={"THEME"}
        active={active}
        setActive={setActive}
      />
      {currentUser && (
        <Button
          label="Settings"
          icon={<Bolt className="sidebar-icon" size={20} />}
          name={"SETTINGS"}
          active={active}
          setActive={setActive}
        />
      )}
      {currentUser?._id === Global.ADMIN_ID && (
        <a
          href={RouteNames.ADMIN}
          target="_blank"
          rel="noreferrer"
          className="menu-item hover-bg gap-3"
        >
          <LayoutDashboard className="sidebar-icon" size={20} />
          <h3 className="mb-0">Admin Dashboard</h3>
        </a>
      )}
    </div>
  );
}

export default memo(Sidebar, isEqual);
