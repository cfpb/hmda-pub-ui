import React from 'react'
import Header from '../../common/Header.jsx'

class Reports extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      isLoaded: false,
      reports: [],
      radioInputValue: null
    }

    this.handleRadioInputChange = this.handleRadioInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({ reports: ['5-1'], isLoaded: true })
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

  handleRadioInputChange(event) {
    this.setState({ radioInputValue: event.target.value })
  }

  handleSubmit(event) {
    this.props.history.push({
      pathname: `${this.props.match.url}/report/${this.state.radioInputValue}`
    })
    event.preventDefault()
  }

  render() {
    const submitButtonDisabled =
      this.state.radioInputValue === null ? true : false

    return (
      <div className="usa-grid reports" id="main-content">
        <Header
          type={1}
          headingText={`Choose a generated report for institution ${
            this.props.match.params.institutionId
          } and MSA/MD ${this.props.match.params.msaMdId}`}
          paragraphText="Listed below are all the reports available"
        />
        <form onSubmit={this.handleSubmit}>
          <ul className="usa-unstyled-list">
            {this.state.reports.map((report, index) => {
              return (
                <li key={index}>
                  <input
                    id={report}
                    name="reports"
                    type="radio"
                    value={report}
                    checked={this.state.radioInputValue === report}
                    onChange={this.handleRadioInputChange}
                  />
                  <label htmlFor={report}>{report}</label>
                </li>
              )
            })}
            <input
              type="submit"
              value="View the report"
              disabled={submitButtonDisabled}
            />
          </ul>
        </form>
      </div>
    )
  }
}

export default Reports
