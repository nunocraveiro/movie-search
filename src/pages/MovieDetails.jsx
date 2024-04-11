import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { apiGet, timeConvert } from '../helpers'
import Header from '../components/Header'
import './MovieDetails.css'

function MovieDetails() {
  const { movieId } = useParams()
  const [movieDetails, setMovieDetails] = useState(null)
  const [movieCredits, setMovieCredits] = useState(null)

  useEffect(() => {
    const fetchMovieDetails = async() => {
        const data = await apiGet('details', movieId)
        setMovieDetails(data)
    }
    const fetchMovieCredits = async() => {
        const data = await apiGet('credits', movieId)
        setMovieCredits(data)
    }
    fetchMovieDetails()
    fetchMovieCredits()
}, [])

  return (
    <div className='details_page'>
      <Header />
      {movieDetails && movieCredits && <div className='details'>
        <img className='poster' src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`} alt='poster' />
        <div className='info'>
          <div className='info_title_row'>
            <h2>{movieDetails.title}</h2>
            <div className='rating'>
              <p>{(movieDetails.vote_average).toFixed(1)}</p>
              <span className='rating_star material-symbols-outlined'>star</span>
            </div>
          </div>
          <div className='details_short'>
            <p>{movieDetails.release_date.slice(0, 4)}</p>
            <p>|</p>
            <p>{timeConvert(movieDetails.runtime)}</p>
          </div>
          <p className='details_overview_title'>OVERVIEW</p>
          <p className='details_overview'>{movieDetails.overview}</p>
          <div className='info_row'>
            <p>Starring</p>
            {movieCredits.cast.slice(0, 3).map(el => <p className='info_element' key={el.id}>{el.name},</p>)}
          </div>
          <div className='info_row'>
            <p>Created by</p>
            {movieCredits.crew.slice(0, 3).map(el => <p className='info_element' key={el.id}>{el.name},</p>)}
          </div>
          <div className='info_row'>
            <p>Genre</p>
            {movieDetails.genres.map(genre => <p className='info_element' key={genre.id}>{genre.name},</p>)}
          </div>
        </div>
      </div>}
    </div>
  )
}

export default MovieDetails