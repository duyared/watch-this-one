import React from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import MoviesMenu from "./MoviesMenu";


export default function MoviesLayout() {
    const {type} = useOutletContext()
    console.log(type)
    return(
    <div>
        <main>
            <MoviesMenu type={type}/>
            <Outlet context={type}/>
        </main>
    </div>
    )

}