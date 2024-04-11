import { apiGet } from '../helpers'
import { useRef } from 'react'
import './SearchFilter.css'

function searchFilter({genres, nowPlaying, setMovies, setFiltered, setActiveFavourites, setLoadingSearch, setNoResults}) {
    const searchRef = useRef(null)

    const searchSubmit = async (e) => {
        if (e.key === 'Enter') {
            setActiveFavourites(false)
            setLoadingSearch(true)
            const data = await apiGet('search', e.target.value)
            if (data.results.length === 0) {
                searchRef.current.value = ''
            }
            setFiltered(data.results)
            return setMovies(data.results)
        }
    }

    const clearFilter = () => {
        searchRef.current.value = ''
        setFiltered([])
        return setMovies(nowPlaying)
    }

    const filterByGenre = async (e) => {
        setActiveFavourites(false)
        searchRef.current.value = ''
        const data = await apiGet('filter', e.currentTarget.value)
        setFiltered(data.results)
        return setMovies(data.results)
    }

    return (
        <div className='search_filter'>
            <input className='search_input' ref={searchRef} type="text" placeholder='Search movie' onKeyDown={searchSubmit} onChange={(e) => {if (e.target.value === '') clearFilter()}}/>
            <select className='genre_select' name='genres' onClick={filterByGenre}>
                <option className='all_genres' value='' onClick={clearFilter}>All genres</option>
                {genres.map(genre => <option value={genre.id} key={genre.id}>{genre.name}</option>)}
            </select>
        </div>
  )
}

export default searchFilter