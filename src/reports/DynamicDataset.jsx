import React from 'react'
import Header from '../common/Header.jsx'

const DynamicDataset = () => {
  return (
    <div className="usa-grid snapshot" id="main-content">
      <div className="usa-width-one-whole">
        <Header
          type={1}
          headingText="Dynamic National Loan-Level Dataset"
          paragraphText="The dynamic files contain the national HMDA datasets for 
          all HMDA reporters, modified by the Bureau to protect applicant and 
          borrower privacy, updated to include late submissions and 
          resubmissions. The dynamic files are available to download in a pipe 
          delimited text file format. The dynamic datasets are updated on Mondays 
          with HMDA submissions received through the previous Sunday night."
        />
        <div className="usa-grid-full">
          <div className="usa-width-one-half">
            <Header type={4} headingText="2017 Dynamic Datasets" />
            <ul>
              <li>
                <a
                  download={true}
                  href="https://s3.amazonaws.com/cfpb-hmda-public/prod/dynamic-data/2017_lar.txt"
                >
                  Loan/Application Records (LAR)
                </a>
              </li>

              <li>
                <a
                  download={true}
                  href="https://s3.amazonaws.com/cfpb-hmda-public/prod/dynamic-data/2017_ts.txt"
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
                  href="https://github.com/cfpb/hmda-platform/blob/v1.x/Documents/2017_Dynamic_LAR_Spec.csv"
                >
                  Loan/Application Records (LAR)
                </a>
              </li>
              <li>
                <a
                  download={true}
                  href="https://github.com/cfpb/hmda-platform/blob/v1.x/Documents/2017_Dynamic_TS_Spec.csv"
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
