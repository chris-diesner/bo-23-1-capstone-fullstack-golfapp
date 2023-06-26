import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

type Props = {
    user: string | undefined
}

function ProtectedRoutes(props:Props) {
    const authenticatedUser = useSelector((state: any) => state.auth.authenticatedUser);
    const authenticated = authenticatedUser !== undefined && authenticatedUser !== 'anonymousUser';

    return authenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
