import React from "react";
import { Await, Form, Link, defer, useLoaderData, useLocation } from "react-router-dom";
import { addToWatchList, getMovie, getWatchListMovie, removeWatchListMovie } from "../api";
import starIcon from "/assets/icons/star.png"
import { requireAuth } from "../auth";
export function loader({request,params} ){
    const url = request.url
    const type = url.includes('/movie') ? 'movie' : 'tv';
    const token = JSON.parse(localStorage.getItem("movieToken"))?.token
    const movie = getMovie(type,params.id)
    try {
        const isFavorite = getWatchListMovie(params.id, token);
        return defer({ movie, isFavorite });
      } catch (error) {
        console.log(error)
        return defer({ isFavorite:null,movie: movie });
      }
      
    

}
export async function action({request,params}){
    const url = request.url
    const type = url.includes('/movie') ? 'movie' : 'tv';
    const formData = await request.formData()
    const watchListButton =  formData.get('watchListButton')
    const token = await requireAuth(request)

    if(watchListButton==='add')
    {   
        let movie = formData.get('movie')
        if(type ==='tv')
        {
            const movieData = JSON.parse(movie)
            movieData.title = movieData.name
            movieData.release_date = movieData.first_air_date
            movie = JSON.stringify(movieData) 
         }
    try {
        const watchListMovie = await addToWatchList(movie,token)
        return "success"
    } catch (error) {
        return error.message
    }
    }
    else{
        try {
            const watchListMovie = await removeWatchListMovie(params.id,token)
            return "success"
        } catch (error) {
            return error.message
        }
    }
}

export default function MovieDetail(){
    const dataPromise = useLoaderData()
    const location = useLocation()
    const category = location.state?.category
    const menu = location.state?.menu
    const type = location.state?.type
    const goBackTo = ()=>{
        let redirectTo;
        if(menu){
            redirectTo = `/${menu}`
        }
        else{
            if(category){
                if(type =='tv'){
                    switch(category){
                        case 'upcoming':
                            redirectTo='../on_the_air';
                            break;
                        default:
                            redirectTo=`../${category}`
                    }
                }
                else{
                    redirectTo = `../${category}`
                }
            }
            else{
                redirectTo='..'
            }
        }
        return redirectTo
    }
    return (
        <>
        <React.Suspense fallback={<h2 className="loading">Loading...</h2>}>
            <Await resolve={Promise.all([dataPromise.movie,dataPromise.isFavorite]).then(value => value)}>
                {(value) =>{
                    const [movie,isFavorite] = value
                    movie.type = movie.name ? 'tv' : 'movie'
                    return (
                        <>
                        <Link
                        className="back-button"
                        to={goBackTo()}
                        relative="path"
            
                    ><span>&#8592;Go back</span></Link>
                    <div className="movie-details-container">
                    <img className="poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    <div className="movie-detail-info">
                        <h2>{movie.original_title || movie.name}</h2>
                       
                        <div>
                            <div className="mini-info">
                                <span><img  src={starIcon} alt="star-icon"/> {movie.vote_average.toFixed(1)}</span>
                                <span>{new Date(movie.type ==='movie' ? movie.release_date:movie.first_air_date).getFullYear()}</span>{" "}
                               {movie.type === 'movie' 
                               && ( <span>{movie.runtime} mins</span>)}
                               { movie.type ==="tv" && ( <span>SS {movie.number_of_seasons} EP {movie.last_episode_to_air.episode_number}</span>)}
                                {isFavorite ?
                        <Form method="DELETE">
                            <button className="watchList-button remove" type="submit" name="watchListButton" value="remove">Remove from Watchlist</button>
                        </Form>
                        :
                       ( <Form method="post">
                            <input type="hidden" value={JSON.stringify(movie)} name="movie" />
                            <button className="watchList-button" type="submit" name="watchListButton" value="add">Add to Watchlist</button>
                        </Form>)
                        }
                            </div>
                        <div className="overview">{movie.overview} </div>
                        <div className="detail-ppties">
                            <pre>
                                <div>Type:             {movie.type}</div>
                                <div>Country:        {movie.production_countries.map(country=> <span>{country.name}, </span>)}</div>
                                <div>Genre:           {movie.genres.map(genre => <span>{genre.name}, </span>)}</div>
                                <div>Release:        {movie.release_date || movie.first_air_date}</div>
                                <div className="production-container"><div>Production:      </div><div className="production"> {movie.production_companies.map(company => <span>{company.name}, </span>)}</div></div>
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
                }    
            </Await>
            </React.Suspense>
            </>
            )
        }