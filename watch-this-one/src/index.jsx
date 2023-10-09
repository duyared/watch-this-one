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
import Discover ,{loader as discovorLoader, loader} from "./pages/Discover"
import MoviesLayout from "./components/moviesLayout"
import MovieDetail ,{loader as movieLoader} from "./pages/MovieDetails"

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
        <Route path="movies" element={<MoviesLayout />}>
            <Route index element={<Home />} loader={homeLoader}/>
            <Route path="top_rated" element={<TopRated />} loader={topRatedLoader}/>
            <Route path="popular" element={<Popular />} loader={popularLoader}/>
            <Route path="upcoming" element={<Upcoming />} loader={upcomingLoader}/>
            <Route path="discover" element={<Discover />} loader={discovorLoader}/>
        </Route>
        <Route path="movies/:id" element={<MovieDetail />} loader={movieLoader} />
    </Route>
))



function App(){
    return (
        <RouterProvider router={router} />
    )
}


ReactDOM.createRoot(document.getElementById('root')).render(<App />)