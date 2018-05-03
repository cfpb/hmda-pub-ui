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

    this.setTableElement = element => (this.tableElement = element)
  }

  componentDidMount() {
    console.log('componentDidMount', this)
    console.log('componentDidMount', this.tableElement)

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

  saveAsCSV(report) {
    let filename = `report-${report.table}`
    if (report.respondentId) {
      filename = filename + `-${report.respondentId}-${report.institutionName}`
    }
    filename = filename + `-${report.msa.id}-${report.msa.name}`

    fileSaver.saveAs(
      new Blob([csv], { type: 'text/csv;charset=utf-16' }),
      `${filename}.csv`
    )
  }

  createCSV() {}

  selectReport(report, reportType) {
    // reportType only needed for Table.One
    // it renders extra columns for the aggregate version
    const table = report.table
    if (table.match(/^i$/))
      return <Tables.I tableRef={this.setTableElement} report={report} />
    if (table.match(/^1$/))
      return (
        <Tables.One
          tableRef={this.setTableElement}
          reportType={reportType}
          report={report}
        />
      )
    if (table.match(/^2$/))
      return <Tables.Two tableRef={this.setTableElement} report={report} />
    if (table.match(/^3-1$/))
      return <Tables.ThreeOne tableRef={this.setTableElement} report={report} />
    if (table.match(/^3-2$/))
      return <Tables.ThreeTwo tableRef={this.setTableElement} report={report} />
    if (table.match(/^4-/))
      return <Tables.Four tableRef={this.setTableElement} report={report} />
    if (table.match(/^5-/))
      return <Tables.Five tableRef={this.setTableElement} report={report} />
    if (table.match(/^7-/))
      return <Tables.Seven tableRef={this.setTableElement} report={report} />
    if (table.match(/^8-/))
      return <Tables.Eight tableRef={this.setTableElement} report={report} />
    if (table.match(/^9$/))
      return <Tables.Nine tableRef={this.setTableElement} report={report} />
    if (table.match(/^11-/))
      return <Tables.Eleven tableRef={this.setTableElement} report={report} />
    if (table.match(/^12-1$/))
      return (
        <Tables.TwelveOne tableRef={this.setTableElement} report={report} />
      )
    if (table.match(/^12-2$/))
      return (
        <Tables.TwelveTwo tableRef={this.setTableElement} report={report} />
      )
    if (table.match(/^A/))
      return <Tables.A tableRef={this.setTableElement} report={report} />
    if (table.match(/^B/))
      return <Tables.B tableRef={this.setTableElement} report={report} />
    if (table.match(/^IRS/))
      return <Tables.R tableRef={this.setTableElement} report={report} />
  }

  render() {
    console.log('render', this)
    console.log('render', this.tableElement)
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
        <button onClick={this.saveAsCSV}>Save as CSV</button>
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
