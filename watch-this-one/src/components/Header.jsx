import React, { useEffect, useState } from "react";

import { NavLink,Link } from "react-router-dom";
import LoginSignUpModal from "./LoginSignUpModal";

export default function Header({actionMessage,loaderMessage,onChange}){
    const [isModalOpen,setIsModalOpen] = useState(false)
    const [isSideMenuOpen,setIsSideMenuOpen] = useState(false)    

    const isLoggedIn = () =>{
        const isLoggedIn = Boolean(localStorage.getItem('movieToken'))
        return isLoggedIn
    }
    const handleModalOpen = () =>{
        !isLoggedIn() && setIsModalOpen(true)

    }
    const handleModalClose = () =>{

         setIsModalOpen(false)
    }
    const handleSideMenu = ()=>{
        setIsSideMenuOpen(!isSideMenuOpen)
    }

    const handleSideMenuClose = (type) =>{
        type && onChange(type)
        setIsSideMenuOpen(false)
    }
    const logout = ()=>{
        localStorage.removeItem('movieToken')
    }

    useEffect(() =>{
        if(loaderMessage && isModalOpen ===false){
            !isLoggedIn() && handleModalOpen()
        }
    },[loaderMessage,actionMessage])
    return( 

        <header>
            <div>
                <section>
                    <Link to="#" className="sideMenu-link" onClick={handleSideMenu}>
                        <img className="menu-logo" src="/src/assets/icons/menu-bars-svgrepo-com.svg" width={20} color="white"/>
                    </Link>
                    {isSideMenuOpen && (
                        <div className={`side-menu-container ${isSideMenuOpen ? 'open' :''}`}>
                            <div className="side-menu-content">
                            <Link to="/movie" className="link" onClick={() =>handleSideMenuClose('movie')}>Movies</Link>
                            <Link to="/tv" className="link" onClick={() =>handleSideMenuClose('tv')}>Tv Shows</Link>
                            <Link to="/watchlist" className="link" onClick={() =>handleSideMenuClose('watchlist')}>Watchlist</Link>
                            </div>
                        </div>
                    )}
                </section>
                <Link className="site-logo link" to="/movies" >WatchThisOne</Link>
            </div>
            <div>
            <Link to="#" className="login link" onClick={handleModalOpen}>
                <span><img src="/src/assets/icons/icons8-user-100.png" /></span>
                <span >Login</span>
            </Link>
            <Link to="#" className="login link" onClick={logout}>
                <span><img src="/src/assets/icons/icons8-user-100.png" /></span>
                <span >Logout</span>
            </Link>
            {isModalOpen && <LoginSignUpModal isOpen={isModalOpen} onClose={handleModalClose} actionMessage={actionMessage} loaderMessage={loaderMessage}/> }
            </div>
        </header>
    )
}