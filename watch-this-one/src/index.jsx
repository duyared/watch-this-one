import React from "react"
import ReactDOM from "react-dom/client"
import Header from "./components/Header"
import { BrowserRouter } from "react-router-dom"
import "./header.css"





function App(){
    return (
        <BrowserRouter>
            <Header />
        </BrowserRouter>
    )
}


ReactDOM.createRoot(document.getElementById('root')).render(<App />)