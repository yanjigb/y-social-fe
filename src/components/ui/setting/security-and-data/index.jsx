import { memo, useRef } from "react";
import { Modal } from "react-bootstrap";
import { CSVLink } from "react-csv";
import isEqual from "react-fast-compare";
import { useCurrentUser } from "../../../../hooks";

function SecurityAndData({ show, onHide }) {
    const currentUser = useCurrentUser();
    const exportDataRef = useRef(null);
    const csvData = [
        ["username", "password", "email"],
        [currentUser?.username, currentUser?.password, currentUser?.email],
    ];

    const handleExportData = () => {
        exportDataRef.current.link.click();
    };

    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton className="text-black">
                    <h2>Security and Data</h2>
                </Modal.Header>

                <Modal.Body
                    style={{
                        background: "var(--color-white)",
                        color: "var(--color-dark)"
                    }}
                    className="py-4"
                >
                    <div className="d-flex flex-column align-items-end">
                        <h3 className="fs-3 fw-bold mb-2 w-100">Download your data</h3>
                        <p className="text-start align-self-start fs-4">
                            Bạn có thể yêu cầu tải xuống thông tin Yanji Social của mình bất kỳ
                            lúc nào. Yêu cầu của bạn sẽ được nhà cung cấp bên thứ ba của chúng
                            tôi là Yanji Auth xác minh.
                        </p>

                        <div
                            role="button"
                            className="p-3 text-white hover-bg fs-3"
                            style={{
                                background: "var(--color-primary)",
                                borderRadius: "0.5rem",
                            }}
                            onClick={handleExportData}
                        >
                            Download your data
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <CSVLink
                ref={exportDataRef}
                data={csvData}
                filename={`${currentUser?.username}-data.csv`}
                target="_blank"
                style={{ display: "none" }}
            />
        </>
    )
}

export default memo(SecurityAndData, isEqual)
