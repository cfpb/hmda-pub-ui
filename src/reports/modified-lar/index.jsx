import React from 'react'
import Header from '../../common/Header.jsx'
import Results from './Results.jsx'
import NotFound from '../../common/NotFound.jsx'
import isomorphicFetch from 'isomorphic-fetch'

const defaultState = {
  error: null,
  status: { id: 1, message: 'loading' }, // 1:loading, 2:ready, 3:searching, -1:error
  institutions: [],
  institutionsFiltered: [],
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
    // TODO: use prod URL
    isomorphicFetch('https://192.168.99.100:4443/public/filers')
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject('Failed to fetch')
        }
      })
      .then(result => {
        this.setState({
          status: { id: 2, message: 'ready' },
          institutions: result.institutions
        })
      })
      .catch(error => {
        this.setState({
          status: { id: -1, message: 'error' },
          error
        })
      })
  }

  handleTextInputChange(event) {
    this.setState({
      textInputValue: event.target.value,
      error: null,
      status: { id: 3, message: 'searching' }
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
        this.setState({ error: 'Not a filer' })
      }
    }

    this.setState({
      institutionsFiltered: institutionsFiltered,
      status: { id: 2, message: 'ready' }
    })
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    let disabled = true
    let placeholder = 'Sorry'
    if (this.state.status.id >= 2) {
      disabled = false
      placeholder = 'Institution name'
    }
    return (
      <div className="usa-grid modified-lar" id="main-content">
        <div className="usa-width-one-whole">
          <Header
            type="main"
            headingText="Modified Loan/Application Register (LAR)"
            paragraphText="A downloadable modified LAR file is available for every 
              financial institution that has completed a 2017 HMDA data submission. 
              Using this form, you can search for a financial institution by name and 
              download its modified LAR file."
          />
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="institution-name">Enter an institution name</label>
            <input
              id="institution-name"
              name="institution-name"
              type="text"
              value={this.state.textInputValue}
              onChange={this.handleTextInputChange}
              placeholder={placeholder}
              disabled={disabled}
            />
          </form>

          <Results
            error={this.state.error}
            institutions={this.state.institutionsFiltered}
            status={this.state.status}
          />
        </div>
      </div>
    )
  }
}

export default ModifiedLar
