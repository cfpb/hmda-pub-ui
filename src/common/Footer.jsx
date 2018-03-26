import React from 'react'

const Footer = () => {
  return (
    <footer className="usa-footer usa-footer-slim" role="contentinfo">
      <div className="usa-grid usa-footer-return-to-top">
        <a href="#">Return to top</a>
      </div>
      <div className="usa-footer-primary-section">
        <div className="usa-grid-full">
          <nav className="usa-footer-nav usa-width-one-half">
            <ul className="usa-unstyled-list">
              <li className="usa-footer-primary-content">
                <a
                  className="usa-footer-primary-link"
                  href="https://www.ffiec.gov/"
                >
                  FFIEC
                </a>
              </li>
            </ul>
          </nav>
          <div className="usa-width-one-half">
            <div className="usa-footer-primary-content usa-footer-contact_info">
              <h4>Questions?</h4>
              <a href="mailto:hmdahelp@cfpb.gov">hmdahelp@cfpb.gov</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
