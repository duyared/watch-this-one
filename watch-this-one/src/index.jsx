import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider,Route,createBrowserRouter,createRoutesFromElements } from "react-router-dom"
import "./index.css"
import Layout from "./components/Layout"
import Home,{loader as homeLoader}from "./pages/Home"
import Error from "./components/Error"
import TopRated,{loader as topRatedLoader} from "./pages/TopRated"
import Popular ,{loader as popularLoader} from "./pages/Popular"
import Upcoming,{loader as upcomingLoader} from "./pages/Upcoming"

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
        <Route index element={<Home />} loader={homeLoader}/>
        <Route path="top_rated" element={<TopRated />} loader={topRatedLoader}/>
        <Route path="popular" element={<Popular />} loader={popularLoader}/>
        <Route path="upcoming" element={<Upcoming />} loader={upcomingLoader}/>
    </Route>
))



function App(){
    return (
        <RouterProvider router={router} />
    )
}


ReactDOM.createRoot(document.getElementById('root')).render(<App />)