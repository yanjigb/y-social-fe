import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { useState, useEffect, useCallback, memo } from "react";
import isEqual from "react-fast-compare";

import { getUserByID } from "../../../../redux/request/userRequest";
import { createRoom } from "../../../../redux/request/roomRequest";
import { NotiType } from "../../../../constant/notification";
import { pushNewNotification } from "../../../../redux/request/notificationRequest";
import { Setting } from "../../../../components";
import { PersonalSendMsgBtn } from "./index";
import SocketEvent from "../../../../constant/socket-event";
import Global from "../../../../constant/global";
import { useCurrentUser } from "../../../../hooks";
import FollowBtn from "./follow-btn";
import UpdateAvatarBtn from "./update-avatar.btn";
import { Button } from "react-bootstrap";

const PersonalFollow = ({ userInfo, socket }) => {
  const [active, setActive] = useState("");
  const [isFollow, setIsFollow] = useState(false);
  const [isApprover, setIsApprover] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useCurrentUser();
  const [modalShow, setModalShow] = useState(false);

  const handleUserGotFollowed = (sender, userRoute) => {
    getUserByID(userRoute, dispatch).then((data) => {
      const { followers, followings } = data.user;

      const isFollower = followers.includes(sender);
      const isFollowing = followings.includes(sender);

      // If got request follow will active isApprover
      if (isFollower) {
        setIsApprover(true);
      }

      // If user who got followed also following user who sent follow will set isApprover to false and set isFollow is true
      if (isFollowing) {
        setIsApprover(false);
        setIsFollow(true);
      } else {
        // Check is user who sent follow still follow ?
        getUserByID(sender, dispatch).then((data) => {
          const { followings } = data.user;

          const isFollowing = followings.includes(userRoute);

          // If both user not follow each other will set to default btn
          if (!isFollowing) {
            setIsApprover(false);
            setIsFollow(false);
          }
        });
      }
    });
  };

  const handleUserSendFollow = (sender, userRoute) => {
    getUserByID(sender, dispatch).then((data) => {
      const { followings } = data.user;

      const isFollowing = followings.includes(userRoute);

      if (isFollowing) {
        setIsApprover(false);
        setIsFollow(true);

        const notification = {
          sender: sender,
          receiver: userRoute,
          type: NotiType.NEW_FOLLOWER,
        };

        pushNewNotification(notification, dispatch)
          .then((data) => {
            socket.emit("push-notification", data.data);
          })
          .catch((err) => {
            console.error("Failed to create new notification", err);
          });
      } else {
        // Check is user who sent follow still follow ?
        getUserByID(userRoute, dispatch).then((data) => {
          const { followings } = data.user;

          const isFollowing = followings.includes(sender);

          if (isFollowing) {
            setIsApprover(true);
          } else {
            setIsApprover(false);
            setIsFollow(false);
          }
        });
      }
    });
  };

  const handleOpenSetting = () => setActive("SETTINGS");

  const handleSocket = {
    follow: useCallback(
      (data) => {
        const { userRoute, sender } = data;

        if (userRoute === currentUser?._id) {
          handleUserGotFollowed(sender, userRoute);
        }

        if (sender === currentUser?._id) {
          handleUserSendFollow(sender, userRoute);
        }
      },
      [currentUser?._id],
    ),
  };

  useEffect(() => {
    socket = io(Global.SOCKET_URL);

    socket.on(SocketEvent.FOLLOWED, handleSocket.follow);

    return () => {
      socket.off(SocketEvent.FOLLOWED, handleSocket.follow);
    };
  }, [Global.SOCKET_URL, handleSocket.follow]);

  // Check user is approver ?
  useEffect(() => {
    let isCancelled = false;

    getUserByID(currentUser?._id, dispatch).then((data) => {
      if (!isCancelled && data) {
        const { followers, followings } = data.user;

        const checkIsApprover = followers.some((u) => u === userInfo?._id);
        const checkIsFollowedBack = followings.some((u) => u === userInfo?._id);

        checkIsApprover && !checkIsFollowedBack && setIsApprover(true);

        getUserByID(userInfo?._id, dispatch).then(() => {
          const isFollowing = followings.includes(userInfo?._id);

          setIsFollow(isFollowing);
        });
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [currentUser?._id, dispatch, userInfo?._id]);

  const createNewMsg = () => {
    const roomInfo = {
      sender: currentUser?._id,
      receiver: userInfo?._id,
      name: "Hello",
    };

    createRoom(dispatch, roomInfo);
  };

  const handleClosePopup = () => {
    setActive("");
  };

  const handleToggleModal = () => {
        setModalShow(!modalShow);
  }

  return (
    <div className="w-100 d-flex justify-content-between align-items-center flex-wrap">
      <div className="d-flex align-items-center gap-3">
        {userInfo?._id !== currentUser?._id && (
          <PersonalSendMsgBtn onClick={createNewMsg} />
        )}
        
        <div className="row gap-4">
          <FollowBtn userInfo={userInfo} socket={socket} isApprover={isApprover} isFollow={isFollow} onOpenSetting={handleOpenSetting} className="col-6" />
          {userInfo?._id === currentUser?._id && <UpdateAvatarBtn userInfo={userInfo} socket={socket} dispatch={dispatch} title="Update Avatar" className="col-6" show={modalShow} onShow={handleToggleModal} isAvatar={true}>
              <Button variant="primary" onClick={handleToggleModal} className="add-stories flex-grow-1 bg-transparent py-3 px-4 d-flex justify-content-center align-items-center rounded-3" style={{
                  color: 'var(--color-dark)'
              }}>
                  Update Avatar
              </Button>
          </UpdateAvatarBtn>}
        </div>
      </div>

      <Setting close={handleClosePopup} show={active === "SETTINGS"} onHide={() => setActive("")} />
    </div>
  );
};

export default memo(PersonalFollow, isEqual);
