import React from 'react'
import Header from '../../common/Header.jsx'
import Results from './Results.jsx'
import NotFound from '../../common/NotFound.jsx'
import LoadingIcon from '../../common/LoadingIcon.jsx'
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
    this.makeDebouncer = this.makeDebouncer.bind(this)
    this.searchInstitutions = this.searchInstitutions.bind(this)
  }

  componentDidMount() {
    // TODO: use prod URL
    isomorphicFetch('https://ffiec-api.cfpb.gov/public/filers')
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

  searchInstitutions(value) {
    let institutionsFiltered = []

    if (value.length !== 0) {
      this.state.institutions.forEach(institution => {
        if (institution.name.toLowerCase().includes(value.toLowerCase())) {
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

  makeDebouncer(delay) {
    let timeout
    let _this = this
    return function(value) {
      clearTimeout(timeout)
      timeout = setTimeout(function() {
        _this.searchInstitutions(value)
      }, delay)
    }
  }

  handleTextInputChange(event) {
    this.setState({
      textInputValue: event.target.value,
      error: null,
      status: { id: 3, message: 'searching' }
    })

    const debounceSearch = this.makeDebouncer(500)
    debounceSearch(event.target.value)
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    let disabled = false
    let inputClass = ''
    let inputLabelClass = ''
    let errorMessage = null
    if (this.state.status.id === -1) {
      disabled = true
      inputClass = 'usa-input-error'
      inputLabelClass = 'usa-input-error-label'
      errorMessage = (
        <span
          className="usa-input-error-message"
          id="input-error-message"
          role="alert"
        >
          Sorry, we're unable to load the list of institutions that have filed.
        </span>
      )
    }

    let loading = null
    if (this.state.status.id === 1 || this.state.status.id === 3) {
      loading = <LoadingIcon />
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
            <div className={inputClass}>
              <label className={inputLabelClass} htmlFor="institution-name">
                Enter an institution name
              </label>
              {errorMessage}
              <input
                id="institution-name"
                name="institution-name"
                type="text"
                value={this.state.textInputValue}
                onChange={this.handleTextInputChange}
                placeholder="Institution name"
                disabled={disabled}
                style={{ display: 'inline-block' }}
              />
              {loading}
            </div>
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
