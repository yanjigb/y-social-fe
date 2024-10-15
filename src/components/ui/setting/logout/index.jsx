/* eslint-disable react/prop-types */
import React, { memo } from "react";
import { Button, Modal } from "react-bootstrap";
import isEqual from "react-fast-compare";

function Logout({ onLogout, show, onHide }) {
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <h2 className="fw-bold text-black">Are you sure to Sign out now ?</h2>
      </Modal.Header>

      <Modal.Body>
        <Button
          role="button"
          onClick={onLogout}
          variant="danger"
          className="rounded-3 w-100 py-4 fs-3 fw-bold text-uppercase"
        >
          Logout
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default memo(Logout, isEqual);
