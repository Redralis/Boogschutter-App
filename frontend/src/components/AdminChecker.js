import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { getUser } from '../ApiServices/GetUser';

function AdminChecker() {

    const [isAdmin, setIsAdmin] = useState(false);

    function getIsAdmin() {
        getUser(localStorage.getItem('email')).then(res => {
            setIsAdmin(!res.result.isAdmin);
        })
    }

    return (
        <div>
            {getIsAdmin()}
            {isAdmin && <Navigate to="/"></Navigate>}
        </div>
    );
}

export default AdminChecker;
