import React from 'react'
import Header from '../common/Header.jsx'
import YearSelector from '../common/YearSelector.jsx'
import { DYNAMIC_DATASET } from '../constants/dynamic-dataset.js'

import './DynamicDataset.css'

function makeListLink(href, val) {
  return (
    <li>
      <a download={true} href={href}>{val}</a>
    </li>
  )
}

const DynamicDataset = props => {
  const { params } = props.match
  const years = DYNAMIC_DATASET.displayedYears
  const dataForYear = DYNAMIC_DATASET[params.year]

  return (
    <div className="DynamicDataset" id="main-content">
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

      <YearSelector years={years} />

      {params.year ?
        <div className="grid">
          <div className="item">
            <Header type={4} headingText={params.year + ' Dynamic Datasets'} />
            <ul>
              {makeListLink(dataForYear.lar, 'Loan/Application Records (LAR)')}
              {makeListLink(dataForYear.ts, 'Transmittal Sheet Records (TS)')}
            </ul>
          </div>
          <div className="item">
            <Header type={4} headingText={params.year + ' Dynamic File Specifications'} />
            <ul>
              {makeListLink(dataForYear.lar_spec, 'Loan/Application Records (LAR)')}
              {makeListLink(dataForYear.ts_spec, 'Transmittal Sheet Records (TS)')}
            </ul>
          </div>
        </div>
        : null }
      </div>
  )
}

export default DynamicDataset
