import React, { useState } from "react";
import { NavLink,Navigate,Outlet, redirect, useActionData, useLoaderData, useNavigation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MoviesMenu from "./MoviesMenu";
import { loginUser, registerUser } from "../api";

export function loader({request}){
    const url = request.url
    const message = new URL(request.url).searchParams.get('message');
    const type = url.includes('/movie') ? 'movie' : 'tv';
    return {_type:type,message:message}
}
export async function action({request}){
    const formData = await request.formData()
    const form = formData.get('form')
    const email = formData.get("email")
    const password = formData.get("password")
    const redirectPath = new URL(request.url)
            .searchParams.get("redirectTo")

    if(form === "login"){
        try {
            const data = await loginUser({email,password})
            localStorage.setItem("movieToken",data.token)
            if(redirectPath){
                return redirect(redirectPath)
            }
            return redirect(request.url)
        } catch (err) {
            return err.message
        }
    }
    if(form === "signUp"){
        try {
            const name = formData.get('username')
            const confirmPassword = formData.get('confirmPassword')
            if(password !== confirmPassword){
                throw new Error("password don't match")
            }
            const data = await registerUser({email,password,name})
            localStorage.setItem("movieToken",data.token)
            
            return redirect(redirectPath)
            
        } catch (err) {
            return err.message
        }     
    }
}

export default function Layout() {
    const actionMessage = useActionData()
    const {_type,message} = useLoaderData()
    const [type,setType] = useState(_type)
    
    const handleTypeChange = (type)=>{
        setType(type)
    }
    return(
    <div>
        <Header  actionMessage={actionMessage} loaderMessage={message} onChange={handleTypeChange} />
        <main>
            <Outlet context={{type}} />
        </main>
        <Footer />
    </div>)
}