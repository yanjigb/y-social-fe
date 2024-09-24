import { memo, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import isEqual from "react-fast-compare";
import { getUserByID, updateUser } from "../../../../redux/request/userRequest";
import { useCurrentUser } from "../../../../hooks";
import { useDispatch } from "react-redux";

function PublicInformation({ userInfo, onSetUserInfo, show, onHide, onUpdateUser }) {
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            aria-labelledby="contained-modal-title-vcenter"
            size="lg"
        >
            <Modal.Header closeButton className="text-black">
                <h2>Public Information</h2>
            </Modal.Header>

            <Modal.Body
                style={{
                    background: "var(--color-white)",
                    color: "var(--color-dark)"
                }}
                className="d-flex flex-column gap-3"
            >
                <div className="d-flex justify-content-between flex-column flex-lg-row gap-2">
                    <div className="d-flex flex-grow-1 flex-column align-items-start">
                        <label htmlFor="firstname" className="mb-2 fs-3">
                            Firstname
                        </label>
                        <input
                            type="text"
                            id="firstname"
                            className="w-100 p-2 px-3 fs-4"
                            style={{
                                borderRadius: "0.5rem",
                            }}
                            defaultValue={userInfo?.firstName}
                            placeholder="Your firstname"
                            onChange={(e) =>
                                onSetUserInfo((prevUser) => ({
                                    ...prevUser,
                                    firstName: e.target.value,
                                }))
                            }
                            maxLength={100}
                        />
                    </div>
                    <div className="d-flex flex-grow-1 flex-column align-items-start">
                        <label htmlFor="lastname" className="mb-2 fs-3">
                            Lastname
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            className="w-100 p-2 px-3 fs-4"
                            style={{
                                borderRadius: "0.5rem",
                            }}
                            defaultValue={userInfo?.lastName}
                            placeholder="Your lastname"
                            onChange={(e) =>
                                onSetUserInfo((prevUser) => ({
                                    ...prevUser,
                                    lastName: e.target.value,
                                }))
                            }
                            maxLength={100}
                        />
                    </div>
                </div>
                <div className="d-flex flex-column align-items-start">
                    <label htmlFor="nickname" className="fs-3 mb-2">
                        Nickname ( @{userInfo?.username} )
                    </label>
                    <input
                        type="text"
                        id="nickname"
                        className="w-100 p-2 px-3 fs-4"
                        style={{
                            borderRadius: "0.5rem",
                        }}
                        defaultValue={userInfo?.username}
                        onChange={(e) =>
                            onSetUserInfo((prevUser) => ({
                                ...prevUser,
                                username: e.target.value,
                            }))
                        }
                        maxLength={20}
                    />
                </div>
                <div className="d-flex flex-column align-items-start">
                    <label htmlFor="bio" className="mb-2 fs-3">
                        Bio
                    </label>
                    <textarea
                        type="text"
                        id="bio"
                        className="w-100 p-2 px-3 fs-4"
                        style={{
                            borderRadius: "0.5rem",
                            height: "7rem",
                            resize: "none",
                        }}
                        defaultValue={userInfo?.bio}
                        onChange={(e) =>
                            onSetUserInfo((prevUser) => ({
                                ...prevUser,
                                bio: e.target.value,
                            }))
                        }
                    ></textarea>
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
                        background: 'var(--color-primary)'
                    }}
                    type="button"
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default memo(PublicInformation, isEqual)
