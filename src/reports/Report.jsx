import React from 'react'
import Header from '../common/Header.jsx'
import LoadingIcon from '../common/LoadingIcon.jsx'
import Tables from './tables/index.jsx'
import fileSaver from 'file-saver'

class Report extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      isLoaded: false,
      report: null
    }

    this.selectReport = this.selectReport.bind(this)
    this.generateCSV = this.generateCSV.bind(this)
    this.tableRef = React.createRef()
  }

  generateCSV() {
    const report = this.state.report
    // TODO: create a function for this, it's also used in render as the "headingText"
    let theCSV =
      `"Table ${report.table}: ${report.description}${
        report.table === 'R1' ? '"' : `, ${report.year}"`
      }` + '\n'
    const msa = report.msa
      ? `"MSA/MD: ${report.msa.id} - ${report.msa.name}"` + '\n'
      : '"Nationwide"' + '\n'
    theCSV = theCSV + msa
    const institution = report.respondentId
      ? `"Institution: ${report.respondentId} - ${report.institutionName}"` +
        '\n'
      : ''
    theCSV = theCSV + institution

    // loop through each header row
    const tHeadRows = this.tableRef.current.tHead.rows
    Array.from(tHeadRows).forEach((row, rowIndex) => {
      // account for the rowSpan by adding an empty cell
      if (rowIndex !== 0) theCSV = theCSV + ','
      // loop through the cells
      Array.from(row.cells).forEach((cell, cellIndex) => {
        // add the content
        theCSV = theCSV + '"' + cell.innerHTML + '"'
        if (cell.hasAttribute('colspan')) {
          const spanCount = parseInt(cell.getAttribute('colspan'))
          let i = 0
          for (i; i < spanCount - 1; i++) {
            theCSV = theCSV + ','
          }
        }
        // last child
        if (row.cells.length - 1 === cellIndex) {
          theCSV = theCSV + '\n'
        } else {
          theCSV = theCSV + ','
        }
      })
    })

    // loop of tbody
    const tBodyRows = this.tableRef.current.tBodies[0].rows
    Array.from(tBodyRows).forEach((row, rowIndex) => {
      // loop through the cells
      Array.from(row.cells).forEach((cell, cellIndex) => {
        // add the content
        theCSV = theCSV + '"' + cell.innerHTML + '"'

        if (cell.hasAttribute('colspan')) {
          const spanCount = parseInt(cell.getAttribute('colspan'))
          let i = 0
          for (i; i < spanCount - 1; i++) {
            theCSV = theCSV + ','
          }
        }
        // last child
        if (row.cells.length - 1 === cellIndex) {
          theCSV = theCSV + '\n'
        } else {
          theCSV = theCSV + ','
        }
      })
    })

    let filename = `report-${report.table}`
    if (report.respondentId) {
      filename =
        filename +
        `-${report.respondentId}-${report.institutionName
          .replace(',', '')
          .replace(' ', '')}`
    }
    if (report.msa) {
      filename =
        filename +
        `-${report.msa.id}-${report.msa.name.replace(',', '').replace(' ', '')}`
    }

    fileSaver.saveAs(
      new Blob([theCSV], { type: 'text/csv;charset=utf-16' }),
      `${filename}.csv`
    )
  }

  componentDidMount() {
    const { params } = this.props.match

    let msaMdId = params.msaMdId
    let reportId = params.reportId
    let url = 'https://s3.amazonaws.com/cfpb-hmda-public/prod/reports/'
    if (params.stateId) {
      url += `aggregate/2017/${msaMdId}/${reportId}.txt`
    } else {
      if (reportId === 'R1') {
        msaMdId = 'nationwide'
        reportId = 'IRS'
      }
      url += `disclosure/2017/${
        params.institutionId
      }/${msaMdId}/${reportId}.txt`
    }
    fetch(url)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            report: result
          })
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  }

  selectReport(report, reportType) {
    // reportType only needed for Table.One
    // it renders extra columns for the aggregate version
    const table = report.table
    if (table.match(/^i$/))
      return <Tables.I ref={this.tableRef} report={report} />
    if (table.match(/^1$/))
      return (
        <Tables.One
          ref={this.tableRef}
          reportType={reportType}
          report={report}
        />
      )
    if (table.match(/^2$/))
      return <Tables.Two ref={this.tableRef} report={report} />
    if (table.match(/^3-1$/))
      return <Tables.ThreeOne ref={this.tableRef} report={report} />
    if (table.match(/^3-2$/))
      return <Tables.ThreeTwo ref={this.tableRef} report={report} />
    if (table.match(/^4-/))
      return <Tables.Four ref={this.tableRef} report={report} />
    if (table.match(/^5-/))
      return <Tables.Five ref={this.tableRef} report={report} />
    if (table.match(/^7-/))
      return <Tables.Seven ref={this.tableRef} report={report} />
    if (table.match(/^8-/))
      return <Tables.Eight ref={this.tableRef} report={report} />
    if (table.match(/^9$/))
      return <Tables.Nine ref={this.tableRef} report={report} />
    if (table.match(/^11-/))
      return <Tables.Eleven ref={this.tableRef} report={report} />
    if (table.match(/^12-1$/))
      return <Tables.TwelveOne ref={this.tableRef} report={report} />
    if (table.match(/^12-2$/))
      return <Tables.TwelveTwo ref={this.tableRef} report={report} />
    if (table.match(/^A/))
      return <Tables.A ref={this.tableRef} report={report} />
    if (table.match(/^B/))
      return <Tables.B ref={this.tableRef} report={report} />
    if (table.match(/^IRS/))
      return <Tables.R ref={this.tableRef} report={report} />
  }

  render() {
    if (!this.state.isLoaded) return <LoadingIcon />
    if (this.state.report === null) return null

    let reportType = 'disclosure'
    if (this.props.match.params.stateId) reportType = 'aggregate'

    const report = this.state.report
    let table = report.table
    if (table === 'IRS') table = 'R1'
    const headingText = report
      ? `Table ${table}: ${report.description}${
          table === 'R1' ? '' : `, ${report.year}`
        }`
      : null
    return (
      <div className="report" id="main-content">
        <button onClick={this.generateCSV}>Save as CSV</button>
        <Header type={4} headingText={headingText}>
          {report ? (
            <>
              <p style={{ width: '50%', display: 'inline-block' }}>
                {report.respondentId ? (
                  <span>
                    Institution: {report.respondentId} -{' '}
                    {report.institutionName}
                  </span>
                ) : null}
              </p>

              <p
                style={{
                  width: '50%',
                  display: 'inline-block',
                  textAlign: 'right'
                }}
              >
                {report.msa
                  ? `MSA/MD: ${report.msa.id} - ${report.msa.name}`
                  : 'Nationwide'}
              </p>
            </>
          ) : null}
        </Header>
        {this.selectReport(report, reportType)}
        <p className="usa-text-small report-date">
          Report date: {report.reportDate}
        </p>
      </div>
    )
  }
}

export default Report
