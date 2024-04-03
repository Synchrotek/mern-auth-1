import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isAuth } from './components/auth/helper'

const PrivateRoutes = ({ component: Component, ...rest }) => {
    return (<>
        {isAuth() ?
            (< Outlet />) : (
                <Navigate to='/signin' />
            )}
    </>
    )
}

export const AdminPrivateRoutes = () => {
    return (<>
        {isAuth() && isAuth().role === 'admin' ?
            (< Outlet />) : (
                <Navigate to='/signin' />
            )}
    </>
    )
}


export default PrivateRoutes