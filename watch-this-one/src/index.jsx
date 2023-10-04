import React from "react"
import ReactDOM from "react-dom/client"
import Header from "./components/Header"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import Layout from "./components/Layout"





function App(){
    return (
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    )
}


ReactDOM.createRoot(document.getElementById('root')).render(<App />)