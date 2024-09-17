import clsx from "clsx";
import { memo, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import isEqual from "react-fast-compare";
import { useCurrentUser, useUploadImage } from "../../../../hooks";
import Global from "../../../../constant/global";
import { updateUser } from "../../../../redux/request/userRequest";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import UpdateAvatarModal from "./update-avatar-modal";

function UpdateAvatarBtn({ userInfo, socket, dispatch, children, show, onShow, isCover = false, isAvatar = false }) {
    const currentUser = useCurrentUser();
    const { _id, profilePicture, coverPicture } = userInfo
    const isCurrentUser = _id === currentUser?._id;
    const [previewImg, setPreviewImg] = useState("");
    const [media, setMedia] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const cloudStorage = useUploadImage;

    const autoReload = (miliseconds) => {
        setTimeout(() => {
            window.location.reload();
        }, miliseconds);
    }

    const onUpdate = async () => {
        setIsLoading(true);

        const result = await cloudStorage(media);
        const newMedia = result?.secure_url;

        const newUpdateUser = {
            userID: currentUser._id,
        };

        if(isCover) {
            newUpdateUser.coverPicture = newMedia
        }

        if(isAvatar) {
            newUpdateUser.profilePicture = newMedia
        }

        updateUser(newUpdateUser, dispatch)
            .then((data) => {
                setIsLoading(false);

                const { _id, coverPicture, profilePicture } = data.data;

                const updatedUser = {
                    userID: _id,
                    coverPicture: coverPicture,
                    profilePicture: profilePicture,
                };

                socket = io(Global.SOCKET_URL);
                socket.emit("update-user", updatedUser);

                toast.success("Updated Success", {
                    className: "fs-3",
                });
                autoReload(3000)
            })
            .catch((err) => {
                toast.error("Something went wrong", {
                    className: "fs-3",
                });
                console.error("Internal Error", err);
            });
    }

    const handleUploadMedia = (e) => {
        const file = e.target.files[0];

        const previewImgURL = URL.createObjectURL(file);

        setPreviewImg(previewImgURL);
        setMedia(file);
    };

    return <>
        {children}
        {isCurrentUser && <UpdateAvatarModal title={isAvatar ? "Update Avatar" : "Update Cover"} previewImg={previewImg} userMedia={isAvatar ? profilePicture : coverPicture} onUpdate={onUpdate} onToggle={onShow} isLoading={isLoading} show={show} onUploadAvatar={handleUploadMedia} />}
    </>
}

export default memo(UpdateAvatarBtn, isEqual)
