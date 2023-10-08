import React from "react";
import { Await, defer, useLoaderData ,Link} from "react-router-dom";
import { getCountries, getMovieGenre, DiscoverMovie} from "../api";
import Movies from "../components/Movies";
import FilterForm from "../components/FilterForm";

export function loader({request}){
    return defer({
        url:request.url,
        genres:getMovieGenre(),
        countries:getCountries()
    })
}

export default function Discover(){
    const [movies,setMovies] = React.useState('')
    const dataPromise = useLoaderData()
    const handleFiltersChange = async (filters) => {
        const queryString = constructDiscoverQuery(filters);
        console.log(filters,queryString)
        const movies = await DiscoverMovie(queryString);
        setMovies(movies);
    };
    React.useEffect(handleFiltersChange,[])
      const constructDiscoverQuery = (filters) => {
        const { with_genres, region, year, sort_by } = filters;
      
        const queryString = new URLSearchParams();
      
        if (with_genres.length > 0) {
          queryString.append('with_genres', with_genres.join('|'));
        }
        if (region.length > 0) {
          queryString.append('region', region.join('|'));
        }
        if (year !== '') {
          queryString.append('primary_release_year', year);
        }
        queryString.append('sort_by', sort_by);
      
        return queryString.toString();
      };

   
    return (
        <>
        <React.Suspense fallback={<h2>Loading...</h2>}>
            <Await resolve={Promise.all([dataPromise.genres,dataPromise.countries]).then(value => value)}>
               {(value) => {
                    const [genres,countries] = value
                  return  <FilterForm genres={genres} countries={countries} onFiltersChange={handleFiltersChange}/>}
               }
            </Await>
        </React.Suspense>
        {movies && <Movies movies={movies} type="Movie" />}        
        </>
    )
}