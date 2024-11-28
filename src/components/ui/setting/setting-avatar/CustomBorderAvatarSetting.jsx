/* eslint-disable react/react-in-jsx-scope */

import { memo, useEffect, useRef, useState } from "react";
import isEqual from "react-fast-compare";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import { Button, Modal } from "react-bootstrap";
import {
  getColorCode,
  getValueColorVariable,
  useCurrentUser,
} from "../../../../hooks";
import { getUserByID, updateUser } from "../../../../redux/request/userRequest";
import "../setting-avatar/style/style.css";
import { colorButton } from "./data";

const saveBtnStye = {
  cursor: "pointer",
  background: "var(--color-primary)",
};

const CustomBorderAvatarSetting = ({ show, onHide }) => {
  const [borderColor, setBorderColor] = useState("");
  const [choosedColor, setChoosedColor] = useState("");

  const currentUser = useCurrentUser();
  const colorBtn = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserByID(currentUser._id, dispatch).then((res) => {
      res?.user.borderAvatar && setBorderColor(res.user.borderAvatar);
    });
  }, [currentUser]);

  const handleColorChange = (color) => {
    const variableName = getValueColorVariable(color);
    setBorderColor(variableName);
  };

  const handleUpdateUser = (userID, borderAvatar) => {
    const updatedUser = {
      userID,
      borderAvatar,
    };

    updateUser(updatedUser, dispatch)
      .then(() => {
        toast.success("Success");
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.error("Something went wrong", err);
      });
  };

  const handleSave = () => {
    const colorValue = getColorCode(borderColor, colorBtn.current);
    handleUpdateUser(currentUser._id, colorValue);
  };

  const renderColorMenu = () => {
    return Object.keys(colorButton).map((color) => (
      <div
        type="button"
        title={color}
        key={color}
        ref={colorBtn}
        className={`d-flex justify-content-center align-items-center color-button rounded-circle ${choosedColor === colorButton[color] && "border border-3 border-light"}`}
        style={colorButton[color]}
        onClick={() => {
          handleColorChange(colorButton[color].backgroundColor);
          setChoosedColor(colorButton[color]);
        }}
      ></div>
    ));
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton className="text-black">
        <div className="fs-2">Choose your avatar style</div>
      </Modal.Header>
      <Modal.Body onClick={(e) => e.stopPropagation()}>
        <div className="d-flex justify-content-center gap-3 my-2">
          {renderColorMenu()}
        </div>
      </Modal.Body>

      <Modal.Footer className="flex align-items-center gap-2">
        <Button
          className="py-2 px-5 rounded-3 fs-3 bg-body text-black"
          // onClick={close}
          onClick={onHide}
        >
          Close
        </Button>

        <Button
          className="py-2 px-5 rounded-3 fs-3 text-white"
          style={saveBtnStye}
          onClick={handleSave}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default memo(CustomBorderAvatarSetting, isEqual);
