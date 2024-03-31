import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Singup from './components/auth/Singup'

const RoutePages = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signup' element={<Singup />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutePages   