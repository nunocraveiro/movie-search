export const apiGet = async (request, query = '') => {
    const key = import.meta.env.VITE_API_AUTH
    let url = ''
    switch (request) {
      case 'trending':
        url = 'https://api.themoviedb.org/3/trending/movie/week?language=en'
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
  