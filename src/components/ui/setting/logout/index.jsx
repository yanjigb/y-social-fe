/* eslint-disable react/prop-types */
import React, { memo } from "react";
import { Button, Modal } from "react-bootstrap";
import isEqual from "react-fast-compare";

function Logout({ onLogout, show, onHide }) {
  return (
    <Modal
      show={show}
      size="sm"
      aria-labelledby="contained-modal-title-center"
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <h4 className="fw-bold text-black fs-4">Are you sure to logout now ?</h4>
      </Modal.Header>

      <Modal.Body>
        <Button
          role="button"
          onClick={onLogout}
          variant="danger"
          className="rounded-3 w-100 py-3 fs-5 fw-bold text-uppercase"
        >
          Logout
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default memo(Logout, isEqual);
