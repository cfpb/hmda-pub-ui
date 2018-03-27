import React from 'react'
import Header from '../../common/Header.jsx'

class MsaMds extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      isLoaded: false,
      msamds: [],
      radioInputValue: null
    }

    this.handleRadioInputChange = this.handleRadioInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({ msamds: ['1234', '2345', '3456'], isLoaded: true })
    /*fetch(
      `https://ffiec-api.cfpb.gov/public/filers/${this.props.match.params
        .institutionId}/msamds`
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            msamds: result.msamds
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
    console.log(`${this.props.match.url}/msa-md/${this.state.radioInputValue}`)
    this.props.history.push({
      pathname: `${this.props.match.url}/msa-md/${this.state.radioInputValue}`
    })
    event.preventDefault()
  }

  render() {
    const submitButtonDisabled =
      this.state.radioInputValue === null ? true : false

    return (
      <div className="usa-grid msa-mds" id="main-content">
        <Header
          type="main"
          headingText={`Choose an available MSA/MD for institution ${
            this.props.match.params.institutionId
          }`}
          paragraphText="Listed below are all the MSA/MDs for this institution"
        />

        <form onSubmit={this.handleSubmit}>
          <ul className="usa-unstyled-list">
            {this.state.msamds.map((msamd, index) => {
              return (
                <li key={index}>
                  <input
                    id={msamd}
                    name="msamds"
                    type="radio"
                    value={msamd}
                    checked={this.state.radioInputValue === msamd}
                    onChange={this.handleRadioInputChange}
                  />
                  <label htmlFor={msamd}>{msamd}</label>
                </li>
              )
            })}
            <input
              type="submit"
              value="Next - Find an MSA/MD"
              disabled={submitButtonDisabled}
            />
          </ul>
        </form>
      </div>
    )
  }
}

export default MsaMds
