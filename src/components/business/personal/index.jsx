import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import isEqual from "react-fast-compare";

import "./styles/personal.css";

import { getUserByID, updateUser } from "../../../redux/request/userRequest";

import {
  PersonalBody,
  PersonalGeneralInfo,
  PersonalHeader,
  PersonalNavbarProfile,
} from "./components";
import _404Page from "../_404";
import { PhotosUser } from "../../../components";

import Global from "../../../constant/global";
import { useCurrentUser } from "../../../hooks";
import { RouteNames } from "../../../constant/routes";
import Header from "../../../components/layouts/header";
import { UserInitialize } from "./constant/initialize";
import EditBioModal from "./components/edit-bio-modal";
import EditIntroduceModal from "./components/edit-introduce-modal";

const Personal = ({ socket }) => {
  const { userID: userRoute } = useParams();
  const { photos: photosRoute } = useParams();

  const [userInfo, setUserInfo] = useState(UserInitialize);
  const [isValid, setIsValid] = useState(true);
  const [active, setActive] = useState("");
  const dispatch = useDispatch();
  const currentUser = useCurrentUser();
  const toggleModal = () => setActive("");

  useEffect(() => {
    getUserByID(userRoute, dispatch)
      .then((data) => {
        setIsValid(true);
        setUserInfo(data.user);
      })
      .catch((err) => {
        setIsValid(false);
        console.error("User is not valid", err);
      });
  }, [userRoute, dispatch]);

  const onUpdateBioPopup = () => {
    setActive("UPDATE_BIO");
  };

  const onUpdateIntroducePopup = () => {
    setActive("UPDATE_INTRODUCE");
  };

  const handleUpdateBio = () => {
    getUserByID(currentUser._id, dispatch).then((data) => {
      const {
        bio,
        insta,
        linkedin,
        github,
        pinterest,
        youtube,
        twitter,
        twitch,
      } = data.user;

      if (bio !== userInfo.bio) {
        let updatedUser = {
          userID: currentUser._id,
          bio: userInfo.bio,
          insta,
          linkedin,
          github,
          pinterest,
          youtube,
          twitter,
          twitch,
        };

        if (userInfo.bio.length === 0) {
          updatedUser = {
            userID: currentUser._id,
            bio: "",
            insta,
            linkedin,
            github,
            pinterest,
            youtube,
            twitter,
            twitch,
          };
        }

        updateUser(updatedUser, dispatch)
          .then(() => {
            socket = io(Global.SOCKET_URL);
            socket.emit("update-user", updatedUser);
          })
          .catch((err) => {
            console.error("Failed to update user", err);
          });
      }

      setTimeout(() => {
        setActive("");
      }, 1500);
    });
  };

  const handleUpdateIntroduce = () => {
    getUserByID(currentUser._id, dispatch).then((data) => {
      const {
        insta,
        linkedin,
        github,
        pinterest,
        youtube,
        twitter,
        twitch,
        bio,
      } = data.user;

      if (
        insta !== userInfo.insta ||
        linkedin !== userInfo.linkedin ||
        github !== userInfo.github ||
        pinterest !== userInfo.pinterest ||
        youtube !== userInfo.youtube ||
        twitter !== userInfo.twitter ||
        twitch !== userInfo.twitch
      ) {
        let updatedUser = {
          userID: currentUser._id,
          insta: userInfo.insta,
          linkedin: userInfo.linkedin,
          github: userInfo.github,
          pinterest: userInfo.pinterest,
          youtube: userInfo.youtube,
          twitter: userInfo.twitter,
          twitch: userInfo.twitch,
          bio,
        };

        if (userInfo.insta.length === 0) {
          updatedUser = {
            userID: currentUser._id,
            insta: "",
            linkedin: userInfo.linkedin,
            github: userInfo.github,
            pinterest: userInfo.pinterest,
            youtube: userInfo.youtube,
            twitter: userInfo.twitter,
            twitch: userInfo.twitch,
            bio: userInfo.bio,
          };
        }

        updateUser(updatedUser, dispatch)
          .then(() => {
            socket = io(Global.SOCKET_URL);
            socket.emit("update-user", updatedUser);
          })
          .catch((err) => {
            console.error("Failed to update user", err);
          });
      }

      setTimeout(() => {
        setActive("");
      }, 1500);
    });
  };

  const handleChangeUserInfo = (e) => {
    setUserInfo((prevUser) => ({
      ...prevUser,
      bio: e.target.value,
      })
    )
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return isValid ? (
    <div className="position-relative">
      <Header title="Login" link={RouteNames.REGISTER} />
      <div className="personal-container">
        <PersonalHeader userInfo={userInfo} socket={socket} />
        <PersonalGeneralInfo userInfo={userInfo} socket={socket} />

        <hr className="my-5" />

        <PersonalNavbarProfile />

        {photosRoute ? (
          <PhotosUser userInfo={userInfo} />
        ) : (
          <PersonalBody
            socket={socket}
            userInfo={userInfo}
            onUpdateBioPopup={onUpdateBioPopup}
            onUpdateIntroducePopup={onUpdateIntroducePopup}
          />
        )}
      </div>

      <EditBioModal onUpdate={handleUpdateBio} title="Update Bio" onToggle={toggleModal} onChangeUserInfo={handleChangeUserInfo} userInfo={userInfo} show={active === "UPDATE_BIO"} />
      <EditIntroduceModal onUpdate={handleUpdateIntroduce} title="Update Introduce" onToggle={toggleModal} userInfo={userInfo} show={active === "UPDATE_INTRODUCE"} onChangeSocialLink={handleInputChange}/>
    </div>
  ) : (
    <_404Page />
  );
};

export default memo(Personal, isEqual);
