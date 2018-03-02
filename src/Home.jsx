import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from './common/Header.jsx'

class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="usa-grid">
          <div className="usa-width-one-whole">
            <Header
              heading="HMDA reporting"
              lead="HMDA data provide information regarding home mortgage lending
                activity. The data and reports can be used along with the Census
                demographic information for data analysis purposes."
            />
          </div>
        </div>

        <div className="card-container">
          <div className="card">
            <h4>
              <Link to="/modified-lar">Modified LAR</Link>
            </h4>
            <p>
              Loan-level data are also available as zipped raw flat files, which
              can be imported into statistical software packages or Microsoft
              Excel for analysis.
            </p>
            <Link to="/modified-lar">Search Modified LAR</Link>
          </div>

          <div className="card">
            <h4>Aggregate Reports</h4>
            <p>Summary of lending activity by MSA/MD.</p>
            <span className="usa-label">Coming Soon</span>
          </div>

          <div className="card">
            <h4>Disclosure Reports</h4>
            <p>
              These reports summarize lending activity for individual
              institutions, both nationwide and by MSA/MD.
            </p>
            <span className="usa-label">Coming Soon</span>
          </div>

          <div className="card">
            <h4>National Aggregates</h4>
            <p>
              These reports are a nationwide summation of the HMDA data. They
              indicate the number and dollar amounts of lending, cross-tabulated
              by loan applicant, and geographic characteristics.
            </p>
            <span className="usa-label">Coming Soon</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
