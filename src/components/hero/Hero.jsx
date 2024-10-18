import React from 'react'
import './Hero.scss'
import { useNavigate } from 'react-router-dom'

function Hero() {
 const navigate = useNavigate();

  return (
    <div className='Hero'>
      <div className="hero-content center">
        <h2 className='heading'>Exclusive Print and Artwork</h2>
        <p className="subheading">Exclusive Art pieces, For the Exlusive You</p>
         <button className='cta primary-btn' onClick={() => navigate('/category')}>Explore more</button>
      </div>
    </div>
  )
}

export default Hero 