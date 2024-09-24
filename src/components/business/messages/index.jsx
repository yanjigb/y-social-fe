import { memo } from "react";
import isEqual from "react-fast-compare";

import { RouteNames } from "../../../constant/routes";
import Header from "../../layouts/header";
import Left from "./components/left";
import Right from "./components/right";
import Middle from "./components/middle";

import "./styles/messages.css";

function Messages({ socket }) {
  return (
    <>
      <Header title="Login" link={RouteNames.REGISTER} />
      <div className="messages row px-0">  
        <Left socket={socket} className="col-lg-2" />
        <Middle socket={socket} className="col-12 col-lg-8" />
        <Right socket={socket} className="col-md-2" />
      </div>
    </>
  );
}

export default memo(Messages, isEqual);
