import React from "react";
import { Await, defer, useLoaderData, useOutletContext} from "react-router-dom";
import { getMovies } from "../api";
import Movies from "../components/Movies";

export function loader({request}){
    const url = request.url
    const type = url.includes('/movie') ? 'movie' : 'tv';
    return defer({movies:getMovies(type,"top_rated"),type:type})
}

export default function TopRated(){
    const dataPromise = useLoaderData()
    const {type} = useOutletContext()

    return (
        <React.Suspense fallback={<h2 className="loading">Loading...</h2>}>
            <Await resolve={dataPromise.movies}>
                {(movies) => <Movies movies={movies} type={type} category="top_rated"/>}
            </Await>
        </React.Suspense>
    )
}