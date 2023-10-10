import React from "react";
import { Link, defer, useLoaderData, useLocation } from "react-router-dom";
import { getMovie } from "../api";

export function loader({params} ){
    return getMovie(params.id)
}

export default function MovieDetail(){
    const movie = useLoaderData()
    const location = useLocation()
    const category = location.state.category
    return (
        <>
        <Link
            className="back-button"
            to={category ? `../${category}` : ".."}
            relative="path"

        ><span>&#8592;Go back</span></Link>
        <div className="movie-details-container">
        <img className="poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <div className="movie-detail-info">
            <h2>{movie.original_title}</h2>
            <div>
                <div className="mini-info">
                    <span><img  src="/src/assets/icons/star.png" alt="star-icon"/> {movie.vote_average.toFixed(1)}</span>
                    <span>{new Date(movie.release_date).getFullYear()}</span>{" "}
                    <span>{movie.runtime} mins</span>
                </div>
            <div className="overview">{movie.overview} </div>
            <div>
                <pre>
                    <div>Type:             Movie</div>
                    <div>Country:        {movie.production_countries.map(country=> <span>{country.name}, </span>)}</div>
                    <div>Genre:           {movie.genres.map(genre => <span>{genre.name}, </span>)}</div>
                    <div>Release:        {movie.release_date}</div>
                    <div>Production:    {movie.production_companies.map(company => <span>{company.name}, </span>)}</div>
                    <div>Languages:    {movie.spoken_languages.map(language => <span>{language.english_name}, </span>)}</div>
                    <div>Tags:              {movie.tagline}</div>
                </pre>
            </div>
            </div>
        </div>
        </div>
        </>
    )
}