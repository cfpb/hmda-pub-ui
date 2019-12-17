import React from 'react'
import BannerUSA from './BannerUSA'
import { links } from './links'

import './Header.css'
import logo from './images/ffiec-logo.svg'

const Header = props => {
  const currentLinks = props.links || links
  return (
    <React.Fragment>
      <a className="skipnav" href="#main-content">
        Skip to main content
      </a>
      <header className="hmda-header header header-basic" role="banner">
        <BannerUSA />
        <div className="nav-container">
          <div className="logo" id="logo">
            <span className="logo-text">
              <a className="nav-link" href="/" aria-label="Home">
                <img alt="FFIEC" src={logo} height="32" />
                <span>Home Mortgage Disclosure Act</span>
              </a>
            </span>
          </div>
          <nav className="nav">
            <ul className="nav-primary">
              {currentLinks.map(link => {
                const path = window.location.pathname
                let isActive = path.match(link.href)
                if(link.href === '/') isActive = link.href === path

                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={
                          isActive
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      target={link.name === 'Filing' ? '_blank' : null}
                      rel={
                        link.name === 'Filing' ? 'noopener noreferrer' : null
                      }
                    >
                      {link.name}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </header>
    </React.Fragment>
  )
}

export default Header
