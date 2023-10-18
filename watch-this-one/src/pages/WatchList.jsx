
import React from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import Movies from "../components/Movies";
import { getWatchList } from "../api";
export async function loader({request}){
    const token = localStorage.getItem('movieToken')
    return defer({movies:getWatchList(token)})
}
export default function WatchList(){
    const dataPromise = useLoaderData()
    return (
        <div className="watchList-container">
        <h1 className="watchList-title">Your Watchlist</h1>
        <React.Suspense fallback={<h2 className="loading">Loading...</h2>}>
            <Await resolve={dataPromise.movies} >
                {(movies) => <Movies movies={movies}  menu="watchlist"/>}
            </Await>
            </React.Suspense>
         </div>
            )
        }