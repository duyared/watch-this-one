import { json } from "react-router-dom";


export async function getMovies(category){
    
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMjA4YjFmNzMzM2YwYjk4OWE0OWQ1YTFjZWQzY2VhMSIsInN1YiI6IjY1MWQwMmY2ZWE4NGM3MDBjYTA5YmVkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IIO10e-H5MyKdJop2wXtSQmcu5mQyouz2WOaTIJZGFc'
        }
      };
      
      const res = await fetch(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`, options)
      const data = await res.json()
      if(!res.ok){
        throw{
            message: data.message,
            statusText: res.statusText,
            status:res.status
        }
      }
      return data.results
}
export async function getMovie(id){
    
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMjA4YjFmNzMzM2YwYjk4OWE0OWQ1YTFjZWQzY2VhMSIsInN1YiI6IjY1MWQwMmY2ZWE4NGM3MDBjYTA5YmVkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IIO10e-H5MyKdJop2wXtSQmcu5mQyouz2WOaTIJZGFc'
        }
      };
      
      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      const data = await res.json()
      if(!res.ok){
        throw{
            message: data.message,
            statusText: res.statusText,
            status:res.status
        }
      }
      return data
}


export async function getMovieGenre(){
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMjA4YjFmNzMzM2YwYjk4OWE0OWQ1YTFjZWQzY2VhMSIsInN1YiI6IjY1MWQwMmY2ZWE4NGM3MDBjYTA5YmVkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IIO10e-H5MyKdJop2wXtSQmcu5mQyouz2WOaTIJZGFc'
    }
  };
  
  const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
  const data = await res.json()
  if(!res.ok){
    throw{
        message: data.message,
        statusText: res.statusText,
        status:res.status
    }
  }
  return data.genres
}
export async function getCountries(){
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMjA4YjFmNzMzM2YwYjk4OWE0OWQ1YTFjZWQzY2VhMSIsInN1YiI6IjY1MWQwMmY2ZWE4NGM3MDBjYTA5YmVkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IIO10e-H5MyKdJop2wXtSQmcu5mQyouz2WOaTIJZGFc'
    }
  };
  
  const res = await fetch('https://api.themoviedb.org/3/configuration/countries?language=en-US', options)
  const data = await res.json()
  if(!res.ok){
    throw{
        message: data.message,
        statusText: res.statusText,
        status:res.status
    }
  }
  return data
}
export async function DiscoverMovie(queryString){
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMjA4YjFmNzMzM2YwYjk4OWE0OWQ1YTFjZWQzY2VhMSIsInN1YiI6IjY1MWQwMmY2ZWE4NGM3MDBjYTA5YmVkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IIO10e-H5MyKdJop2wXtSQmcu5mQyouz2WOaTIJZGFc'
    }
  };
  
  const res = await fetch(`https://api.themoviedb.org/3/discover/movie?&language=en-US&page=1&${queryString}`, options)
  const data = await res.json()
  if(!res.ok){
    throw{
        message: data.message,
        statusText: res.statusText,
        status:res.status
    }
  }
  return data.results
}

export async function loginUser(creds){
  const res = await fetch("http://localhost:5000/api/v1/auth/login",
  {method:"post",
   headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(creds)})
  console.log(JSON.stringify(creds))
  const data = await res.json()
  if(!res.ok){
    throw{
      message: data.msg,
    }
  }
  return data
}
export async function registerUser(creds){
  const res = await fetch("http://localhost:5000/api/v1/auth/register",
  {method:"post",
   headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(creds)})
  const data = await res.json()
  if(!res.ok){
    throw{
      message: data.msg,
    }
  }
  return data
}
export async function addToWatchList(movie,token){
  const res = await fetch("http://localhost:5000/api/v1/favorites",
  {method:"post",
   headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: movie})
  console.log(JSON.stringify(movie,token))
  const data = await res.json()
  if(!res.ok){
    throw{
      message: data.msg,
    }
  }
  return data
}


export async function getWatchList(token){
  const res = await fetch("http://localhost:5000/api/v1/favorites",
  {method:"get",
   headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
 })
  const data = await res.json()
  if(!res.ok){
    throw{
      message: data.msg,
    }
  }
  return data
}


export async function getWatchListMovie(id,token){
  const res = await fetch(`http://localhost:5000/api/v1/favorites/${id}`,
  {
    method:"get",
   headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
 })
  const data = await res.json()
  if(!res.ok){
    return null;

  }
  return data
}

export async function removeWatchListMovie(id,token){
  const res = await fetch(`http://localhost:5000/api/v1/favorites/${id}`,
  {
    method:"delete",
   headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
 })
  const data = await res.json()
  if(!res.ok){
    throw{
      message: data.msg,
    }
  }
  return data
}
