import React, { useState } from "react";
import { NavLink,Navigate,Outlet, redirect, useActionData, useLoaderData, useLocation, useNavigation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { loginUser, registerUser } from "../api";

export function loader({request}){
    const url = request.url
    const message = new URL(request.url).searchParams.get('message');
    const type = url.includes('/tv') ? 'tv' : 'movie';
    return {_type:type,message:message}
}
export async function action({request}){
    const formData = await request.formData()
    const form = formData.get('form')
    const email = formData.get("email")
    const password = formData.get("password")
    const redirectPath = new URL(request.url)
            .searchParams.get("redirectTo")
    const fullPath = window.location.href;
    if(form === "login"){
        try {
            const data = await loginUser({email,password})
            const username = data.user.name
            localStorage.setItem("movieToken",JSON.stringify({token:data.token,username:username}))
            if(redirectPath){
                return redirect(redirectPath)
            }
            return redirect(fullPath)
        } catch (err) {
            return err.message
        }
        // return null
    }
    if(form === "signUp"){
        try {
            const name = formData.get('username')
            const confirmPassword = formData.get('confirmPassword')
            if(password !== confirmPassword){
                throw new Error("password don't match")
            }
            const data = await registerUser({email,password,name})
            const username = data.user.name
            localStorage.setItem("movieToken",JSON.stringify({token:data.token,username:username}))
            
            return redirect(redirectPath)
            
        } catch (err) {
            return err.message
        }  
        // return null   
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