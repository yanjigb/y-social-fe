import clsx from "clsx";
import { memo } from "react";
import isEqual from "react-fast-compare";
import { Link } from "react-router-dom";
import { RouteNames } from "../../../../../../constant/routes";
import { Avatar } from "../../../../../ui";

function InputStatus({ currentUser, user, onPopup, renderPostPopup, className }) {
    return (
        <div
            // className={`create-post align-items-center mb-4 ${currentUser === undefined ? "d-none" : "d-flex"
            //     }`}
            className={clsx("create-post align-items-center mb-4", {
                "d-none": currentUser === undefined,
                "d-flex": currentUser !== undefined,
            }, className)}
        >
            <div className="create-post-wrapper w-100 d-flex align-items-center">
                <Link
                    to={currentUser ? `/user/${user?._id}` : RouteNames.HOME}
                    className="profile-pic text-white"
                    aria-label="Avatar user"
                >
                    <Avatar
                        imageSrc={user?.profilePicture}
                        label={user?.username}
                        userId={user?._id}
                    />
                </Link>

                <div
                    className="border-0 ps-3 me-3 ms-3 caption fs-4"
                    name="caption"
                    onClick={onPopup}
                    id="caption"
                >
                    What's in your mind, {currentUser?.username || " user"}?
                </div>
            </div>

            <div className="submit d-flex align-items-center" title="Đăng bài viết">
                {currentUser ? (
                    <button
                        onClick={onPopup}
                        type="submit"
                        className="btn btn-primary"
                    >
                        Post
                    </button>
                ) : (
                    <Link to={RouteNames.LOGIN} className="btn btn-primary">
                        Post
                    </Link>
                )}
            </div>
            {renderPostPopup()}
        </div>
    )
}

export default memo(InputStatus, isEqual);

