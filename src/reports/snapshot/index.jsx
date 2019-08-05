import React from 'react'
import Header from '../../common/Header.jsx'
import YearSelector from '../../common/YearSelector.jsx'
import { SNAPSHOT_DATASET } from '../../constants/snapshot-dataset.js'
import './Snapshot.css'

class Snapshot extends React.Component {
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
    const years = Object.keys(SNAPSHOT_DATASET).map( v => parseInt(v))

    // if no year selected or a year that dosen't exist in constants, default to most recent
    if(typeof params.year === 'undefined' || !SNAPSHOT_DATASET.hasOwnProperty(params.year))
      params.year = Math.max.apply(Math, years)

    // load links
    let dynamicLinks = SNAPSHOT_DATASET[params.year]

    return (
      <div className="Snapshot" id="main-content">
        <Header
          type={1}
          headingText="Snapshot National Loan Level Dataset"
          paragraphText="The snapshot files contain the national HMDA datasets as of
            {dynamicLinks.snapshot_date} for all HMDA reporters, as modified by the Bureau to
            protect applicant and borrower privacy. The snapshot files are available
            to download in both .csv and pipe delimited text file formats, and the
            file specification files are available to download in PDF format.">
          <p className="text-small">
            Snapshot data has preserved some elements of historic LAR data files
            that are not present in the Dynamic Data. These columns are "As of
            Date", "Edit Status", "Sequence Number", and "Application Date
            Indicator". Be aware that data load procedures that handle both files
            will need to recognize this difference.
          </p>
          <p className="text-small">
            Use caution when analyzing loan amount and income, which do not have
            an upper limit and may contain outliers.
          </p>
        </Header>

        {years.length > 1 ? <YearSelector years={years} /> : null }

        <div className="grid">
          <div className="item">
            <Header type={4} headingText={params.year + " Datasets"} />
            <ul>
              <li>
                Loan/Application Records (LAR)
                <ul style={{ marginTop: '.5em' }}>
                  <li>
                    <a
                      download={true}
                      href={dynamicLinks.public_lar_csv}
                    >
                      CSV
                    </a>
                  </li>
                  <li>
                    <a
                      download={true}
                      href={dynamicLinks.public_lar_txt}
                    >
                      Pipe Delimited
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                Transmittal Sheet Records (TS)
                <ul style={{ marginTop: '.5em' }}>
                  <li>
                    <a
                      download={true}
                      href={dynamicLinks.public_ts_csv}
                    >
                      CSV
                    </a>
                  </li>
                  <li>
                    <a
                      download={true}
                      href={dynamicLinks.public_ts_txt}
                    >
                      Pipe Delimited
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                Reporter Panel
                <ul style={{ marginTop: '.5em' }}>
                  <li>
                    <a
                      download={true}
                      href={dynamicLinks.public_panel_csv}
                    >
                      CSV
                    </a>
                  </li>
                  <li>
                    <a
                      download={true}
                      href={dynamicLinks.public_panel_txt}
                    >
                      Pipe Delimited
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                MSA/MD Description
                <ul style={{ marginTop: '.5em' }}>
                  <li>
                    <a
                      download={true}
                      href={dynamicLinks.public_msamd_csv}
                    >
                      CSV
                    </a>
                  </li>
                  <li>
                    <a
                      download={true}
                      href={dynamicLinks.public_panel_txt}
                    >
                      Pipe Delimited
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="item">
            <Header type={4} headingText={params.years + " File Specifications"} />
            <ul>
              <li>
                <a
                  download={true}
                  href={dynamicLinks.publicstatic_dataformat}
                >
                  LAR, TS and Reporter Panel
                </a>
              </li>
              <li>
                <a
                  download={true}
                  href={dynamicLinks.publicstatic_codesheet}
                >
                  LAR Code Sheet
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Snapshot
