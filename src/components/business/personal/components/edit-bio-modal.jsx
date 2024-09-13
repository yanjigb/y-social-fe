import { memo } from "react";
import { Button, Modal } from "react-bootstrap";
import isEqual from "react-fast-compare";

function EditBioModal({ show, onToggle, title, onUpdate, userInfo, onChangeUserInfo }) {
    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show}
            onHide={onToggle}
            className="text-white"
        >
                <Modal.Header closeButton className="bg-black" closeVariant="white">
                    <Modal.Title id="contained-modal-title-vcenter">
                        {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body 
                    className="bg-black"
                >
                    <textarea
                        value={userInfo.bio}
                        style={{
                            resize: "none",
                            height: "10rem",
                        }}
                        onChange={onChangeUserInfo}
                        className="text-white border-white bg-transparent p-2 fs-4 w-100"
                        spellCheck="false"
                        maxLength={50}
                    />
                </Modal.Body>
                <Modal.Footer 
                    className="bg-black flex gap-2"
                >
                    <Button onClick={onToggle} className="rounded-3 text-white" variant="outline-secondary">Close</Button>
                    <Button onClick={onUpdate} className="rounded-3" style={{
                        background: 'var(--color-primary)'
                    }}>Save</Button>
                </Modal.Footer>
        </Modal>
    );
}

export default memo(EditBioModal, isEqual);
