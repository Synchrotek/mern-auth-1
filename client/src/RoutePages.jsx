import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Singup from './components/auth/Singup'
import Singin from './components/auth/Signin'
import Activate from './components/auth/Activate'
import Private from './components/Private'
import PrivateRoutes, { AdminPrivateRoutes } from './PrivateRoleRoutes'
import Admin from './components/Admin'

const RoutePages = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signup' element={<Singup />} />
                <Route path='/signin' element={<Singin />} />
                <Route path='/auth/activate/:token' element={<Activate />} />

                {/* Private Routes ------------------------------- */}
                <Route element={<PrivateRoutes />}>
                    <Route path='/private' element={<Private />} />
                </Route>

                {/* Private Routes for admin roles --------------- */}
                <Route element={<AdminPrivateRoutes />}>
                    <Route path='/admin' element={<Admin />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutePages   