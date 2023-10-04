import React from "react";
import { Await, defer, useLoaderData} from "react-router-dom";
import { getNowPlayingMovies, getTopMovies } from "../api";
import Movies from "../components/Movies";

export function loader(){
    return defer({movies:getNowPlayingMovies()})
}

export default function Home(){
    const dataPromise = useLoaderData()
    
    return (
        <React.Suspense fallback={<h2>Loading...</h2>}>
            <Await resolve={dataPromise.movies}>
                {(movies) => <Movies movies={movies} type="Movie"/>}
            </Await>
        </React.Suspense>
    )
}