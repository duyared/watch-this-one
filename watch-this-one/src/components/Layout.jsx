import React from "react";
import { NavLink,Navigate,Outlet, redirect, useActionData, useLoaderData, useNavigation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MoviesMenu from "./MoviesMenu";
import { loginUser } from "../api";

export async function action({request}){
    const formData = await request.formData()
    const form = formData.get('form')
    console.log(formData)

    const email = formData.get("email")
    const password = formData.get("password")

    if(form === "login"){
        try {
            const data = await loginUser({email,password})
            localStorage.setItem("movieToken",data.token)
            return redirect('/movies')
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
            return redirect("/movies")
            
        } catch (error) {
            console.log(error.message)
            return err.message
        }
        
    }

    

}

export default function Layout() {
    const errorMessage = useActionData()
    const message = useLoaderData()
    return(
    <div>
        <Header message={message} errorMessage={errorMessage}/>
        <main>
            <Outlet />
        </main>
        <Footer />
    </div>)
}