/* eslint-disable react/prop-types */
import React from "react";
import Home from "../../components/business/home";

export default function HomePage({ socket }) {
  return <Home socket={socket} />;
}
