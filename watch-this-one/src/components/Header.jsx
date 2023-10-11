import React, { useState } from "react";

import { NavLink,Link } from "react-router-dom";
import LoginSignUpModal from "./LoginSignUpModal";

export default function Header({message,errorMessage}){
    const [isModalOpen,setIsModalOpen] = useState(false)
    
    const handleModalOpen = () =>{
        setIsModalOpen(true)

    }

    const handleModalClose = () =>{
        setIsModalOpen(false)
        console.log(isModalOpen)
    }
    return(
        <header>
            <div>
                <section>
                    <img className="menu-logo" src="/src/assets/icons/menu-bars-svgrepo-com.svg" width={20} color="white"/>
                </section>
                <Link className="site-logo link" to="/" >WatchThisOne</Link>
            </div>
            <div>
            <Link to="#" className="login link" onClick={handleModalOpen}>
                <span><img src="/src/assets/icons/icons8-user-100.png" /></span>
                <span >Login</span>
            </Link>
            {isModalOpen && <LoginSignUpModal isOpen={isModalOpen} onClose={handleModalClose} errorMessage={errorMessage} message={message}/> }
            </div>
        </header>
    )
}