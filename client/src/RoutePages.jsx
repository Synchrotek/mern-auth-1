import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Singup from './components/auth/Singup'
import Singin from './components/auth/Signin'
import Activate from './components/auth/Activate'

const RoutePages = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signup' element={<Singup />} />
                <Route path='/signin' element={<Singin />} />
                <Route path='/auth/activate/:token' element={<Activate />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutePages   