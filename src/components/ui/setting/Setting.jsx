import { memo, useEffect, useRef, useState } from "react";
import { UilSetting } from "@iconscout/react-unicons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import isEqual from "react-fast-compare";

import { logout } from "../../../redux/request/authRequest";
import { getUserByID, updateUser } from "../../../redux/request/userRequest";
import { useCurrentUser } from "../../../hooks";
import { Button, Modal } from "react-bootstrap";
import PublicInformation from "./public-information";
import toast from "react-hot-toast";
import ManagerAccount from "./manager-account";
import SecurityAndData from "./security-and-data";
import Logout from "./logout";

// TODO CHANGE BG DANGER OF POPUP WHEN UPDATE USER FAILED

const Setting = ({ close, onHide, show }) => {
  const [active, setActive] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    bio: "",
  });
  const [isChange, setIsChange] = useState(false);
  const currentUser = useCurrentUser();

  useEffect(() => {
    getUserByID(currentUser?._id, dispatch).then((data) => {
      if (data) {
        setUserInfo(data.user);
      }
    });
  }, [currentUser?._id, dispatch]);

  useEffect(() => {
    userInfo &&
      getUserByID(currentUser?._id, dispatch).then((data) => {
        if (data) {
          const { username, firstName, lastName, email, password, bio } =
            data.user;

          if (
            username !== userInfo.username ||
            firstName !== userInfo.firstName ||
            lastName !== userInfo.lastName ||
            email !== userInfo.email ||
            password !== userInfo.password ||
            bio !== userInfo.bio
          ) {
            setIsChange(true);

          }
        }
      });
  }, [userInfo, currentUser?._id, dispatch]);

  const snackBar = useRef(null);

  const handleUpdateUser = () => {
    if (!isChange) return;

    getUserByID(currentUser?._id, dispatch).then((data) => {
      if (data) {
        const { username, firstName, lastName, email, password, bio } =
          data.user;
        if (
          username !== userInfo.username ||
          firstName !== userInfo.firstName ||
          lastName !== userInfo.lastName ||
          email !== userInfo.email ||
          password !== userInfo.password ||
          bio !== userInfo.bio
        ) {
          let updatedUser = {
            userID: currentUser?._id,
            username: userInfo.username,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            email: userInfo.email,
            password: userInfo.password,
            bio: userInfo.bio,
          };

          updateUser(updatedUser, dispatch)
            .then((data) => {
              toast.success("Update successfully");
            })
            .catch((err) => {
              console.error("Failed to update", err);
              toast.error("Something went wrong");
            }).finally(() => {
              setActive("");
              setIsChange(false);
            }
            );
        }
      }
    });
  };

  const handleLogout = () => {
    logout(dispatch, navigate);
    close();
  };

  // const renderLogoutContent = () => {
  //   return (
  //     <div className="d-flex flex-column align-items-center">
  //       <h2 className="fw-bold">Logout now ?</h2>
  //       <div
  //         role="button"
  //         className="mt-4 bg-danger p-3 px-4 text-white hover-bg"
  //         style={{
  //           width: "max-content",
  //           borderRadius: "0.5rem",
  //         }}
  //         onClick={() => handleLogout()}
  //       >
  //         Logout
  //       </div>
  //     </div>
  //   );
  // };

  const handleCloseModal = () => setActive("");

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        centered
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <div className="fs-3 text-black text-uppercase d-flex align-items-center fs-2">
            <UilSetting /> <h2 className="ms-2 mb-0">Setting</h2>
          </div>
        </Modal.Header>

        <Modal.Body
          style={{
            background: "var(--color-white)",
            color: "var(--color-dark)"
          }}
          className="p-5"
        >
          <div className="row gap-4">
            <Button
              style={{
                background: "var(--color-white)",
                color: "var(--color-dark)"
              }}
              className="rounded-3 py-4 fs-3 col"
              onClick={() => setActive("PUBLIC")}
            >
              Public information
            </Button>

            <Button
              style={{
                background: "var(--color-white)",
                color: "var(--color-dark)"
              }}
              className="rounded-3 py-4 fs-3 col"
              onClick={() => setActive("MANAGER")}
            >
              Manager account
            </Button>

            <Button
              style={{
                background: "var(--color-white)",
                color: "var(--color-dark)"
              }}
              className="rounded-3 py-4 fs-3"
              onClick={() => setActive("SECURE")}
            >
              Security and Data
            </Button>

            <Button
              style={{
                background: "var(--color-white)",
                color: "var(--color-dark)"
              }}
              onClick={() => setActive("LOGOUT")}
              className="rounded-3 py-4 mt-5 fs-3 bg-danger border-0 text-white"
            >
              Logout
            </Button>
          </div>

          <PublicInformation
            show={active === "PUBLIC"}
            onHide={handleCloseModal}
            userInfo={userInfo}
            onSetUserInfo={setUserInfo}
            onUpdateUser={handleUpdateUser}
          />
          <ManagerAccount
            show={active === "MANAGER"}
            onHide={handleCloseModal}
            userInfo={userInfo}
            onSetUserInfo={setUserInfo}
            onUpdateUser={handleUpdateUser}
          />
          <SecurityAndData
            show={active === "SECURE"}
            onHide={handleCloseModal}
          />
          <Logout
            show={active === "LOGOUT"}
            onHide={handleCloseModal}
            onLogout={handleLogout}
          />
        </Modal.Body>
      </Modal>

      <div
        ref={snackBar}
        id="snackbar"
        style={{
          backgroundColor: isChange
            ? "var(--color-success)"
            : "var(--color-danger)",
        }}
        className="fw-bold"
      >
        Update {userInfo?.username} {isChange ? "successfully" : "Failed :<"}
      </div>
    </>
  );
};

export default memo(Setting, isEqual);
