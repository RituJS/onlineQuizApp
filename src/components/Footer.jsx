import React from 'react'
import { Link } from 'react-router-dom'
import "../../src/App.css"

const Footer = () => {
  return (
    <div className='footer'>
      <h4 className='text-center'>All Right Reserved &copy; Ritu Joshi</h4>
      <div className='text-center mt-3'><Link to={'/about'}>About-us</Link>|
      <Link to={'/contact-us'}>Contact-us</Link>|
      <Link to={'/policy'}>Private Policy</Link></div>
     
    </div>
  )
}

export default Footer