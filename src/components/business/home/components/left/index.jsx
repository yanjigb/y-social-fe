import { Link } from "react-router-dom";
import { useState, useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import {
  CheckCircle2,
} from "lucide-react";
import isEqual from "react-fast-compare";

import { getUserByID } from "../../../../../redux/request/userRequest";

import { LOGO_YANJI_SOCIAL } from "../../../../../assets";

// SETTINGS
import { Avatar, CustomTheme, Setting } from "../../../../ui";
import PostPopup from "../../../../ui/popup/post";
import { useCurrentUser } from "../../../../../hooks";
import { RouteNames } from "../../../../../constant/routes";
import { LocalStorageKeys } from "../../../../../constant/local-storage-key";
import Sidebar from "../../../../layouts/sidebar";
import { UserInitialize } from "../../constant/initialize";
import { MENU_NAME } from "../../constant/menu";

const HomeLeft = ({ socket, isReadNotification }) => {
  const [active, setActive] = useState(MENU_NAME.HOME);
  const [avatar, setAvatar] = useState("");
  const [popup, setPopup] = useState(false);
  const [user, setUser] = useState(UserInitialize);
  const dispatch = useDispatch();
  const currentUser = useCurrentUser();

  // CLEANUP URL WHEN CHANGE IMG
  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar]);

  // SAVE IMG TO LOCAL
  useEffect(() => {
    avatar && window.localStorage.setItem(LocalStorageKeys.AVATAR, avatar);
  }, [avatar]);

  // GET IMG FROM LOCAL
  useEffect(() => {
    const data = window.localStorage.getItem(LocalStorageKeys.AVATAR);
    setAvatar(data);
  }, [avatar]);

  useEffect(() => {
    currentUser &&
      getUserByID(currentUser._id, dispatch).then((data) => {
        const { _id, profilePicture, username, isVerify } = data?.user;
        setUser({
          _id: _id,
          profilePicture: profilePicture,
          username: username,
          isVerify: isVerify,
        });
      });
  }, [currentUser, dispatch]);

  const renderCustomThemePopup = () => {
    return (
      <div
        className="customize-theme"
        hidden={active !== MENU_NAME.THEME}
        onClick={() => setActive(MENU_NAME.HOME)}
      >
        <CustomTheme />
      </div>
    );
  };

  const handleClosePopup = () => {
    setActive("");
  };

  const renderSettingPopup = () => {
    return (
      <div
        className="customize-theme"
        hidden={active !== MENU_NAME.SETTINGS}
        onClick={() => setActive(MENU_NAME.HOME)}
      >
        <Setting close={handleClosePopup} />
      </div>
    );
  };

  const handlePopup = () => {
    setPopup((popup) => !popup);
  };

  const renderPostPopup = () => {
    return (
      currentUser?._id &&
      popup && (
        <PostPopup
          socket={socket}
          onPopup={handlePopup}
          extendClass="animate__animated animate__fadeIn"
        />
      )
    );
  };

  return (
    <>
      <div className="left animate__animated animate__bounceInLeft">
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
            <h4 className="d-flex align-items-center">
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

        {/* SIDEBAR */}
        <Sidebar active={active} setActive={setActive} isReadNotification={isReadNotification} />
        {/* END OF SIDEBAR */}

        <label
          htmlFor="create-post"
          className="btn btn-primary mt-3 py-3 d-none d-lg-block"
          onClick={handlePopup}
        >
          Create Post
        </label>
      </div>

      {renderCustomThemePopup()}
      {renderPostPopup()}
      {renderSettingPopup()}
    </>
  );
};

export default memo(HomeLeft, isEqual);
