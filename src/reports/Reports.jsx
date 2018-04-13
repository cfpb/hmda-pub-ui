import React from 'react'
import Header from '../common/Header.jsx'

const REPORTS = ['5-1', '5-2', '5-3']

class Reports extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      isLoaded: false,
      reports: [],
      selectValue: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({ reports: REPORTS, isLoaded: true, selectValue: REPORTS[0] })
    /*fetch(
      `https://ffiec-api.cfpb.gov/public/filers/${
        this.props.match.params.institutionId
      }/msaMds/${this.props.match.params.msaMdId}`
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            msaMds: result.msaMds
          })
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )*/
  }

  handleChange(event) {
    this.setState({ selectValue: event.target.value })
  }

  handleSubmit(event) {
    this.props.history.push({
      pathname: `${this.props.match.url}/report/${this.state.selectValue}`
    })
    event.preventDefault()
  }

  render() {
    let reportsFor = ''
    if (this.props.match.params.institutionId)
      reportsFor = this.props.match.params.institutionId
    if (this.props.match.params.stateId)
      reportsFor = this.props.match.params.stateId

    return (
      <div className="usa-grid reports" id="main-content">
        <Header
          type={1}
          headingText={`Choose a generated report for ${reportsFor} and MSA/MD ${
            this.props.match.params.msaMdId
          }`}
          paragraphText="Listed below are all the reports available"
        />

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="reports">Select a Report</label>

          <select
            name="reports"
            id="reports"
            value={this.state.selectValue}
            onChange={this.handleChange}
          >
            {this.state.reports.map((report, index) => {
              return (
                <option key={index} value={report}>
                  {report}
                </option>
              )
            })}
          </select>

          <input type="submit" value="View the report" />
        </form>
      </div>
    )
  }
}

export default Reports
