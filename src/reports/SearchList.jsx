import React from 'react'
import Results from './Results.jsx'
import LoadingIcon from '../common/LoadingIcon.jsx'

import './SearchList.css'

let institutions2018 = null
let institutions2017 = null

class SearchList extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.getDefaultState()

    this.handleTextInputChange = this.handleTextInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.searchInstitutions = this.searchInstitutions.bind(this)
  }

  getData() {
    const fetchURL =
      this.props.year === '2017'
        ? 'https://ffiec-api.cfpb.gov/public/filers'
        : `/v2/reporting/filers/${this.props.year}`
    if (this.state.isLoading2017 || this.state.isLoading2018) {
      fetch(fetchURL)
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            return Promise.reject('Failed to fetch')
          }
        })
        .then(result => {
          this.props.year === '2017'
            ? (institutions2017 = result.institutions)
            : (institutions2018 = result.institutions)
          this.props.year === '2017'
            ? this.setState({
                isLoading2017: false,
                institutions2017: result.institutions.map(institution => {
                  return {
                    ...institution,
                    name: institution.name.toUpperCase()
                  }
                })
              })
            : this.setState({
                isLoading2018: false,
                institutions2018: result.institutions.map(institution => {
                  return {
                    ...institution,
                    name: institution.name.toUpperCase()
                  }
                })
              })
        })
        .catch(error => {
          this.setState({
            isLoading: false,
            error
          })
        })
    }
  }

  componentDidMount() {
    this.getData()
  }

  componentDidUpdate(prevProps) {
    if (this.props.year !== prevProps.year) {
      if (
        (this.props.year === '2017' && institutions2017 === null) ||
        (this.props.year === '2018' && institutions2018 === null)
      ) {
        this.getData()
      }
      this.setState({ institutionsFiltered: [], textInputValue: '' })
    }
  }

  getDefaultState() {
    return {
      error: null,
      isLoading2018: true,
      isLoading2017: true,
      institutions2018: institutions2018 || [],
      institutions2017: institutions2017 || [],
      institutionsFiltered: [],
      textInputValue: ''
    }
  }

  searchInstitutions(value) {
    let institutionsFiltered = []

    if (value.length !== 0) {
      const institutions =
        this.props.year === '2017'
          ? this.state['institutions2017']
          : this.state['institutions2018']
      const len = institutions.length
      const val = value.toUpperCase()

      for (let i = 0; i < len; i++) {
        const institution = institutions[i]
        if (
          institution.name.indexOf(val) !== -1 &&
          institution.respondentId !== 'Bank0_RID' &&
          institution.respondentId !== 'Bank1_RID'
        ) {
          institutionsFiltered.push(institution)
        }
      }

      if (institutionsFiltered.length === 0) {
        this.setState({ error: 'Not a filer' })
      }
    }

    this.setState({
      institutionsFiltered
    })
  }

  handleTextInputChange(event) {
    this.setState({
      textInputValue: event.target.value,
      error: null
    })

    this.searchInstitutions(event.target.value)
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    let disabled = false
    let inputClass = ''
    let inputLabelClass = ''
    let errorMessage = null
    let loading = null
    let label = <span>Enter an institution name</span>
    const {
      isLoading,
      error,
      textInputValue,
      institutionsFiltered
    } = this.state

    if (error && error !== 'Not a filer') {
      disabled = true
      inputClass = 'input-error'
      inputLabelClass = 'input-error-label'
      errorMessage = (
        <span
          className="input-error-message"
          id="input-error-message"
          role="alert"
        >
          Sorry, we're unable to load the list of institutions that have filed.
        </span>
      )
    }

    if (
      (this.state.isLoading2018 && this.props.year === '2018') ||
      (this.state.isLoading2017 && this.props.year === '2017')
    ) {
      disabled = true
      loading = <LoadingIcon className="LoadingInline" />
      label = (
        <span style={{ fontWeight: 'bold' }}>Loading Institutions...</span>
      )
    }

    return (
      <div className="SearchList">
        <form onSubmit={this.handleSubmit}>
          <div className={inputClass}>
            <label className={inputLabelClass} htmlFor="institution-name">
              {label}
            </label>
            {errorMessage}
            <input
              id="institution-name"
              name="institution-name"
              type="text"
              value={textInputValue}
              onChange={this.handleTextInputChange}
              placeholder="Institution name"
              disabled={disabled}
              style={{ display: 'inline-block' }}
            />
            {loading}
          </div>
        </form>
        {!isLoading ? (
          <Results
            error={this.state.error}
            institutions={institutionsFiltered}
            inputValue={textInputValue}
            makeListItem={this.props.makeListItem}
            year={this.props.year}
          />
        ) : null}
      </div>
    )
  }
}

export default SearchList
