import React from 'react';
import { Link } from 'react-router-dom';
import "../../src/App.css"

const Header = () => {
  return (
   <>
   <div className="header">
   <Link to="/" className='title'> Online Quiz </Link>
   {/* <hr className='hr-line'/> */}
   </div>
   </>
  )
}

export default Header