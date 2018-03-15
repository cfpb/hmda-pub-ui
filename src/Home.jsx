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
              type="main"
              headingText="HMDA Data Publication"
              paragraphText="HMDA data provide information regarding home mortgage lending
                activity. The data and reports can be used along with the Census
                demographic information for data analysis purposes."
            >
              <p className="usa-text-small">
                Learn more about a financial institutions obligations for{' '}
                <a href="https://www.consumerfinance.gov/eregulations/1003-5/2017-18284_20180101#1003-5-a">
                  disclosure and reporting
                </a>.
              </p>
            </Header>
          </div>
        </div>

        <div className="card-container">
          <div className="card">
            <Header
              headingLink="/modified-lar"
              headingText="Modified Loan/Application Register (LAR)"
              paragraphText="The modified LAR includes a financial institution's loan-level data, as
              modified by the Bureau to protect applicant and borrower privacy."
              type="sub"
            />
          </div>

          <div className="card">
            <Header
              headingText="Aggregate Reports"
              paragraphText="These reports summarize lending activity by MSA/MD."
              type="sub"
            />
            <span className="usa-label">Coming Soon</span>
          </div>

          <div className="card">
            <Header
              headingText="Disclosure Reports"
              paragraphText="These reports summarize lending activity for individual
              institutions, both nationwide and by MSA/MD."
              type="sub"
            />
            <span className="usa-label">Coming Soon</span>
          </div>

          <div className="card">
            <Header
              headingText="National Aggregates"
              paragraphText="These reports summarize nationwide lending activity. 
                They indicate the number and dollar amounts of loan applications, 
                cross-tabulated by loan, borrower and geographic characteristics."
              type="sub"
            />
            <span className="usa-label">Coming Soon</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
