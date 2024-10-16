/* eslint-disable react/prop-types */
import React from "react";
import { Toaster } from "react-hot-toast";

export const ToastProvider = ({ children }) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};
