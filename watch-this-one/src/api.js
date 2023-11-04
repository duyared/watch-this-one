
const tmdbAPIKey = import.meta.env.VITE_TMDB_API_KEY
const myAPIURL = import.meta.env.VITE_MY_API_URL

export async function getMovies(type,category){
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${tmdbAPIKey}` 
        }
      };
      
      const res = await fetch(`https://api.themoviedb.org/3/${type}/${category}?language=en-US&page=1`, options)
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
export async function getMovie(type,id){
    
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${tmdbAPIKey}` 
        }
      };
      
      const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}?language=en-US`, options)
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
      Authorization: `Bearer ${tmdbAPIKey}` 
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
      Authorization: `Bearer ${tmdbAPIKey}` 
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
export async function DiscoverMovie(queryString,type){
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${tmdbAPIKey}` 
    }
  };
  
  const res = await fetch(`https://api.themoviedb.org/3/discover/${type}?&language=en-US&page=1&${queryString}`, options)
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
  const res = await fetch(`${myAPIURL}/api/v1/auth/login`,
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
export async function registerUser(creds){
  console.log(myAPIURL)
  const res = await fetch(`${myAPIURL}/api/v1/auth/register`,
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
  const res = await fetch(`${myAPIURL}/api/v1/favorites`,
  {method:"post",
   headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: movie})
  const data = await res.json()
  if(!res.ok){
    throw{
      message: data.msg,
    }
  }
  return data
}


export async function getWatchList(token){
  const res = await fetch(`${myAPIURL}/api/v1/favorites`,
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
  const res = await fetch(`${myAPIURL}/api/v1/favorites/${id}`,
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
  const res = await fetch(`${myAPIURL}/api/v1/favorites/${id}`,
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
