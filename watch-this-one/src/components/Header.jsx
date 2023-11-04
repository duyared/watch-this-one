import React, { useEffect, useState } from "react";
import userIcon from "/assets/icons/icons8-user-100.png"
import menuIcon from "/assets/icons/menu-bars-svgrepo-com.svg"
import { NavLink,Link } from "react-router-dom";
import LoginSignUpModal from "./LoginSignUpModal";  

export default function Header({actionMessage,loaderMessage,onChange}){
    const [isModalOpen,setIsModalOpen] = useState(false)
    const [isSideMenuOpen,setIsSideMenuOpen] = useState(false)    
    const [isLoggedIn,setIsLoggedIn] = useState(Boolean(localStorage.getItem('movieToken')))
    const [isTriggered,setIsTriggered] = useState(false)
    const handleModalOpen = () =>{ !isLoggedIn && setIsModalOpen(true) }
    const handleModalClose = () =>{  setIsModalOpen(false)}

    const handleSideMenu = ()=>{ setIsSideMenuOpen(!isSideMenuOpen)}
    const handleSideMenuClose = (type) =>{
        type && onChange(type)
        setIsSideMenuOpen(false)
    }

    const logout = ()=>{
        localStorage.removeItem('movieToken')
        setIsLoggedIn(false)
        setIsTriggered(false)
    }

    const triggerLogout = ()=>{
        setIsTriggered(!isTriggered)
    }

    useEffect(() =>{
        if(loaderMessage && isModalOpen ===false){
            !isLoggedIn && handleModalOpen()
        }
        const username = getUserName()
        if(username){
            setIsLoggedIn(true)   
            setIsModalOpen(false)    
         }
        else{
            setIsLoggedIn(false)
        }

    
    },[loaderMessage,actionMessage,localStorage.getItem('movieToken')])
    
    const getUserName = () =>{
        const token = JSON.parse(localStorage.getItem('movieToken'))
            const username = token?.username
        return username
    }
        return( 
            
        <header>
            <div>
                <section>
                    <Link to="#" className="sideMenu-link" onClick={handleSideMenu}>
                        <img className="menu-logo" src={menuIcon} width={20} color="white"/>
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
                <Link className="site-logo link" to="/" >WatchThisOne</Link>
            </div>
            <div>
            {
                isLoggedIn ? 
                (
                <div className="logout-container">
                    <Link to="#" className="login link" onClick={triggerLogout} >
                    <span><img src="../assets/icons/icons8-user-100.png" /></span>
                    <span >Welcome {getUserName()}</span>
                    </Link>
                    {
                        isTriggered &&
                   ( <button className="logoutButton" onClick={logout}>Logout</button>)
                    }
                </div>
            )
            :
            (<Link to="#" className="login link" onClick={handleModalOpen}>
            <span><img src={userIcon} /></span>
            <span >Login</span>
        </Link>)
            }
            {isModalOpen && <LoginSignUpModal isOpen={isModalOpen} onClose={handleModalClose} actionMessage={actionMessage} loaderMessage={loaderMessage}/> }
            </div>
        </header>
    )
}