import React, { useContext, useState } from 'react'
import { Auth } from '../../store/AuthContext'
import './Header.css'


function Header() {
    const { userStatus } = useContext(Auth)
    const handleLogout = () => {
        localStorage.removeItem('accessToken')
        window.location.href = '/login'
    }

    return (

        <div className="headerParentDiv">
            <div className="headerChildDiv">
                <div className="language" >
                    <span>WeB APP</span>
                </div>
                <div className="productSearch">
                    <div className="input">
                        <input
                            type="text"
                        />
                    </div>
                </div>
                <div className="brandName">
                    <span> ENGLISH </span>
                </div>
                <div className="loginPage">
                    <span>{`Welcome ${userStatus}`}</span>
                </div>
                <div className="loginPage">
                    <span onClick={handleLogout}>Logout</span>
                </div>
            </div>
        </div>

    )
}

export default Header
