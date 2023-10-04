import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider,Route,createBrowserRouter,createRoutesFromElements } from "react-router-dom"
import "./index.css"
import Layout from "./components/Layout"
import Home,{loader as homeLoader}from "./pages/Home"
import Error from "./components/Error"

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
        <Route index element={<Home />} loader={homeLoader}/>
    </Route>
))



function App(){
    return (
        <RouterProvider router={router} />
    )
}


ReactDOM.createRoot(document.getElementById('root')).render(<App />)