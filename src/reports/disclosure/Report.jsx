import React from 'react'
import Header from '../../common/Header.jsx'
import FiveDashOne from './tables/FiveDashOne.jsx'

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

  render() {
    if (this.state.report === null) return null

    const report = this.state.report
    const headingText = report
      ? `Table ${this.props.match.params.reportId}: ${report.description}`
      : null
    return (
      <div class="report" id="main-content">
        <div className="usa-grid">
          <Header type="main" headingText={headingText}>
            {report ? (
              <React.Fragment>
                <p>
                  Institution: {report.respondentId} - {report.institutionName}
                </p>
                <p>
                  MSA/MD: {report.msa.id} - {report.msa.name}
                </p>
              </React.Fragment>
            ) : null}
          </Header>
        </div>
        <FiveDashOne report={report} />
      </div>
    )
  }
}

export default Report
