import React from "react"
import { Link } from "react-router-dom"
export default function Movies({movies,type}){

    const renderElements = movies.map(movie =>(
        <div key={movie.id} className="movie-tile ">
            <Link className="link"
              to={`/movies/${movie.id}`}
              > 
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <div>
              <div className="movie-info-container">
                <div className="movie-info">
                    <span>{type}</span>
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                    <span><img  src="/src/assets/icons/star.png" alt="star-icon"/> {movie.vote_average.toFixed(1)}</span>
                </div>
              </div>
                <div className="movie-title">{movie.title}</div>
              </div>
              </Link>

        </div>
    ))
       return( 
       <div className="movies-container">
            {renderElements}
       </div>)

       }