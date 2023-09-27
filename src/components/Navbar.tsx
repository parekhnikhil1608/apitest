import React from 'react'
import { Outlet, Link, NavLink } from 'react-router-dom'

export default function Navbar() {

    const userLogout = ()=>{
        // debugger
        window.location.href = 'localhost:3000/login'
        localStorage.removeItem('token')
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg d-flex flex-column navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Test-Api</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/">Dashboard</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/form">Add/Update</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/state">State</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/temp">temp</NavLink>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <button className="btn btn-outline-success" onClick={userLogout} type="submit">Logout</button>
                        </form>
                    </div>
                </div>
            </nav>
            
            <Outlet />
        </>
    )
}
