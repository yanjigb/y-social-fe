
/* eslint-disable react/react-in-jsx-scope */
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faPinterest,
  faTwitch,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { memo, useCallback, useEffect, useState } from "react";
import isEqual from "react-fast-compare";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";

import "../styles/personalIntroduce.css";

import { SocialBio } from "../../../../components";
import Global from "../../../../constant/global";
import { RouteNames } from "../../../../constant/routes";
import SocketEvent from "../../../../constant/socket-event";
import { useCurrentUser } from "../../../../hooks";
import { getUserByID } from "../../../../redux/request/userRequest";

const PersonalIntroduce = ({
  onUpdateBioPopup,
  socket,
  onUpdateIntroducePopup,
  userInfo,
}) => {
  const dispatch = useDispatch();
  const [socialBio, setSocialBio] = useState({
    bio: userInfo.bio,
    insta: userInfo.insta,
    linkedin: userInfo.linkedin,
    github: userInfo.github,
    pinterest: userInfo.pinterest,
    youtube: userInfo.youtube,
    twitter: userInfo.twitter,
    twitch: userInfo.twitch,
  });
  const currentUser = useCurrentUser();

  const handleSocket = {
    updateUser: useCallback((data) => {
      setSocialBio((prevUser) => ({
        ...prevUser,
        ...data,
      }));
    }, []),
  };

  useEffect(() => {
    socket = io(Global.SOCKET_URL);

    socket.on(SocketEvent.UPDATED_USER, handleSocket.updateUser);

    return () => {
      socket.off(SocketEvent.UPDATED_USER, handleSocket.updateUser);
    };
  }, [handleSocket.updateUser]);

  const introduceInfo = [
    {
      id: 1,
      username: socialBio?.insta,
      icon: faInstagram,
      href: RouteNames.INSTAGRAM + socialBio?.insta,
    },
    {
      id: 2,
      username: socialBio?.linkedin,
      icon: faLinkedin,
      href: RouteNames.LINKEDIN + socialBio?.linkedin,
    },
    {
      id: 3,
      username: socialBio?.github,
      icon: faGithub,
      href: RouteNames.GITHUB + socialBio?.github,
    },
    {
      id: 4,
      username: socialBio?.pinterest,
      icon: faPinterest,
      href: RouteNames.PINTEREST + socialBio?.pinterest,
    },
    {
      id: 5,
      username: socialBio?.youtube,
      icon: faYoutube,
      href: RouteNames.YOUTUBE + socialBio?.youtube,
    },
    {
      id: 6,
      username: socialBio?.twitter,
      icon: faTwitter,
      href: RouteNames.TWITTER + socialBio?.twitter,
    },
    {
      id: 7,
      username: socialBio?.twitch,
      icon: faTwitch,
      href: RouteNames.TWITCH + socialBio?.twitch,
    },
  ];

  useEffect(() => {
    userInfo?._id &&
      getUserByID(userInfo?._id, dispatch).then((data) => {
        setSocialBio({
          ...data?.user,
        });
      });
  }, [userInfo?._id, dispatch]);

  const renderIntroduceInfo = () => {
    return introduceInfo.map(
      (item) =>
        item.username && (
          <SocialBio
            key={item.id}
            icon={item.icon}
            link={item.href}
            username={item.username}
          />
        ),
    );
  };

  return (
    <>
      <p className="fs-1 fw-bold">Introduce</p>

      <div className="w-100">
        <div className="d-flex flex-column align-items-center fs-4">
          <p className="inline-block text-break">{socialBio?.bio}</p>
        </div>
        {currentUser?._id === userInfo?._id && (
          <button className="mb-4 mt-2" onClick={() => onUpdateBioPopup()}>
            Edit bio
          </button>
        )}
      </div>

      <div className="border-bottom pb-2 mb-4">{renderIntroduceInfo()}</div>

      {currentUser?._id === userInfo?._id && (
        <button className="my-4" onClick={() => onUpdateIntroducePopup()}>
          Edit Details
        </button>
      )}
    </>
  );
};

export default memo(PersonalIntroduce, isEqual);
