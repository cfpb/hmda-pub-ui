import React from 'react'

class MsaMds extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      isLoaded: false,
      msaMds: [],
      radioInputValue: ''
    }

    this.handleRadioInputChange = this.handleRadioInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    fetch(
      `https://ffiec-api.cfpb.gov/public/filers/${this.props.match.params
        .institutionId}/msaMds`
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
      pathname: `${this.props.match.url}/msa-md/${this.state.radioInputValue}`
    })
    event.preventDefault()
  }

  render() {
    const submitButtonDisabled =
      this.state.radioInputValue === '' ? true : false

    return (
      <React.Fragment>
        <h1>
          Choose an available MSA/MD for institution{' '}
          <code
            style={{ backgroundColor: '#f1f1f1', border: '1px solid #ddd' }}
          >
            {this.props.match.params.institutionId}
          </code>
        </h1>

        <form onSubmit={this.handleSubmit}>
          <label>
            123:
            <input
              type="radio"
              value="123"
              onChange={this.handleRadioInputChange}
            />
          </label>
          <label>
            456:
            <input
              type="radio"
              value="456"
              onChange={this.handleRadioInputChange}
            />
          </label>
          <label>
            789:
            <input
              type="radio"
              value="789"
              onChange={this.handleRadioInputChange}
            />
          </label>
          <input
            type="submit"
            value="Next - Find an MSA/MD"
            disabled={submitButtonDisabled}
          />
        </form>
      </React.Fragment>
    )
  }
}

export default MsaMds
