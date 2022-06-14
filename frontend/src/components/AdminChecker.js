import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { getUser } from '../ApiServices/GetUser';

function AdminChecker() {

    const [isAdmin, setIsAdmin] = useState(false);

    function getIsAdmin() {
        getUser('jaron.do14@gmail.com').then(res => {
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
