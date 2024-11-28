

import { ClipboardList, Pencil, Trash } from "lucide-react";
import { memo } from "react";
import isEqual from "react-fast-compare";
import Global from "../../../../constant/global";
import { useCopyUrl } from "../../../../hooks";

/* eslint-disable react/react-in-jsx-scope */
const PostSettings = ({
  currentUser,
  postID,
  isOpen,
  user,
  onPopup,
  userID,
}) => {
  const onDeletePost = () => {
    if (isOpen !== "DELETE_POST") {
      onPopup("DELETE_POST");
    } else {
      onPopup("");
    }
  };

  const onEditPost = () => {
    if (isOpen !== "EDIT") {
      onPopup("EDIT");
    } else {
      onPopup("");
    }
  };

  const onCopy = (e) => {
    e.stopPropagation();
    useCopyUrl(Global.DEPLOY_URL + "post/" + postID);
  };

  return (
    <div className="edit-post" hidden={!isOpen}>
      <ul>
        {currentUser?._id === user?._id && (
          <>
            <li
              className="delete-post"
              onClick={(e) => {
                e.stopPropagation();
                onDeletePost();
              }}
              title="Delete post"
            >
              <span>
                <Trash size={20} />
              </span>
              Delete this post
            </li>
            <li
              onClick={(e) => {
                e.stopPropagation();
                onEditPost();
              }}
              title="Edit post"
            >
              <span>
                <Pencil size={20} />
              </span>
              Edit this post
            </li>
          </>
        )}
        <li
          onClick={onCopy}
          style={{
            borderRadius:
              currentUser?._id === userID ? "" : "var(--card-border-radius)",
          }}
          title="Copy url"
        >
          <span>
            <ClipboardList size={20} />
          </span>
          Copy url
        </li>
      </ul>
    </div>
  );
};

export default memo(PostSettings, isEqual);
