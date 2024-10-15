import { memo, useRef } from "react";
import isEqual from "react-fast-compare";
import { PreviewImage } from "../../../ui";
import { Button, Modal } from "react-bootstrap";

function UpdateAvatarModal({
  previewImg,
  userMedia,
  title,
  onUploadAvatar,
  onUpdate,
  onToggle,
  isLoading,
  show,
}) {
  const avatarImg = useRef(null);

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="text-black"
      show={show}
      onHide={onToggle}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center">
          <PreviewImage
            imgSrc={previewImg || userMedia}
            width={200}
            heigth={200}
            className="ratio-1x1 border border-4 rounded-circle"
          />
        </div>

        <Button
          onClick={() => {
            avatarImg.current.click();
          }}
          className="fs-2 border w-100 h-100 mt-2 text-center rounded-3"
          style={{
            background: "var(--color-primary)",
          }}
          data-choose-image
        >
          Tải ảnh lên
        </Button>

        <input
          type="file"
          ref={avatarImg}
          style={{ display: "none" }}
          onChange={onUploadAvatar}
          accept=".jpg, .jpeg, .webp, .png"
        />
      </Modal.Body>
      <Modal.Footer className="flex gap-3">
        <Button
          onClick={onToggle}
          className="rounded-3"
          variant="outline-secondary"
        >
          Close
        </Button>
        <Button
          onClick={onUpdate}
          className="rounded-3"
          style={{
            background: "var(--color-primary)",
          }}
        >
          {isLoading ? "Updating..." : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default memo(UpdateAvatarModal, isEqual);
