import { memo, useEffect, useState } from "react";
import isEqual from "react-fast-compare";
import { useDispatch } from "react-redux";

import { getUserByID } from "../../../../../redux/request/userRequest";


// SETTINGS
import Sidebar from "components/layouts/sidebar";
import { CustomTheme, Setting } from "components/ui";
import PostPopup from "components/ui/popup/post/post";
import { LocalStorageKeys } from "constant/local-storage-key";
import { useCurrentUser } from "hooks";
import { MENU_NAME } from "../../constant/menu";
import SmallProfile from "./components/small-profile";

const HomeLeft = ({ socket, isReadNotification }) => {
  const [active, setActive] = useState(MENU_NAME.HOME);
  const [avatar, setAvatar] = useState("");
  const [popup, setPopup] = useState(false);
  const [user, setUser] = useState();
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
        if (!data?.user) return;

        const { _id, profilePicture, username, isVerify } = data.user;
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
  const handleOpenSettingProfile = () => {
    setActive("");
  };

  const renderSettingPopup = () => {
    return (
      <Setting
        onHide={handleOpenSettingProfile}
        show={active === MENU_NAME.SETTINGS}
      />
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
        <SmallProfile
          isReadNotification={isReadNotification}
          user={user}
          activeSidebar={active}
          onActiveSidebar={setActive}
          handlePopup={handlePopup}
        />
        <Sidebar
          active={active}
          setActive={setActive}
          isReadNotification={isReadNotification}
        />
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
