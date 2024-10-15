/* eslint-disable react/prop-types */
import React from "react";
import Personal from "../../components/business/personal";

export default function PersonalPage({ socket }) {
  return <Personal socket={socket} />;
}
