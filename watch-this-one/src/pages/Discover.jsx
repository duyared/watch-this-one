import React from "react";
import { Await, defer, useLoaderData ,Link} from "react-router-dom";
import { getMovies,  } from "../api";
import Movies from "../components/Movies";
import FilterForm from "../components/FilterForm";

export function loader({request}){
    return defer({movies:getMovies("now_playing"),url:request.url})
}

export default function Discover(){
    const dataPromise = useLoaderData()
    console.log(dataPromise.url)
    return (
        <>
        <FilterForm />
        <React.Suspense fallback={<h2>Loading...</h2>}>
            <Await resolve={dataPromise.movies}>
                {(movies) => <Movies movies={movies} type="Movie"/>}
            </Await>
        </React.Suspense>
        </>
    )
}