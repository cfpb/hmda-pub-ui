import React from 'react'
import { Link } from 'react-router-dom'
import BannerUSA from './BannerUSA.jsx'

const AppHeader = () => {
  return (
    <React.Fragment>
      <a key={1} className="usa-skipnav" href="#main-content">
        Skip to main content
      </a>
      <header
        key={2}
        className="appHeader usa-header usa-header-basic"
        role="banner"
      >
        <BannerUSA />
        <div className="usa-nav-container">
          <div className="usa-logo" id="logo">
            <em className="usa-logo-text">
              <img src="/reports/img/ffiec-logo.png" width="125px" />
            </em>
          </div>
          <nav className="usa-nav">
            <ul className="usa-nav-primary">
              <li>
                <a href={window.HMDA_ENV.APP_URL} className="usa-nav-link">
                  Home
                </a>
              </li>
              <li>
                <Link className="usa-nav-link" to="/">
                  Reports
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </React.Fragment>
  )
}

export default AppHeader
