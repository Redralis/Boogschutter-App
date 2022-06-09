import React from "react";
import {Navigate } from "react-router-dom";

function AuthChecker() {
  return (
    <>
      {typeof localStorage.getItem("token") === "undefined" && (
        <Navigate to="/" />
      )}
    </>
  );
}

export default AuthChecker;
