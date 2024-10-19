/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { X } from "lucide-react";
import { memo } from "react";
import isEqual from "react-fast-compare";
import { Avatar } from "../../../../..";

const Author = ({ user, currentUser, onPopup }) => {
  return (
    <div className="form__name d-flex justify-content-between">
      <div className="d-flex">
        <span className="avatar d-flex justify-content-center align-items-center text-white">
          <Avatar
            imageSrc={user?.profilePicture}
            label={user?.username}
            userId={currentUser?._id}
          />
        </span>
        <div className="ms-3">
          <span className="text-white text-bold fs-4">
            {user.username || currentUser.username}
          </span>
          <div className="form__status d-flex align-items-center mt-1 text-white fw-bold">
            Upload post
          </div>
        </div>
      </div>
      <span className="form__title-icon px-2 mb-4" onClick={onPopup}>
        <X size={20} />
      </span>
    </div>
  );
};

export default memo(Author, isEqual);
