import React from 'react'
import { Link } from 'react-router-dom'
import BannerUSA from './BannerUSA.jsx'

const Header = () => {
  return (
    <React.Fragment>
      <a key={1} className="usa-skipnav" href="#main-content">
        Skip to main content
      </a>
      <header
        key={2}
        className="Header usa-header usa-header-basic"
        role="banner"
      >
        <BannerUSA />
        <div className="usa-nav-container">
          <div className="usa-logo" id="logo">
            <em className="usa-logo-text">
              <img src="img/ffiec-logo.png" width="125px" />
            </em>
          </div>
          <nav className="usa-nav">
            <ul className="usa-nav-primary">
              <li>
                <Link className="usa-nav-link" to="/modified-lar">
                  Modified LAR
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </React.Fragment>
  )
}

export default Header
