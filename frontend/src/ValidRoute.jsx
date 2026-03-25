import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import checklogin from './libs/checklogin';

function ValidRoute() {
    if (checklogin())
        return <Outlet></Outlet>
    else
        return (
            <div>
 <Navigate to={'/user/login'}></Navigate>
</div>
);
}

export default ValidRoute;