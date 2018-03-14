import React from 'react'
import Header from '../../common/Header.jsx'
import Results from './Results.jsx'
import NotFound from '../../common/NotFound.jsx'

const defaultState = {
  error: null,
  institutions: [],
  institutionsFiltered: [],
  institutionsLoaded: false,
  institutionsSearching: false,
  textInputValue: ''
}

class ModifiedLar extends React.Component {
  constructor(props) {
    super(props)

    this.state = defaultState

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
    /*fetch('https://ffiec-api.cfpb.gov/public/filers')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            loaded: true,
            institutions: result.institutions
          })
        },
        error => {
          this.setState({
            loaded: true,
            error
          })
        }
      )*/

    this.setState({
      institutions: [
        { name: 'Bank 0', id: '012345' },
        { name: 'Bank 1', id: '23423768' },
        { name: 'Bank of Someone', id: '9345482' },
        { name: 'Manning of Omaha', id: '09433' },
        { name: 'Fells Wargo', id: '342735' },
        { name: 'Key Largo Federal', id: '49834' },
        { name: 'Small Town Small Bank', id: '32453483634' }
      ],
      institutionsLoaded: true
    })
  }

  handleTextInputChange(event) {
    this.setState({
      textInputValue: event.target.value,
      error: null,
      institutionsSearching: true
    })
    let institutionsFiltered = []

    if (event.target.value.length !== 0) {
      this.state.institutions.forEach(institution => {
        if (
          institution.name
            .toLowerCase()
            .includes(event.target.value.toLowerCase())
        ) {
          institutionsFiltered.push(institution)
        }
      })

      if (institutionsFiltered.length === 0) {
        this.setState({ error: 404 })
      }
    }

    this.setState({
      institutionsFiltered: institutionsFiltered,
      institutionsSearching: false
    })
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    const disabled = !this.state.institutionsLoaded

    return (
      <div className="usa-grid modified-lar" id="main-content">
        <div className="usa-width-one-whole">
          <Header
            type="main"
            headingText="Modified LAR"
            paragraphText="A downloadable modified LAR file is available for every financial 
            institution that has filed a 2017 HMDA LAR. Using this form, you can 
            search for a financial institution by name and download their modified LAR."
          />
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="institution-name">Enter an institution name</label>
            <input
              id="institution-name"
              name="institution-name"
              type="text"
              value={this.state.textInputValue}
              onChange={this.handleTextInputChange}
              placeholder="Institution name"
              disabled={disabled}
            />
          </form>

          <Results
            error={this.state.error}
            institutions={this.state.institutionsFiltered}
            institutionsLoaded={this.state.institutionsLoaded}
          />
        </div>
      </div>
    )
  }
}

export default ModifiedLar
