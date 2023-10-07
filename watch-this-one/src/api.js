

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
