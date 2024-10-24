/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import clsx from "clsx";
import { memo } from "react";
import isEqual from "react-fast-compare";
import { Link } from "react-router-dom";
import { RouteNames } from "../../../../../../constant/routes";
import { Avatar } from "../../../../../ui";

function InputStatus({
  currentUser,
  user,
  onPopup,
  renderPostPopup,
  className,
}) {
  return (
    <div
      className={clsx(
        "create-post align-items-center mb-4 px-4 py-2",
        {
          "d-none": currentUser === undefined,
          "d-flex": currentUser !== undefined,
        },
        className,
      )}
    >
      {
        currentUser ? 
          <StatusBar currentUser={currentUser} user={user} onPopup={onPopup} />
          : <StatusBarSKeleton />
      }
      {renderPostPopup()}
    </div>
  );
}

const StatusBar = ({ currentUser, user, onPopup }) => {
  return (
    <>
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
          What&apos;s in your mind, {currentUser?.username || " user"}?
        </div>
      </div>

      <div className="submit d-flex align-items-center" title="Đăng bài viết">
        {currentUser ? (
          <button onClick={onPopup} type="submit" className="btn btn-primary">
            Post
          </button>
        ) : (
          <Link to={RouteNames.LOGIN} className="btn btn-primary">
            Post
          </Link>
        )}
      </div>
    </>
  )
}

function StatusBarSKeleton() {
  return (
    <>
      <div className="w-full flex items-center animate-pulse">
        <div className="h-12 w-12 bg-gray-200 rounded-full"></div>

        <div className="border-0 ps-3 me-3 ms-3 h-6 mt-3 bg-gray-200 rounded w-3/4"></div>

      </div>

      <div className="d-flex align-items-center mt-3">
        <div className="h-10 w-20 bg-gray-200 rounded" />
      </div>
    </>
  )
}

export default memo(InputStatus, isEqual);
