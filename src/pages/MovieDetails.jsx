import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import './MovieDetails.css'

function MovieDetails() {
  const { movieId } = useParams()

  return (
    <div className='details_page'>

    </div>
  )
}

export default MovieDetails