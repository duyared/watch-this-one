import React from "react";

import { NavLink,Link } from "react-router-dom";

export default function Header(){
    
    return(
        <header>
            <section>
                <img src="src/assets/icons/menu-bars-svgrepo-com.svg" width={20}/>
            </section>
            <Link className="site-logo" to="/" >WatchThisOne</Link>
        </header>
    )
}