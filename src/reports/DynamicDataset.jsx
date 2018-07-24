import React from 'react'
import Header from '../common/Header.jsx'

const DynamicDataset = () => {
  return (
    <div className="usa-grid snapshot" id="main-content">
      <div className="usa-width-one-whole">
        <Header
          type={1}
          headingText="Dynamic National Loan-Level Dataset"
          paragraphText="The dynamic LAR and Transmittal Sheet files contain the 
          national HMDA datasets, modified by the Bureau to protect applicant and 
          borrower privacy, updated weekly for all HMDA reporters. The snapshot 
          files are available to download in a pipe delimited text file format. 
          The dynamic datasets are updated on Mondays with HMDA submissions received 
          through the previous Sunday night."
        />
        <div className="usa-grid-full">
          <div className="usa-width-one-half">
            <Header type={4} headingText="2017 Dynamic Datasets" />
            <ul>
              <li>
                <a
                  download={true}
                  href="https://s3.amazonaws.com/cfpb-hmda-public/prod/snapshot-data/2017_public_lar_csv.zip"
                >
                  Loan/Application Records (LAR)
                </a>
              </li>

              <li>
                <a
                  download={true}
                  href="https://s3.amazonaws.com/cfpb-hmda-public/prod/snapshot-data/2017_public_ts_csv.zip"
                >
                  Transmittal Sheet Records (TS)
                </a>
              </li>
            </ul>
          </div>
          <div className="usa-width-one-half">
            <Header type={4} headingText="2017 Dynamic File Specifications" />
            <ul>
              <li>
                <a
                  download={true}
                  href="https://s3.amazonaws.com/cfpb-hmda-public/prod/snapshot-data/2017_publicstatic_dataformat.zip"
                >
                  Loan/Application Records (LAR)
                </a>
              </li>
              <li>
                <a
                  download={true}
                  href="https://s3.amazonaws.com/cfpb-hmda-public/prod/snapshot-data/2017_publicstatic_codesheet.zip"
                >
                  Transmittal Sheet Records (TS)
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DynamicDataset
