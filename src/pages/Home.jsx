import { useState, useEffect } from 'react'
import { apiGet } from '../helpers'
import Header from '../components/Header'
import SearchFilter from '../components/SearchFilter'
import MovieGrid from '../components/MovieGrid'
import './Home.css'

function Home() {
  const [backgroundUrl, setBackgroundUrl] = useState('')
  const [genres, setGenres] = useState([])
  const [movies, setMovies] = useState([])
  const [nowPlayingMovies, setNowPlayingMovies] = useState([])
  const [favouriteMovies, setFavouriteMovies] = useState(JSON.parse(localStorage.getItem('movies_app_favourites')) ?
    JSON.parse(localStorage.getItem('movies_app_favourites')) : [])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [activeFavourites, setActiveFavourites] = useState(false)
  const [loadingSearch, setLoadingSearch] = useState(false)

  useEffect(() => {
      const fetchTrendingMovie = async() => {
          const data = await apiGet('trending')
          setBackgroundUrl(`https://image.tmdb.org/t/p/original${data.results[0].backdrop_path}`)
      }
      const fetchGenres = async() => {
        const data = await apiGet('genres')
        setGenres(data.genres)
      }
      const fetchNowPlayingMovies = async() => {
        const data = await apiGet('nowplaying')
        setNowPlayingMovies(data.results)
        setMovies(data.results)
      }
      fetchTrendingMovie()
      fetchGenres()
      fetchNowPlayingMovies()
  }, [])

  useEffect(() => {
    if (activeFavourites) setMovies(favouriteMovies)
    localStorage.setItem('movies_app_favourites', JSON.stringify(favouriteMovies))
  }, [favouriteMovies])

  const nowPlayingClick = () => {
    setActiveFavourites(false)
    return setMovies(nowPlayingMovies)
  }

  const favouritesClick = () => {
    setActiveFavourites(true)
    return setMovies(favouriteMovies)
  }

  return (
    <div>
      <div className='background_overlay'></div>
      <img className='header_background' src={backgroundUrl} alt="background" />
      <Header />
      <div className='trending'></div>
      <SearchFilter
        genres={genres} 
        nowPlaying={nowPlayingMovies} 
        setMovies={setMovies} 
        setFiltered={setFilteredMovies} 
        setActiveFavourites={setActiveFavourites} 
        setLoadingSearch={setLoadingSearch} 
      />
      <div className='view_selector'>
        <p className='now_playing' onClick={nowPlayingClick}>Now Playing</p>
        <p className='favourites' onClick={favouritesClick}>Favourites</p>
      </div>
      <MovieGrid 
        movies={movies} 
        favourites={favouriteMovies} 
        setFavourites={setFavouriteMovies} 
        loadingSearch={loadingSearch} 
        setLoadingSearch={setLoadingSearch} 
      />
    </div>
  )
}

export default Home