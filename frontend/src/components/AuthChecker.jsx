import React from "react";
import { Navigate } from "react-router-dom";

function AuthChecker() {
  return (
    <div>
      {typeof localStorage.getItem("token") !== "string" && (
        <Navigate to="/" ></Navigate>
      )}{
      }
    </div>
  );
}

export default AuthChecker;
