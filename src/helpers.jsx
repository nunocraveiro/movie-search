export const apiGet = async (request, query = '') => {
    const key = import.meta.env.VITE_API_AUTH
    let url = ''
    switch (request) {
        case 'trending':
          url = 'https://api.themoviedb.org/3/trending/movie/week?language=en'
          break
        case 'genres':
          url = 'https://api.themoviedb.org/3/genre/movie/list?language=en'
          break
        case 'nowplaying':
          url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1'
          break
        case 'search':
          url = `https://api.themoviedb.org/3/search/movie?query=${query.replace(/ /g, '%20')}&include_adult=false&language=en-US&page=1`
          break
        case 'filter':
          url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${query}`
          break
        case 'details':
          url = `https://api.themoviedb.org/3/movie/${query}?language=en-US`
          break
        case 'credits':
          url = `https://api.themoviedb.org/3/movie/${query}/credits?language=en-US`
          break
    }
  
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: key
      }
    };
  
    // ADD ERROR HANDLING
    const response = await fetch(url, options)
    const data = await response.json()
    return data;
}
  