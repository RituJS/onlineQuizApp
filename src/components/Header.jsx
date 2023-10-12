import React from 'react';
import { Link } from 'react-router-dom';
import "../../src/App.css"

const Header = () => {
  return (
    <>
      <div className="header">
        <Link to="/" className='title'> Online Quiz </Link>
      </div>
    </>
  )
}

export default Header