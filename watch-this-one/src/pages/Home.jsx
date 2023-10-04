import React from "react";
import { Await, defer, useLoaderData ,Link} from "react-router-dom";
import { getTopMovies } from "../api";

export function loader(){
    return defer({movies:getTopMovies()})
}

export default function Home(){
    const dataPromise = useLoaderData()
    
    function renderMovies(movies){

        const renderElements = movies.map(movie =>(
            <div key={movie.id} className="movie-tile">
                <Link 
                  to={movie.id}
                  > 
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                  </Link>

            </div>
        ))
           return( 
           <div className="movies-container">
                {renderElements}
           </div>)
            
    }
    return (
        <React.Suspense fallback={<h2>Loading...</h2>}>
            <Await resolve={dataPromise.movies}>
                {renderMovies}
            </Await>
        </React.Suspense>
    )
}