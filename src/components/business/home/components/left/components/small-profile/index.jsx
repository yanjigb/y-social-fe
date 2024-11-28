
/* eslint-disable react/react-in-jsx-scope */
import { LOGO_YANJI_SOCIAL } from "assets"
import { Avatar } from "components/ui"
import { RouteNames } from "constant/routes"
import { useCurrentUser } from "hooks"
import { CheckCircle2 } from "lucide-react"
import { memo } from "react"
import isEqual from "react-fast-compare"
import { Link } from "react-router-dom"
import Skeleton from "./skeleton"

const SmallProfile = ({ user }) => {
    const currentUser = useCurrentUser();
    if (!currentUser || !user) return <Skeleton />

    return (
        <Link
            to={currentUser ? `/user/${user?._id}` : RouteNames.HOME}
            className="profile d-flex align-items-center"
            title="Truy cập trang cá nhân"
        >
            <div className="profile-pic">
                <Avatar
                    imageSrc={currentUser ? user.profilePicture : LOGO_YANJI_SOCIAL}
                    label={user.username}
                    userId={user?._id}
                />
            </div>

            <div className="handle">
                <h4 className="d-flex align-items-center fs-4">
                    {currentUser ? `${user.username}` : `user`}
                    {user.isVerify && (
                        <CheckCircle2 size={15} className="ms-2 text-primary" />
                    )}
                </h4>
                <p className="text-muted m-0">
                    @{currentUser ? user.username : "user"}
                </p>
            </div>
        </Link>
    )
}

export default memo(SmallProfile, isEqual)
