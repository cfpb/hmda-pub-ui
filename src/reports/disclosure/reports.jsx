import React from 'react'

class Reports extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      isLoaded: false,
      reports: [],
      radioInputValue: ''
    }

    this.handleRadioInputChange = this.handleRadioInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    fetch(
      `https://ffiec-api.cfpb.gov/public/filers/${this.props.match.params
        .institutionId}/msaMds/${this.props.match.params.msaMdId}`
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
      )
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
      this.state.radioInputValue === '' ? true : false

    return (
      <React.Fragment>
        <h1>
          Choose a generated report for institution{' '}
          <code
            style={{ backgroundColor: '#f1f1f1', border: '1px solid #ddd' }}
          >
            {this.props.match.params.institutionId}
          </code>{' '}
          and msa{' '}
          <code
            style={{ backgroundColor: '#f1f1f1', border: '1px solid #ddd' }}
          >
            {this.props.match.params.msaMdId}
          </code>
        </h1>

        <form onSubmit={this.handleSubmit}>
          <label>
            1:
            <input
              type="radio"
              value="1"
              onChange={this.handleRadioInputChange}
            />
          </label>
          <label>
            2:
            <input
              type="radio"
              value="2"
              onChange={this.handleRadioInputChange}
            />
          </label>
          <label>
            3:
            <input
              type="radio"
              value="3"
              onChange={this.handleRadioInputChange}
            />
          </label>
          <input
            type="submit"
            value="View the report"
            disabled={submitButtonDisabled}
          />
        </form>
      </React.Fragment>
    )
  }
}

export default Reports
