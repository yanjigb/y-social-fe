/* eslint-disable react/prop-types */
import React, { memo, useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import axios from "axios";
// import { Search } from "lucide-react";
import { useToggle } from "usehooks-ts";
import isEqual from "react-fast-compare";
import Button from "react-bootstrap/Button";

import "./navigation.css";

// import NavBtn from "../../../../components/ui/button/navbar";
import { getUserByID } from "../../../../redux/request/userRequest";
// import Global from "../../../../constant/global";
import { useCurrentUser } from "../../../../hooks";
import { RouteNames } from "../../../../constant/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Sidebar from "../../sidebar";
import MobileCustomTheme from "../components/mobile-custom-theme";
import MobileSidebar from "../components/mobile-sidebar";

// eslint-disable-next-line no-unused-vars
const MobileNav = ({ title, link, isSearch = true }) => {
  // eslint-disable-next-line no-unused-vars
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const currentUser = useCurrentUser();
  // const [active, setActive] = useState("HOME");

  useEffect(() => {
    if (currentUser && !user?._id) {
      getUserByID(currentUser._id, dispatch)
        .then((data) => {
          setUser({
            ...data.user,
          });
        })
        .catch((error) => {
          console.error("Failed to fetch user:", error);
        });
    }
  }, [currentUser, user?._id, dispatch]);

  // const renderSwitchBtn = () => {
  //   return (
  //     currentUser && (
  //       <NavBtn
  //         title="Create Post"
  //         className="nav__btn d-flex align-items-center justify-content-center gap-4"
  //         lable="#create-post"
  //       />
  //     )
  //   );
  // };

  // const searchUser = async (e) => {
  //   if (!e.target.value) {
  //     setUsers([]);
  //     return;
  //   }

  //   const value = e.target.value;

  //   const data = await axios.get(
  //     Global.SOCKET_URL +
  //       `/api/v1/user/all-users/?username=${value.toLowerCase()}`,
  //   );

  //   const userList = data.data?.users;

  //   if (userList.length > 0) {
  //     setUsers(userList);
  //   } else {
  //     setUsers([]);
  //   }
  // };

  const [value, setValue] = useToggle();
  const [toggleTheme, setToggleTheme] = useState(false);

  // Just an example to use "setValue"
  const toggleMenu = () => {
    setValue((openMenu) => !openMenu);
  };

  const handleToggleTheme = () => {
    setToggleTheme((openTheme) => !openTheme);
  };

  return (
    <>
      <nav className="py-3 text-start header-navbar">
        <div className="d-flex flex-column h-100 px-5">
          <div className="d-flex justify-content-between align-items-center">
            <Link
              to={RouteNames.HOME}
              className="logo mb-0 d-flex align-items-center"
            >
              <span className="fs-2">Yanji Social</span>
            </Link>

            <Button
              type="button"
              onClick={toggleMenu}
              className="rounded-0 btn-focus-none border-0 shadow-none bg-transparent fs-3 text-white"
            >
              <FontAwesomeIcon icon="fa-solid fa-bars" />
            </Button>
          </div>

          <MobileSidebar
            show={value}
            onToggleMenu={toggleMenu}
            onToggleTheme={handleToggleTheme}
          />
          <MobileCustomTheme
            toggleTheme={toggleTheme}
            onToggleTheme={handleToggleTheme}
          />

          {/* <Offcanvas show={toggleTheme} onHide={handleToggleTheme} placement="bottom" className="text-dark">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            Some text as placeholder. In real life you can have the elements you
                            have chosen. Like, text, images, lists, etc.
                        </Offcanvas.Body>
                    </Offcanvas> */}

          {/* {isSearch && (
                        <div className="search-bar d-flex align-items-center position-relative">
                            <Search size={15} />
                            <Form.Control
                                className="ms-4"
                                type="search"
                                placeholder="Search for creators, ideas and projects"
                                style={{
                                    boxShadow: "none",
                                }}
                                onChange={(e) => searchUser(e)}
                            />

                            <div
                                className="position-absolute w-100 text-white overflow-auto"
                                style={{
                                    left: "0",
                                    top: "110%",
                                    maxHeight: "30rem",
                                }}
                            >
                                {users.map((u) => (
                                    <Link
                                        to={`/user/${u._id}`}
                                        className="d-flex align-items-center p-3 fs-5 text-white"
                                        style={{
                                            background: "var(--color-primary-light)",
                                        }}
                                        key={u._id}
                                    >
                                        <div className="profile-pic d-flex justify-content-center align-items-center me-3">
                                            <Avatar imageSrc={u.profilePicture} label={u.username} />
                                        </div>
                                        {u.username}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )} */}

          {/* <div className="d-flex justify-content-end align-items-center">
                        {renderSwitchBtn()}
                        {currentUser && (
                            <Link
                                aria-label="Avatar user"
                                to={currentUser ? `/user/${user?._id}` : RouteNames.HOME}
                                className={`profile-pic ms-4 ${Global.ADMIN_ID === currentUser?._id ? "" : "bg-light"
                                    } text-white`}
                            >
                                <Avatar
                                    imageSrc={user?.profilePicture}
                                    label={user?.username}
                                    userId={currentUser?._id}
                                />
                            </Link>
                        )}
                    </div> */}
        </div>
      </nav>
    </>
  );
};

export default memo(MobileNav, isEqual);
