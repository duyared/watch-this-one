import React from "react";
import { Await, defer, useLoaderData} from "react-router-dom";
import { getMovies } from "../api";
import Movies from "../components/Movies";

export function loader(){
    return defer({movies:getMovies("top_rated")})
}

export default function TopRated(){
    const dataPromise = useLoaderData()
    
    return (
        <React.Suspense fallback={<h2 className="loading">Loading...</h2>}>
            <Await resolve={dataPromise.movies}>
                {(movies) => <Movies movies={movies} type="Movie" category="top_rated"/>}
            </Await>
        </React.Suspense>
    )
}