import React from "react";

import { NavLink,Link } from "react-router-dom";

export default function Header(){
    
    return(
        <header>
            <div>
                <section>
                    <img className="menu-logo" src="/src/assets/icons/menu-bars-svgrepo-com.svg" width={20} color="white"/>
                </section>
                <Link className="site-logo link" to="/" >WatchThisOne</Link>
            </div>
            <div>
            <Link to="." className="login link">
                <span><img src="/src/assets/icons/icons8-user-100.png" /></span>
                <span >Login</span>
            </Link>
            </div>
        </header>
    )
}