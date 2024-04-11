import MovieCard from './MovieCard'
import Loader from './Loader'
import { useEffect } from 'react'
import './MovieGrid.css'

function MovieGrid({movies, favourites, setFavourites, loadingSearch, setLoadingSearch}) {
    
    useEffect(() => {
        setLoadingSearch(false)
    }, [movies])

    return (
        loadingSearch ? <Loader /> : <div className='movie_grid'>
            {movies.map(movie => 
                <MovieCard 
                    movie={movie} 
                    key={movie.id}
                    favourites={favourites}
                    setFavourites={setFavourites}
                />
            )}
        </div>
    )
}

export default MovieGrid