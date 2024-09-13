import { memo } from "react"
import { ListGroup, Offcanvas } from "react-bootstrap"
import isEqual from "react-fast-compare"
import { RouteNames } from "../../../../constant/routes"
import { Bell, Bookmark, Home, LayoutDashboard, MessageSquare, Palette, Video } from "lucide-react"
import { useCurrentUser } from "../../../../hooks"
import Global from "../../../../constant/global"

import "./styles.css"

const MobileSidebar = ({ show, onToggleMenu, onToggleTheme }) => {
    const currentUser = useCurrentUser();

    return (
        <Offcanvas show={show} onHide={onToggleMenu} className="mobile-sidebar">
            <Offcanvas.Header closeButton className="bg-white text-black">
                <Offcanvas.Title className="fs-2">Yanji Social</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
                <ListGroup>
                    <ListGroup.Item className="py-4 border-0 shadow-sm d-flex align-items-center gap-4 mobile-sidebar-item" action href={RouteNames.HOME}>
                        <Home className="sidebar-icon" size={20} />
                        <h3 className="mb-0">Home</h3>
                    </ListGroup.Item>
                    <ListGroup.Item className="py-4 border-0 shadow-sm d-flex align-items-center gap-4 mobile-sidebar-item" action href={RouteNames.NOTIFICATION}>
                        <Bell className="sidebar-icon" size={20} />
                        <h3 className="mb-0">Notification</h3>
                    </ListGroup.Item>
                    <ListGroup.Item className="py-4 border-0 shadow-sm d-flex align-items-center gap-4 mobile-sidebar-item" action href={RouteNames.MESSAGE_PAGE}>
                        <MessageSquare className="sidebar-icon" size={20} />
                        <h3 className="mb-0">Message</h3>
                    </ListGroup.Item>
                    <ListGroup.Item className="py-4 border-0 shadow-sm d-flex align-items-center gap-4 mobile-sidebar-item" action href={RouteNames.BOOKMARKS}>
                        <Bookmark className="sidebar-icon" size={20} />
                        <h3 className="mb-0">Bookmarks</h3>
                    </ListGroup.Item>
                    <ListGroup.Item className="py-4 border-0 shadow-sm d-flex align-items-center gap-4 mobile-sidebar-item" action href={RouteNames.MEETING} target="_blank">
                        <Video className="sidebar-icon" size={20} />
                        <h3 className="mb-0">Meeting</h3>
                    </ListGroup.Item>
                    <ListGroup.Item className="py-4 border-0 shadow-sm d-flex align-items-center gap-4 mobile-sidebar-item" onClick={onToggleTheme}>
                        <Palette className="sidebar-icon" size={20} />
                        <h3 className="mb-0">Theme</h3>
                    </ListGroup.Item>
                    {currentUser?._id === Global.ADMIN_ID && (
                        <ListGroup.Item className="py-4 border-0 shadow-sm d-flex align-items-center gap-4 mobile-sidebar-item" action href={RouteNames.ADMIN}>
                            <LayoutDashboard className="sidebar-icon" size={20} />
                            <h3 className="mb-0">Admin Dashboard</h3>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default memo(MobileSidebar, isEqual)
