import React from 'react'
import Header from '../common/Header.jsx'
import LoadingIcon from '../common/LoadingIcon.jsx'
import Tables from './tables/index.jsx'

class Report extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      isLoaded: false,
      report: null
    }
  }

  componentDidMount() {
    fetch(
      `https://s3.amazonaws.com/cfpb-hmda-public/prod/reports/disclosure/2017/${
        this.props.match.params.institutionId
      }/${this.props.match.params.msaMdId}/${
        this.props.match.params.reportId
      }.txt`
    )
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

  selectReport(report) {
    if (report.table.match(/^4/)) return <Tables.Four report={report} />
    if (report.table.match(/^5/)) return <Tables.Five report={report} />
  }

  render() {
    if (!this.state.isLoaded) return <LoadingIcon />
    if (this.state.report === null) return null

    const report = this.state.report
    const headingText = report
      ? `Table ${report.table}: ${report.description}, ${report.year}`
      : null
    return (
      <div className="report" id="main-content">
        <Header type={4} headingText={headingText}>
          {report ? (
            <React.Fragment>
              <p style={{ width: '50%', display: 'inline-block' }}>
                Institution: {report.respondentId} - {report.institutionName}
              </p>
              <p
                style={{
                  width: '50%',
                  display: 'inline-block',
                  textAlign: 'right'
                }}
              >
                MSA/MD: {report.msa.id} - {report.msa.name}
              </p>
            </React.Fragment>
          ) : null}
        </Header>
        {this.selectReport(report)}
        <p className="usa-text-small report-date">
          Report date: {report.reportDate}
        </p>
      </div>
    )
  }
}

export default Report
