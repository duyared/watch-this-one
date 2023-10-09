import React from "react";
import { Outlet } from "react-router-dom";
import MoviesMenu from "./MoviesMenu";


export default function MoviesLayout() {
    return(
    <div>
        <main>
            <MoviesMenu />
            <Outlet />
        </main>
    </div>
    )

}