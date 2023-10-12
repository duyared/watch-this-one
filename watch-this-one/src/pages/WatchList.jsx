
import React from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import Movies from "../components/Movies";
import { getWatchList } from "../api";
export async function loader(){
    const token = localStorage.getItem('movieToken')
    return defer({movies:getWatchList(token)})
}
export default function WatchList(){
    const dataPromise = useLoaderData()
    return (
        <div>
        <h1>WatchList</h1>
        <React.Suspense fallback={<h2>Loading...</h2>}>
            <Await resolve={dataPromise.movies} >
                {(movies) => <Movies movies={movies} type="Movie" />}
            </Await>
            </React.Suspense>
         </div>
            )
        }