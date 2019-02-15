import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header.jsx'

import './NotFound.css'

const NotFound = () => {
  return (
    <div className="NotFound" id="main-content">
      <Header
        type={1}
        headingText="Sorry, something went wrong."
        paragraphText="We can't seem to find the page you are looking for."
      >
        <Link to="/">Return to the data publication home page.</Link>
      </Header>
    </div>
  )
}

export default NotFound
