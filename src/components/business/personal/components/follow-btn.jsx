import { memo } from "react";
import isEqual from "react-fast-compare";
import { io } from "socket.io-client";
import { useCurrentUser } from "../../../../hooks";
import { followUser } from "../../../../redux/request/userRequest";
import { useDispatch } from "react-redux";
import Global from "../../../../constant/global";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

function FollowBtn({ userInfo, socket, isApprover, isFollow, onOpenSetting, className }) {
    const currentUser = useCurrentUser();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFollow = () => {
        if (currentUser) {
            const updatedUser = {
                userID: userInfo?._id,
                newFollower: currentUser?._id,
            };

            followUser(updatedUser, dispatch)
                .then((data) => {
                    if (data) {
                        const { userAccept, userRequest } = data.data;

                        socket = io(Global.SOCKET_URL);

                        socket.emit("follow", {
                            // add author of current account to update friendRequests list
                            sender: userRequest?._id,
                            // add user route page to checking is this user send request?
                            userRoute: userAccept?._id,
                        });
                    }
                })
                .catch((err) => {
                    console.error("Failed to follow", err);
                });
        } else {
            navigate(RouteNames.LOGIN);
        }
    };

    const isCurrentUser = userInfo?._id === currentUser?._id;

    let label, handleClick;

    // author of current account who can accept friend request
    if (isApprover) {
        label = "Follow back";
        handleClick = handleFollow;
    }
    // user who author of current account
    else if (isCurrentUser) {
        label = "Edit profile";
        handleClick = onOpenSetting;

    } else if (isFollow) {
        label = "Following";
        handleClick = handleFollow;
    }
    // user who not friend
    else {
        label = "Follow";
        handleClick = handleFollow;
    }

    return (
        <div
            className={clsx("add-stories text-white py-3 px-4 d-flex justify-content-center align-items-center rounded-3 flex-grow-1", className)}
            onClick={handleClick}
        >
            {label}
        </div>
    );
}

export default memo(FollowBtn, isEqual);
