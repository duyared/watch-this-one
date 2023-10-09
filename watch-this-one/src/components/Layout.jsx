import React from "react";
import { NavLink,Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MoviesMenu from "./MoviesMenu";


export default function Layout() {
    return(
    <div>
        <Header />
        <main>
            <Outlet />
        </main>
        <Footer />
    </div>)
}