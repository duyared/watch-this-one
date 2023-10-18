import React from "react";
import { Await, Form, Link, defer, useLoaderData, useLocation } from "react-router-dom";
import { addToWatchList, getMovie, getWatchListMovie, removeWatchListMovie } from "../api";

export function loader({request,params} ){
    const url = request.url
    console.log(url)
    const type = url.includes('/movie') ? 'movie' : 'tv';
    console.log(type)
    const token = localStorage.getItem('movieToken')
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
    const formData = await request.formData()
    const watchListButton =  formData.get('watchListButton')
    const token = localStorage.getItem('movieToken')

    if(watchListButton==='add')
    { 
        const movie = formData.get("movie")
    try {
        const watchListMovie = await addToWatchList(movie,token)
        console.log(watchListMovie)
        return "success"
    } catch (error) {
        return error.message
    }
    }
    else{
        try {
            const watchListMovie = await removeWatchListMovie(params.id,token)
            console.log(watchListMovie)
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
                        <h2>{movie.original_title}</h2>
                       
                        <div>
                            <div className="mini-info">
                                <span><img  src="/src/assets/icons/star.png" alt="star-icon"/> {movie.vote_average.toFixed(1)}</span>
                                <span>{new Date(movie.release_date).getFullYear()}</span>{" "}
                                <span>{movie.runtime} mins</span>
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
                }    
            </Await>
            </React.Suspense>
            </>
            )
        }