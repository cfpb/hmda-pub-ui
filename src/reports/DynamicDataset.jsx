import React from 'react'
import Header from '../common/Header.jsx'
import YearSelector from '../common/YearSelector.jsx'
import { DYNAMIC_DATASET } from '../constants/dynamic-dataset.js'

import './DynamicDataset.css'

class DynamicDataset extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(val) {
    this.props.history.push({
      pathname: `${this.props.match.url}/${val.value}`
    })
  }

  render() {
    const { params } = this.props.match
    const years = Object.keys(DYNAMIC_DATASET).map( v => parseInt(v))

    // if no year selected or a year that dosen't exist in constants, default to most recent
    if(typeof params.year === 'undefined' || !DYNAMIC_DATASET.hasOwnProperty(params.year))
      params.year = Math.max.apply(Math, years)

    // load links
    let dynamicLinks = DYNAMIC_DATASET[params.year]

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
        {years.length > 1 ? <YearSelector years={years} /> : null }

        <div className="grid">
          <div className="item">
            <Header type={4} headingText={params.year + " Dynamic Datasets"} />
            <ul>
              <li>
                <a
                  download={true}
                  href={dynamicLinks.lar}
                >
                  Loan/Application Records (LAR)
                </a>
              </li>

              <li>
                <a
                  download={true}
                  href={dynamicLinks.ts}
                >
                  Transmittal Sheet Records (TS)
                </a>
              </li>
            </ul>
          </div>
          <div className="item">
            <Header type={4} headingText={params.year + " Dynamic File Specifications"} />
            <ul>
              <li>
                <a
                  download={true}
                  href={dynamicLinks.lar_spec}
                >
                  Loan/Application Records (LAR)
                </a>
              </li>
              <li>
                <a
                  download={true}
                  href={dynamicLinks.ts_spec}
                >
                  Transmittal Sheet Records (TS)
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default DynamicDataset
