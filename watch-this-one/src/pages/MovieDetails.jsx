import React from "react";
import { defer, useLoaderData } from "react-router-dom";
import { getMovie } from "../api";

export function loader({params} ){
    console.log('in the loader')
    return getMovie(params.id)
}

export default function MovieDetail(){
    const movie = useLoaderData()

    return (
        <div className="movie-details-container">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <div className="movie-detail-info">
            <h2>{movie.original_title}</h2>
            <div>
            <span><img  src="/src/assets/icons/star.png" alt="star-icon"/> {movie.vote_average.toFixed(1)}</span>{" "}
            <span>{new Date(movie.release_date).getFullYear()}</span>{" "}
            <span>{movie.runtime} mins</span>
            <div>{movie.overview} </div>
            <div>
                <div>Type : movie</div>
                <div>Country : {movie.production_countries.map(country=> <span>{country.name} </span>)}</div>
                <div>Genre : {movie.genres.map(genre => <span>{genre.name}  </span>)}</div>
                <div>Release : {movie.release_date}</div>
                <div>Production : {movie.production_companies.map(company => <span>{company.name} </span>)}</div>
                <div>Languages : {movie.spoken_languages.map(language => <span>{language.english_name} </span>)}</div>
                <div>Tags : {movie.tagline}</div>
            </div>
            </div>
        </div>
        </div>
    )
}