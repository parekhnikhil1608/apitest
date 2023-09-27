import React from 'react'
import './NavLink.css';
import { NavLink, Outlet } from 'react-router-dom';
import { Height } from '@mui/icons-material';

export default function temp() {
    const userLogout = () => {
        // debugger
        localStorage.removeItem('token');
        window.location.href = '/login'
    }
    function alertLogout() {             // Conformation alert 
        let text = `Are you sure you want to Logout?`;
        if (window.confirm(text) == true) {
            userLogout()
        } else {
        }
      }
    return (
        <>
            <div className='navMain'>

                <ul className='navBar'>
                    <li>
                    <img className='btn btn-suceess' src={'logo.png'} alt="my-gif"  />

                    </li>
                    <li className='navItem'>
                        <NavLink className="nav-link" aria-current="page" to="/">Dashboard</NavLink>
                    </li>
                    <li className='navItem'>
                        <NavLink className="nav-link" to="/form">Add/Update</NavLink>
                    </li>
                    <li className='navItem'>
                        <NavLink className="nav-link" to="/state">State</NavLink>
                    </li>
                    <li className='navItem'>
                        <NavLink className="nav-link" to="/cal">cal</NavLink>
                    </li>
                </ul>

                <div className='display'>
                    <div className='heading'>
                        <button className="btn Logout" onClick={alertLogout} type="submit">Logout</button>

                    </div>
                    <Outlet />
                </div>
            </div>

        </>
    )
}
