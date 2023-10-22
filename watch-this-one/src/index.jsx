import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider,Route,createBrowserRouter,createRoutesFromElements } from "react-router-dom"
import "./index.css"
import Layout ,{action as loginSignUpAction,loader as layoutLoader} from "./components/Layout"
import NowPlaying,{loader as NowPlayingLoader}from "./pages/NowPlaying"
import Error from "./components/Error"
import TopRated,{loader as topRatedLoader} from "./pages/TopRated"
import Popular ,{loader as popularLoader} from "./pages/Popular"
import Upcoming,{loader as upcomingLoader} from "./pages/Upcoming"
import Discover ,{loader as discovorLoader, loader} from "./pages/Discover"
import MoviesLayout from "./components/moviesLayout"
import MovieDetail ,{loader as movieLoader,action as movieDetailsAction} from "./pages/MovieDetails"
import WatchList, {loader as watchListLoader}from "./pages/WatchList"
import Home from "./pages/Home"

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />} action={loginSignUpAction} loader={layoutLoader}>
        <Route index element={<Home /> }/>
        <Route path="movie" element={<MoviesLayout />}>
            <Route index element={<NowPlaying />} loader={NowPlayingLoader}/>
            <Route path="top_rated" element={<TopRated />} loader={topRatedLoader}/>
            <Route path="popular" element={<Popular />} loader={popularLoader}/>
            <Route path="upcoming" element={<Upcoming />} loader={upcomingLoader}/>
            <Route path="discover" element={<Discover />} loader={discovorLoader}/>
        </Route>
        <Route path="movie/:id" element={<MovieDetail />} loader={movieLoader} action={movieDetailsAction} />
        <Route path="tv" element={<MoviesLayout />}>
            <Route index element={<NowPlaying />} loader={NowPlayingLoader}/>
            <Route path="top_rated" element={<TopRated />} loader={topRatedLoader}/>
            <Route path="popular" element={<Popular />} loader={popularLoader}/>
            <Route path="on_the_air" element={<Upcoming />} loader={upcomingLoader}/>
            <Route path="discover" element={<Discover />} loader={discovorLoader}/>
        </Route>
        <Route path="tv/:id" element={<MovieDetail />} loader={movieLoader} action={movieDetailsAction} />

        <Route path="watchlist" element={<WatchList />} loader={watchListLoader}/>
    </Route>
))



function App(){
    return (
        <RouterProvider router={router} />
    )
}


ReactDOM.createRoot(document.getElementById('root')).render(<App />)