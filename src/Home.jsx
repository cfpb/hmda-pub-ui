import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from './common/Header.jsx'

class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="usa-grid">
          <div className="usa-width-one-whole">
            <Header type="main" headingText="HMDA Data Publication">
              <p className="usa-font-lead">
                The HMDA data and reports are the most comprehensive publicly
                available information on mortgage market activity. The data and
                reports can be used along with the{' '}
                <a href="https://www.ffiec.gov/censusproducts.htm">Census</a>{' '}
                demographic information for data analysis purposes. Available
                below are the data and reports for HMDA data collected in or
                after 2017. For HMDA data and reports for prior years, visit{' '}
                <a href="https://www.ffiec.gov/hmda/hmdaproducts.htm">
                  https://www.ffiec.gov/hmda/hmdaproducts.htm
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
              paragraphText="The modified LAR provides loan-level data for an individual
              financial institution, as modified by the Bureau to protect applicant and
              borrower privacy."
              type="sub"
            />
          </div>

          <div className="card">
            <Header
              headingLink="/disclosure-reports"
              headingText="Disclosure Reports"
              paragraphText="These reports summarize lending activity for individual
              institutions, both nationwide and by MSA/MD."
              type="sub"
            />
            <span className="usa-label">Coming Soon</span>
          </div>

          <div className="card">
            <Header
              headingText="MSA/MD Aggregate Reports"
              paragraphText="These reports summarize lending activity by MSA/MD."
              type="sub"
            />
            <span className="usa-label">Coming Soon</span>
          </div>

          <div className="card">
            <Header
              headingText="National Aggregate Reports"
              paragraphText="These reports summarize nationwide lending activity. 
                They indicate the number and dollar amounts of loan applications, 
                cross-tabulated by loan, borrower and geographic characteristics."
              type="sub"
            />
            <span className="usa-label">Coming Soon</span>
          </div>
        </div>

        <div className="card-container">
          <div className="card quarter">
            <Header
              headingText="Snapshot National Loan-Level Dataset"
              paragraphText="The snapshot file contains the national loan-level 
              dataset as of a specific point in time for all HMDA reporters, as 
              modified by the Bureau to protect applicant and borrower privacy."
              type="sub"
            />
            <span className="usa-label">Expected May 2018</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
