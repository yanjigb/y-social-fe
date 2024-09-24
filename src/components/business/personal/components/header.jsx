import { useRef, useState, memo } from "react";
import { Camera } from "lucide-react";
import isEqual from "react-fast-compare";

import "../styles/personalHeader.css";

import { useCurrentUser } from "../../../../hooks";
import Banner from "./banner";
import UpdateAvatarBtn from "./update-avatar.btn";
import { useDispatch } from "react-redux";

const PersonalHeader = ({ userInfo, socket }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const currentUser = useCurrentUser();
  const dispatch = useDispatch();

  const handlePopup = () => {
    userInfo?._id === currentUser?._id && setOpenPopup(!openPopup);
  };

  const snackBar = useRef(null);

  return (
    <div className="cover position-relative">
      <span className="w-100 h-100">
        <div className="cover-picture bg-black text-white d-flex justify-content-center align-items-center">
          <Banner bannerUrl={userInfo?.coverPicture} />
        </div>

        <UpdateAvatarBtn userInfo={userInfo} socket={socket} dispatch={dispatch} show={openPopup} onShow={handlePopup} isCover={true}>
            <div
              className="edit-cover d-flex align-items-center justify-content-center"
              onClick={handlePopup}
            >
              <Camera size={20} className="me-2" />
              Edit cover
            </div>
        </UpdateAvatarBtn>
      </span>
{/* 
      <div
        ref={snackBar}
        id="snackbar"
        style={{
          backgroundColor: "var(--color-success)",
        }}
        className="fw-bold"
      >
        Update cover successfully
      </div> */}
    </div>
  );
};

export default memo(PersonalHeader, isEqual);
