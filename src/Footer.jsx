import React from 'react'

import './Footer.css'
import logo from './images/ffiec-logo.svg'

const Footer = () => {
  return (
    <React.Fragment>
      <div className="return-to-top">
        <a href="#">Return to top</a>
      </div>
      <footer className="Footer footer footer-slim" role="contentinfo">
        <div className="grid">
          <div className="item">
            <a className="home-link" href="/" aria-label="Home">
              <img alt="FFIEC" src={logo} height="21" />
              Home Mortgage Disclosure Act
            </a>
          </div>

          <div className="item">
            <h4>Resources</h4>

            <ul className="unstyled-list">
              <li>
                <a href="https://www.ffiec.gov/hmda/">FFIEC HMDA Website</a>
              </li>
              <li>
                <a href="https://www.federalregister.gov/documents/2015/10/28/2015-26607/home-mortgage-disclosure-regulation-c">
                  HMDA Final Rule
                </a>
              </li>
              <li>
                <a href="https://www.consumerfinance.gov/policy-compliance/guidance/implementation-guidance/hmda-implementation/">
                  Regulatory Implementation Resources
                </a>
              </li>
              <li>
                <a href="mailto:hmdahelp@cfpb.gov">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </React.Fragment>
  )
}

export default Footer
