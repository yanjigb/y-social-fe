/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { memo, useEffect, useRef, useState } from "react";
import isEqual from "react-fast-compare";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";

import "./styles/postPopup.css";

import Global from "../../../../constant/global";
import { NotiType } from "../../../../constant/notification";
import {
  useCurrentUser,
  useFollowerList,
  useUploadImage,
} from "../../../../hooks";
import { pushNewNotification } from "../../../../redux/request/notificationRequest";
import { uploadPost } from "../../../../redux/request/postRequest";
import { getUserByID } from "../../../../redux/request/userRequest";
import Action from "./components/form/action";
import Attachments from "./components/form/attachments";
import Author from "./components/form/author";
import Content from "./components/form/content";
import Media from "./components/form/media";

const PostPopup = ({ onPopup, extendClass, socket }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageSrc, setImageSrc] = useState("");
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoSrc, setVideoSrc] = useState("");
  const [content, setContent] = useState("");
  const [active, setActive] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    profilePicture: "",
    username: "",
  });
  const uploadImg = useRef(null);
  const dispatch = useDispatch();
  const [followers, setFollowers] = useState([]);
  const currentUser = useCurrentUser();
  const { fetchFollowerList } = useFollowerList({
    setFollowers,
    currentUserID: currentUser._id,
    dispatch,
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const imgUrl = URL.createObjectURL(file);

    if (file.type === "video/mp4") {
      // For upload cloud
      setVideoUrl(file);
      // For preview video
      setVideoSrc(imgUrl);
    } else {
      // For upload cloud
      setImageUrl(file);
      // For preview image
      setImageSrc(imgUrl);
    }
  };

  const handleUploadImgFile = () => {
    if (uploadImg.current) {
      console.log("Clicking the file input");
      uploadImg.current.click();
    }
  };

  useEffect(() => {
    currentUser &&
      getUserByID(currentUser._id, dispatch).then((data) => {
        const { username, profilePicture } = data.user;

        setUser({
          username: username,
          profilePicture: profilePicture,
        });
      });
  }, [dispatch, currentUser]);

  const handleSendEmoji = (e) => {
    const sym = e.unified.split("_");
    const codeArray = [];

    sym.forEach((el) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);

    if (content.length < 5000) {
      setContent(content + emoji);
    }
  };

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  const cloudStorage = useUploadImage;

  const notifyFollower = (user) => {
    const notification = {
      sender: currentUser?._id,
      receiver: user?._id,
      type: NotiType.NEW_POST,
    };

    pushNewNotification(notification, dispatch)
      .then((data) => {
        socket.emit("push-notification", data.data);
      })
      .catch((err) => {
        console.error("[NOTIFY_FOLLOWER_POST_POPUP]", err);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newPost = {
      userID: currentUser._id,
      desc: content,
    };

    if (imageSrc) {
      const result = await cloudStorage(imageUrl);
      const imageURL = result?.secure_url;
      newPost.img = imageURL;
    }
    if (videoSrc) {
      const result = await cloudStorage(videoUrl, true);
      const videoURL = result?.secure_url;
      newPost.video = videoURL;
    }

    uploadPost(newPost, dispatch)
      .then(async (data) => {
        socket = io(Global.SOCKET_URL);

        await socket.emit("upload-post", data?.data);

        followers.forEach((user) => notifyFollower(user));
      })
      .catch((err) => console.error("Failed to upload post", err));

    setIsLoading(false);
    onPopup();
  };

  const handleDeleteImage = () => {
    setImageSrc("");
    uploadImg.current.value = null;
  };

  useEffect(() => {
    fetchFollowerList();
  }, [fetchFollowerList]);

  return (
    <div
      className={
        "d-flex justify-content-center align-items-center post-popup__container " +
        extendClass
      }
      onClick={onPopup}
    >
      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Author currentUser={currentUser} onPopup={onPopup} user={user} />
        <Content content={content} user={user} onChangeContent={handleChangeContent} />
        <Attachments
          onOpenImgFile={handleUploadImgFile}
          uploadImgRef={uploadImg}
          active={active}
          onActive={setActive}
          onChooseEmoji={handleSendEmoji}
          onUploadImage={handleImageUpload}
        />
        <Media imageSrc={imageSrc} videoSrc={videoSrc} onDeleteImage={handleDeleteImage} />
        <Action isLoading={isLoading} isEmptyContent={content} isImageSrc={imageSrc} isVideoSrc={videoSrc} />
      </form>
    </div>
  );
};

export default memo(PostPopup, isEqual);
