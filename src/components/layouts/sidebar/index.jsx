import isEqual from "react-fast-compare";
import { Link } from "react-router-dom";
import { memo } from "react";
import {
    Home,
    Bell,
    MessageSquare,
    Bookmark,
    Video,
    Palette,
    Bolt,
    LayoutDashboard,
} from "lucide-react";
import Button from "../../ui/button/button";
import { RouteNames } from "../../../constant/routes";
import { useCurrentUser } from "../../../hooks";
import Global from "../../../constant/global";

function Sidebar({ active, setActive, isReadNotification }) {
    const currentUser = useCurrentUser();

    return (
        <>
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
                    <Link
                        to={RouteNames.ADMIN}
                        name={"ADMIN"}
                        target="_blank"
                        className="menu-item hover-bg"
                    >
                        <LayoutDashboard className="sidebar-icon" size={20} />
                        <h3 className="ms-3 mb-0">Admin Dashboard</h3>
                    </Link>
                )}
            </div>
        </>
    )
}

export default memo(Sidebar, isEqual)
