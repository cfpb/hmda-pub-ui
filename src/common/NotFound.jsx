import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header.jsx'

const NotFound = () => {
  return (
    <div className="usa-grid" id="main-content">
      <div className="usa-width-one-whole">
        <Header
          type={1}
          headingText="Sorry, something went wrong."
          paragraphText="We can't seem to find the page you are looking for."
        >
          <Link to="/">Return to the data publication home page.</Link>
        </Header>
      </div>
    </div>
  )
}

export default NotFound
