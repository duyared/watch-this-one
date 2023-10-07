import React from "react";
import { Await, defer, useLoaderData ,Link} from "react-router-dom";
import { getCountries, getMovieGenre, getMovies,  } from "../api";
import Movies from "../components/Movies";
import FilterForm from "../components/FilterForm";

export function loader({request}){
    return defer({
        movies:getMovies("now_playing"),
        url:request.url,
        genres:getMovieGenre(),
        countries:getCountries()
    })
}

export default function Discover(){
    const dataPromise = useLoaderData()
   
    return (
        <>
        <React.Suspense fallback={<h2>Loading...</h2>}>
            <Await resolve={Promise.all([dataPromise.genres,dataPromise.countries]).then(value => value)}>
               {(value) => {
                    const [genres,countries] = value
                  return  <FilterForm genres={genres} countries={countries} />}
               }
            </Await>
            <Await resolve={dataPromise.movies}>
                {(movies) => <Movies movies={movies} type="Movie"/>}
            </Await>
        </React.Suspense>
        </>
    )
}