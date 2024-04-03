import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { isAuth, signout } from "./auth/helper";

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = (path) => {
        return (location.pathname === path);
    }

    const nav = () => (
        <ul className="nav nav-tabs bg-primary">
            <li className={`nav-item ${isActive('/') ? 'bg-success' : 'bg-info'}`}>
                <Link to="/" className="text-light nav-link">
                    Home
                </Link>
            </li>

            {isAuth() && isAuth().role === 'admin' && (
                <li className={`nav-item ${isActive('/admin') ? 'bg-success' : 'bg-info'}`}>
                    {/* <span className="nav-link text-white">{isAuth().name}</span> */}
                    <Link className="nav-link text-white" to='/admin'>
                        {isAuth().name}
                    </Link>
                </li>
            )}

            {isAuth() && isAuth().role === 'subscriber' && (
                <li className={`nav-item ${isActive('/user') ? 'bg-success' : 'bg-info'}`}>
                    <Link className="nav-link text-white" to='/user'>
                        {isAuth().name}
                    </Link>
                </li>
            )}

            {!isAuth() ? (<>
                <li className={`nav-item ${isActive('/signin') ? 'bg-success' : 'bg-info'}`}>
                    <Link to="/signin" className="text-light nav-link">
                        Signin
                    </Link>
                </li>
                <li className={`nav-item ${isActive('/signup') ? 'bg-success' : 'bg-info'}`}>
                    <Link to="/signup" className="text-light nav-link">
                        Signup
                    </Link>
                </li>
            </>) : (<>
                <li className={`nav-item bg-info`} role="button">
                    <span className="text-light nav-link"
                        style={{ cursor: 'pointer' }}
                        onClick={() => signout(() => {
                            navigate('/')
                        })}
                    >Logout
                    </span>
                </li>
            </>)}
        </ul>
    )

    return (<>
        {nav()}
        <div className="container">
            {children}
        </div>
    </>
    )
}

export default Layout