
/* eslint-disable react/react-in-jsx-scope */
import { memo } from "react";
import isEqual from "react-fast-compare";
import { Link } from "react-router-dom";
import { Avatar } from "../../../../../../ui";

const followingListStyle = {
  maxHeight: "500px",
  overflowY: "auto",
};

const FollowingList = ({ user, currentUser }) => {
  return (
    currentUser && (
      <div
        className="sidebar p-3 overflowXHidden mb-3"
        style={followingListStyle}
      >
        <ul className="p-2 mb-0 gap-3 d-flex flex-column">
          <FollowingItem user={user} />
        </ul>
      </div>
    )
  );
};

const FollowingItem = ({ user }) => {
  return user.map((user) => (
    <li key={user?._id} className="hover-bg">
      <Link
        to={`/user/${user?._id}`}
        className="d-flex align-items-center fs-5 text-white w-full p-2 px-3 rounded-3 border border-1"
        key={user?._id}
      >
        <div className="profile-pic d-flex justify-content-center align-items-center me-3">
          <Avatar
            userId={user?._id}
            imageSrc={user?.profilePicture}
            label={user?.username}
          />
        </div>
        <span
          style={{
            color: "var(--color-primary)",
          }}
        >
          {user?.username}
        </span>
      </Link>
    </li>
  ));
};

export default memo(FollowingList, isEqual);
