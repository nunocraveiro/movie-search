import { useState, useEffect } from 'react'
import { apiGet } from '../helpers'
import Header from '../components/Header'
import './Home.css'

function Home() {
  const [backgroundUrl, setBackgroundUrl] = useState('')

  useEffect(() => {
    const fetchTrendingMovie = async() => {
        const data = await apiGet('trending')
        setBackgroundUrl(`https://image.tmdb.org/t/p/original${data.results[0].backdrop_path}`)
    }
    fetchTrendingMovie()
  }, [])

  return (
    <div>
      <div className='background_overlay'></div>
      <img className='header_background' src={backgroundUrl} alt="background" />
      <Header />
    </div>
  )
}

export default Home