import React from "react"
import starIcon from "/assets/icons/star.png"
import { Link } from "react-router-dom"
export default function Movies({movies,type,category,menu}){
    const renderElements = movies.map(movie =>{
      const Type = type || movie.type
      return(
        <div key={movie.id} className="movie-tile ">
            <Link className="link"
              to={`/${Type}/${movie.id}`}
              state={{category:category,menu:menu,type:type}}
              > 
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <div>
              <div className="movie-info-container">
                <div className="movie-info">
                    <span>{Type}</span>
                    <span>{new Date(movie.release_date || movie.first_air_date).getFullYear()}</span>
                    <span><img  src={starIcon} alt="star-icon"/> {movie.vote_average.toFixed(1)}</span>
                </div>
              </div>
                <div className="movie-title">{movie.title || movie.name}</div>
              </div>
              </Link>

        </div>
    )})
    
       return( 
       <div className="movies-container">
            {renderElements}
       </div>)

       }