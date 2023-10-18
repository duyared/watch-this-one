import React from "react";
import { Await, defer, useLoaderData, useOutletContext ,} from "react-router-dom";
import { getMovies, } from "../api";
import Movies from "../components/Movies";

export function loader({request}){
    const url = request.url
    const type = url.includes('/movie') ? 'movie' : 'tv';
    const category = type === 'movie' ? 'upcoming' : 'on_the_air'
    return defer({movies:getMovies(type,category),type:type})
}

export default function Upcoming(){
    const dataPromise = useLoaderData()

    
    return (
        <React.Suspense fallback={<h2 className="loading">Loading...</h2>}>
            <Await resolve={dataPromise.movies}>
                {(movies) => <Movies movies={movies} type={dataPromise.type} category="upcoming"/>}
            </Await>
        </React.Suspense>
    )
}