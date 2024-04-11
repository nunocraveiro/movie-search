import { useNavigate } from 'react-router-dom'
import './MovieCard.css'

function MovieCard({movie, favourites, setFavourites}) {
  const navigate = useNavigate();

  const handleFavourite = (e) => {
    if (e.target.classList.contains('fill')) {
      return setFavourites(favourites.filter(favourite => favourite.id !== movie.id))
    }
    return setFavourites([...favourites, movie])
  }

  const toDetails = () => {
    navigate(`/${movie.id}`)
  }

  return (
    <div className='movie_card'>
        <img className='card_poster' src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt='movie poster' onClick={toDetails}/>
        <div className='card_info'>
          <p className='card_title' onClick={toDetails}>{movie.title}</p>
          <span className={favourites.find(favourite => favourite.id === movie.id) ? 'card_favourite fill material-symbols-outlined' : 'card_favourite material-symbols-outlined'} onClick={handleFavourite}>favorite</span>
        </div>
    </div>
  )
}

export default MovieCard