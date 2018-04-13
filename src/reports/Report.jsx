import React from 'react'
import Header from '../common/Header.jsx'
import FiveDashOne from './disclosure/tables/FiveDashOne.jsx'

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
    let fetchURL = 'https://s3.amazonaws.com/cfpb-hmda-public/prod/reports'
    if (this.props.match.params.institutionId)
      fetchURL = `${fetchURL}/disclosure`
    if (this.props.match.params.stateId) fetchURL = `${fetchURL}/aggregate`

    fetchURL = `${fetchURL}/2017/${this.props.match.params.msaMdId}/${
      this.props.match.params.reportId
    }.txt`

    fetch(fetchURL)
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

  render() {
    if (this.state.error) {
      const { params } = this.props.match

      let alertHeading = 'Report not found'
      if (params.stateId)
        alertHeading = `Report ${params.reportId} for 2017 -> ${
          params.stateId
        } -> ${params.msaMdId} not found`
      if (params.institutionId)
        alertHeading = `Report ${params.reportId} for 2017 -> ${
          params.institutionId
        } -> ${params.msaMdId} not found`

      return (
        <div
          className="usa-grid"
          id="main-content"
          style={{ marginTop: '3em' }}
        >
          <div className="usa-alert usa-alert-error" role="alert">
            <div className="usa-alert-body">
              <h3 className="usa-alert-heading">{alertHeading}</h3>
              <p className="usa-alert-text">
                Sorry, we couldn't find that report. Try to refresh the page. If
                the problem persists please contact HMDA Help.
              </p>
            </div>
          </div>
        </div>
      )
    }

    if (this.state.report === null) return null

    const report = this.state.report
    const headingText = report
      ? `Table ${report.table}: ${report.description}, ${report.year}`
      : null
    return (
      <div className="report" id="main-content">
        <Header type={4} headingText={headingText}>
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
        </Header>

        <FiveDashOne report={report} />

        <p className="usa-text-small report-date">
          Report date: {report.reportDate}
        </p>
      </div>
    )
  }
}

export default Report
