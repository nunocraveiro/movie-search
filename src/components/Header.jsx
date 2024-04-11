import { useState } from 'react'
import profile from '../assets/profile.png'
import './Header.css'

function Header() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className='header'>
      <span className='app_logo material-symbols-outlined'>theaters</span>
      <div className='header_right'>
          <img 
            className='profile_pic' 
            src={profile} alt="profile" 
            style={isLoaded ? {} : { display: 'none' }} 
            onLoad={() => setIsLoaded(true)} 
          />
      </div>
    </div>
  )
}

export default Header