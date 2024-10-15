/* eslint-disable react/prop-types */
import React, { memo, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import isEqual from "react-fast-compare";

function ManagerAccount({
  onSetUserInfo,
  userInfo,
  show,
  onHide,
  onUpdateUser,
}) {
  const passwordRef = useRef(null);

  const showPassword = () => {
    if (passwordRef.current) {
      if (passwordRef.current.type === "password") {
        passwordRef.current.type = "text";
      } else {
        passwordRef.current.type = "password";
      }
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="text-black">
        <h2>Manage Account</h2>
      </Modal.Header>

      <Modal.Body
        style={{
          background: "var(--color-white)",
          color: "var(--color-dark)",
        }}
        className="d-flex gap-3 flex-column"
      >
        <div className="d-flex flex-column align-items-start">
          <label className="mb-2 fs-3" htmlFor="email">
            Email (private)
          </label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="p-2 px-3 w-100 fs-4"
            style={{
              borderRadius: "0.5rem",
            }}
            defaultValue={userInfo?.email}
            onChange={(e) =>
              onSetUserInfo((prevUser) => ({
                ...prevUser,
                email: e.target.value,
              }))
            }
          />
        </div>

        <div className="d-flex flex-column align-items-start">
          <label className="mb-2 fs-3" htmlFor="Password">
            Password
          </label>
          <input
            type="password"
            id="Password"
            className="p-2 px-3 w-100 fs-4"
            style={{
              borderRadius: "0.5rem",
            }}
            defaultValue={userInfo?.password}
            ref={passwordRef}
            onChange={(e) =>
              onSetUserInfo((prevUser) => ({
                ...prevUser,
                password: e.target.value,
              }))
            }
            maxLength={100}
          />
          <div className="d-flex align-items-center mt-2 mb-3">
            <input
              id="show-pwd"
              type="checkbox"
              onClick={showPassword}
              className="me-2 fs-4"
              style={{
                cursor: "pointer",
              }}
            />
            <label
              htmlFor="show-pwd"
              style={{
                cursor: "pointer",
              }}
            >
              Show Password
            </label>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button
          onClick={onHide}
          className="rounded-3 fs-3"
          variant="outline-secondary text-danger"
          type="button"
        >
          Close
        </Button>
        <Button
          onClick={onUpdateUser}
          className="rounded-3 fs-3"
          style={{
            background: "var(--color-primary)",
          }}
          type="button"
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default memo(ManagerAccount, isEqual);
