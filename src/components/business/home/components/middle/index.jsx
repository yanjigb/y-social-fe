/* eslint-disable react/prop-types */
// import { Link } from "react-router-dom";
import { Suspense, lazy, memo, useEffect, useState } from "react";
import isEqual from "react-fast-compare";
import { useDispatch } from "react-redux";

import { getUserByID } from "../../../../../redux/request/userRequest";

import { useCurrentUser } from "../../../../../hooks";
// import { Avatar } from "../../../../../components";
import PostPopup from "../../../../ui/popup/post/post";
// import { RouteNames } from "../../../../../constant/routes";
import clsx from "clsx";
import LoadingPage from "../../../../common/loading/loading-page";
import InputStatus from "./components/input-status";
const Posts = lazy(() => import("../../../../../components/ui/post/Posts"));

const HomeMiddle = ({ socket, className }) => {
  const userDefaultValues = {
    _id: "",
    profilePicture: "",
    username: "",
  };

  const [popup, setPopup] = useState(false);
  const [user, setUser] = useState(userDefaultValues);
  const dispatch = useDispatch();
  const currentUser = useCurrentUser();

  const handlePopup = () => {
    setPopup((popup) => !popup);
  };

  useEffect(() => {
    currentUser &&
      getUserByID(currentUser?._id, dispatch).then((data) => {
        const { _id, profilePicture, username } = data.user;

        setUser({
          _id,
          profilePicture,
          username,
        });
      });
  }, [currentUser, dispatch]);

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
    <div
      className={clsx(
        "middle animate__animated animate__fadeIn position-relative",
        className,
      )}
    >
      <InputStatus
        currentUser={currentUser}
        user={user}
        onPopup={handlePopup}
        renderPostPopup={renderPostPopup}
      />
      <Suspense fallback={<LoadingPage />}>
        <Posts socket={socket} />
      </Suspense>
    </div>
  );
};

export default memo(HomeMiddle, isEqual);
