import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiGet } from '../helpers'
import Header from '../components/Header'
import SearchFilter from '../components/SearchFilter'
import MovieGrid from '../components/MovieGrid'
import Loader from '../components/Loader'
import './Home.css'

function Home() {
  const [trendingMovie, setTrendingMovie] = useState(null)
  const [genres, setGenres] = useState([])
  const [movies, setMovies] = useState([])
  const [nowPlayingMovies, setNowPlayingMovies] = useState([])
  const [favouriteMovies, setFavouriteMovies] = useState(JSON.parse(localStorage.getItem('movies_app_favourites')) ?
    JSON.parse(localStorage.getItem('movies_app_favourites')) : [])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [activeFavourites, setActiveFavourites] = useState(false)
  const [loadingSearch, setLoadingSearch] = useState(false)
  const [noResults, setNoResults] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
      const fetchTrendingMovie = async() => {
        const data = await apiGet('trending')
        console.log(data.results);
        setTrendingMovie(data.results[0])
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

  const trendingNavigate = () => {
    navigate(`/${trendingMovie.id}`)
  }

  return (
    <div>
      <div className='background_overlay'></div>
      {!trendingMovie && <Loader />}
      {trendingMovie && <img className='header_background' src={`https://image.tmdb.org/t/p/original${trendingMovie.backdrop_path}`} alt="background" />}
      <Header />
      {trendingMovie && <div className='trending'>
        <p>Movie of the Week:</p>
        <h2 onClick={trendingNavigate}>{trendingMovie.title}</h2>
      </div>}
      <SearchFilter
        genres={genres} 
        nowPlaying={nowPlayingMovies} 
        setMovies={setMovies} 
        setFiltered={setFilteredMovies} 
        setActiveFavourites={setActiveFavourites} 
        setLoadingSearch={setLoadingSearch}
        setNoResults={setNoResults}
      />
      <div className='view_selector'>
        <p className={activeFavourites ? 'not_selected' : 'selected'} onClick={nowPlayingClick}>Now Playing</p>
        <p className={activeFavourites ? 'selected' : 'not_selected'} onClick={favouritesClick}>Favourites</p>
      </div>
      {movies.length === 0 && activeFavourites && 
        <div className='not_found'>
          You have no favourite movies yet
        </div>
      }
      {movies.length === 0 && !activeFavourites ? 
        <div className='not_found'>
          Oops! Movie not found...
        </div> :
        <MovieGrid 
          movies={movies} 
          favourites={favouriteMovies} 
          setFavourites={setFavouriteMovies} 
          loadingSearch={loadingSearch} 
          setLoadingSearch={setLoadingSearch} 
        />}
    </div>
  )
}

export default Home