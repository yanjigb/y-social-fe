import React from "react";
import { RouteNames } from "./routes";
import Home from "../components/business/home";

const Routers = [
  {
    link: RouteNames.HOME,
    title: "Home",
    icon: <Home />,
  },
];

export default Routers;
