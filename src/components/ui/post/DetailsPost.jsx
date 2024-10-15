/* eslint-disable react/prop-types */
import React, { memo } from "react";
import Comments from "../comment/Comments";
import isEqual from "react-fast-compare";
import { Modal } from "react-bootstrap";

const DetailsPost = ({
  children,
  author,
  postID,
  socket,

  show,
  onHide,
}) => {
  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="text-black"
      >
        <Modal.Header closeButton onClick={(e) => e.stopPropagation()}>
          <p className="fs-3 fw-bold mb-1">Bài viết từ {author.username}</p>
        </Modal.Header>

        <Modal.Body
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "var(--color-white)",
            color: "var(--color-dark)",
          }}
        >
          {children}

          <Comments postID={postID} author={author} socket={socket} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default memo(DetailsPost, isEqual);
