import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'

const RoutePages = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' Component={Home} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutePages   