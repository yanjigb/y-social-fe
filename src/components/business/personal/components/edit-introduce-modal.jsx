import { memo } from "react";
import { Button, Modal } from "react-bootstrap";
import isEqual from "react-fast-compare";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faPinterest,
  faTwitch,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import SocialMediaInput from "../../../ui/input/social-media";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function EditIntroduce({
  show,
  onToggle,
  title,
  onUpdate,
  userInfo,
  onChangeSocialLink,
}) {
  const renderContentUpdateIntroduce = () => {
    const socialMediaFields = [
      { icon: faLinkedin, label: "linkedin" },
      { icon: faGithub, label: "github" },
      { icon: faInstagram, label: "insta" },
      { icon: faPinterest, label: "pinterest" },
      { icon: faYoutube, label: "youtube" },
      { icon: faTwitter, label: "twitter" },
      { icon: faTwitch, label: "twitch" },
    ];

    return (
      <div
        className="text-white overflow-auto pe-3 w-100"
        style={{
          maxHeight: "40rem",
        }}
      >
        {socialMediaFields.map(({ icon, label }) => (
          <SocialMediaInput
            key={label}
            icon={<FontAwesomeIcon icon={icon} className="me-2" />}
            label={label}
            value={userInfo[label]}
            onChange={onChangeSocialLink}
          />
        ))}
      </div>
    );
  };

  return (
    <Modal
      size=""
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={onToggle}
      className="text-white"
    >
      <Modal.Header closeButton className="bg-black" closeVariant="white">
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-black">
        {renderContentUpdateIntroduce()}
      </Modal.Body>
      <Modal.Footer className="bg-black flex gap-2">
        <Button
          onClick={onToggle}
          className="rounded-3 text-white"
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
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default memo(EditIntroduce, isEqual);
