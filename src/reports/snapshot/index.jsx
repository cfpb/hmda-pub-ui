import React from 'react'
import Header from '../../common/Header.jsx'

const Snapshot = () => {
  return (
    <div className="usa-grid snapshot" id="main-content">
      <div className="usa-width-one-whole">
        <Header
          type="main"
          headingText="Snapshot National Loan Level Dataset"
          paragraphText="The snapshot files contain the national HMDA datasets as of 
          April 18th, 2018 for all HMDA reporters, as modified by the Bureau to 
          protect applicant and borrower privacy. The snapshot files are available 
          to download in both .csv and pipe delimited text file formats, and the 
          file specification files are available to download in PDF format."
        >
          <p className="usa-text-small">
            Use caution when analyzing continuous variables, such as loan amount
            and income, which may contain outliers.
          </p>
        </Header>
        <div className="usa-grid-full">
          <div className="usa-width-one-half">
            <Header type="sub" headingText="2017 Datasets">
              <ul>
                <li>
                  Loan/Application Records (LAR)
                  <ul style={{ marginTop: '.5em' }}>
                    <li>
                      <a href="">CSV</a>
                    </li>
                    <li>
                      <a href="">Pipe Delimited</a>
                    </li>
                  </ul>
                </li>
                <li>
                  Transmittal Sheet Records (TS)
                  <ul style={{ marginTop: '.5em' }}>
                    <li>
                      <a href="">CSV</a>
                    </li>
                    <li>
                      <a href="">Pipe Delimited</a>
                    </li>
                  </ul>
                </li>
                <li>
                  Reporter Panel
                  <ul style={{ marginTop: '.5em' }}>
                    <li>
                      <a href="">CSV</a>
                    </li>
                    <li>
                      <a href="">Pipe Delimited</a>
                    </li>
                  </ul>
                </li>
                <li>
                  MSA/MD Description
                  <ul style={{ marginTop: '.5em' }}>
                    <li>
                      <a href="">CSV</a>
                    </li>
                    <li>
                      <a href="">Pipe Delimited</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </Header>
          </div>
          <div className="usa-width-one-half">
            <Header type="sub" headingText="2017 File Specifications">
              <ul>
                <li>
                  <a href="">LAR, TS and Reporter Panel</a>
                </li>
                <li>
                  <a href="">LAR Code Sheet</a>
                </li>
              </ul>
            </Header>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Snapshot
