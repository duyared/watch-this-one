import React from "react";
import { Await, defer, useLoaderData ,Link, useOutletContext} from "react-router-dom";
import { getMovies,  } from "../api";
import Movies from "../components/Movies";

export function loader({request}){
    const url = request.url
    const type = url.includes('/movie') ? 'movie' : 'tv';
    const category = type === 'movie' ? 'now_playing' : 'airing_today'
    return defer({movies:getMovies(type,category),type:type})
}

export default function NowPlaying(){
    const dataPromise = useLoaderData()
    return (
        <React.Suspense fallback={<h2 className="loading">Loading...</h2>}>
            <Await resolve={dataPromise.movies}>
                {(movies) => <Movies movies={movies} type={dataPromise.type} />}
            </Await>
        </React.Suspense>
    )
}