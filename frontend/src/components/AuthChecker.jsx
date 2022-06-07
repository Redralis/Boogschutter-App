import React from "react";
import {Navigate } from "react-router-dom";

function AuthChecker(props) {
  return (
    <>
      {typeof props.token === "undefined" && (
        <Navigate to="/" />
      )}
    </>
  );
}

export default AuthChecker;
