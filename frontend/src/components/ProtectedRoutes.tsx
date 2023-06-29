import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import secureLocalStorage from "react-secure-storage";

type Props = {
    user: string | undefined
}

function ProtectedRoutes(props:Props) {
    const authenticatedUser = secureLocalStorage.getItem("username") !== "Anonymous User."
        && typeof secureLocalStorage.getItem("username") === "string"
    const authenticated = authenticatedUser
    return authenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
