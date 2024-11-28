
import React, { useState } from "react";
import { LOGO_YANJI_SOCIAL } from "../../../assets";
import Global from "../../../constant/global";
import { getUserByID } from "../../../redux/request/userRequest";
import { useDispatch } from "react-redux";
import clsx from "clsx";

const Avatar = ({
  imageSrc = "",
  label = "",
  customAttrs,
  fontSize,
  userId = "",
  size = "",
  className,
}) => {
  const dispatch = useDispatch();
  const [styleAvatar, setStyleAvatar] = useState("");

  if (userId !== Global.ADMIN_ID) {
    getUserByID(userId, dispatch).then((res) => {
      res?.user.borderAvatar && setStyleAvatar(res.user.borderAvatar);
    });
  }

  return (
    <div
      className={clsx(
        "text-white text-uppercase w-100 h-100 d-flex justify-content-center align-items-center",
        userId === Global.ADMIN_ID && "border border-3 border-danger",
        fontSize || "fs-5",
        size || "profile-pic",
        className,
      )}
      style={{
        border: `2px solid ${styleAvatar ? `${styleAvatar}` : "white"}`,
      }}
      {...customAttrs}
    >
      {imageSrc ? (
        <img
          loading="lazy"
          role="presentation"
          decoding="async"
          src={imageSrc || LOGO_YANJI_SOCIAL}
          alt={label}
          className="w-100"
          width="180"
          height="180"
        />
      ) : (
        <>{label.split("")[0]}</>
      )}
    </div>
  );
};

export default Avatar;
