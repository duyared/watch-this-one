
import React from "react";
import { Await, defer, redirect, useLoaderData } from "react-router-dom";
import Movies from "../components/Movies";
import { getWatchList } from "../api";
import { requireAuth } from "../auth";

export async function loader({request}){
    const token = await requireAuth(request)
    return defer({movies:getWatchList(token)})
}
export default function WatchList(){
    const dataPromise = useLoaderData()
    return (
        <div className="watchList-container">
        <h1 className="watchList-title">Your Watchlist</h1>
        <React.Suspense fallback={<h2 className="loading">Loading...</h2>}>
            <Await resolve={dataPromise.movies} >
                {(movies) =>
                 movies.length ? <Movies movies={movies}  menu="watchlist"/> :<h2 className="empty-list">No Items!</h2>}
            </Await>
            </React.Suspense>
         </div>
            )
        }