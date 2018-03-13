import React from 'react'

class DisclosureReports extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      isLoaded: false,
      institutions: [],
      textInputValue: ''
    }

    this.handleTextInputChange = this.handleTextInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    // TODO
    // maybe this endpoint could use a query string
    // eg ...?string=abc
    // this would let us do a type-ahead search
    // or, this is fine and we load them all (~7000)
    // and do a type-ahead search on those
    fetch('https://ffiec-api.cfpb.gov/public/filers')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            institutions: result.institutions
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

  handleTextInputChange(event) {
    this.setState({ textInputValue: event.target.value })
  }

  handleSubmit(event) {
    this.props.history.push({
      pathname: `${this.props.match.url}/institution/${this.state
        .textInputValue}`
    })
    event.preventDefault()
  }

  render() {
    const submitButtonDisabled = this.state.textInputValue === '' ? true : false

    return (
      <React.Fragment>
        <h1>Find an institution.</h1>

        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <span>Institution required</span>
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleTextInputChange}
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

export default DisclosureReports
