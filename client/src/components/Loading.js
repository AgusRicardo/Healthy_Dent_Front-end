import React from 'react'
import loader from '../helper/loader.gif'
import '../styles/loader.css'

export const Loading = () => {
  return (
    <div className='loaderGif'>
      <img src={loader} alt="" width="300px"/>
    </div>
  )
}
