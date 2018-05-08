import React from 'react'
import { Link } from 'react-router-dom'

const defaultState = {
  showAll: false
}

const DEFAULT_NUMBER_OF_INSTITUTIONS = 10

class Results extends React.Component {
  constructor(props) {
    super(props)

    this.state = defaultState

    this.handleShowAllClick = this.handleShowAllClick.bind(this)
    this.renderViewAllButton = this.renderViewAllButton.bind(this)
    this.renderHeading = this.renderHeading.bind(this)
  }

  handleShowAllClick() {
    this.setState({ showAll: true })
  }

  renderViewAllButton(length) {
    if (
      this.state.showAll === false &&
      length > DEFAULT_NUMBER_OF_INSTITUTIONS
    ) {
      return (
        <button onClick={this.handleShowAllClick} className="usa-button">
          View all {length} results
        </button>
      )
    }

    return null
  }

  renderHeading(length, inputValue) {
    if (
      this.state.showAll === false &&
      length > DEFAULT_NUMBER_OF_INSTITUTIONS
    ) {
      return (
        <h4>
          Viewing {DEFAULT_NUMBER_OF_INSTITUTIONS} results of {length} found for
          "{inputValue}"
        </h4>
      )
    }

    return (
      <h4>
        Viewing all {length} results found for "{inputValue}"
      </h4>
    )
  }

  renderError(error) {
    let headerText = 'List of institutions unavailable'
    let body = (
      <p className="usa-alert-text">
        We're unable to load the institutions. Please try refreshing your
        browser.
      </p>
    )
    if (error === 'Not a filer') {
      headerText = 'Institution not found'
      body = (
        <p className="usa-alert-text">
          Sorry, that insitution isn't in our list of filers. If you think this
          is incorrect please contact{' '}
          <a href="mailto:hmdahelp@cfpb.gov">hmdahelp@cfpb.gov</a>.
        </p>
      )
    }
    return (
      <div className="usa-alert usa-alert-error" role="alert">
        <div className="usa-alert-body">
          <h3 className="usa-alert-heading">{headerText}</h3>
          {body}
        </div>
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.inputValue !== this.props.inputValue) {
      this.setState(defaultState)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.inputValue !== this.props.inputValue) return true
    if (nextState.showAll !== this.state.showAll) return true
    return false
  }

  render() {
    if (this.props.error) return this.renderError(this.props.error)
    if (this.props.institutions.length === 0) return null

    let visibleInstitutions = this.props.institutions.slice(
      0,
      DEFAULT_NUMBER_OF_INSTITUTIONS
    )
    if (this.state.showAll === true) {
      visibleInstitutions = this.props.institutions
    }

    return (
      <>
        {this.renderHeading(
          this.props.institutions.length,
          this.props.inputValue
        )}
        <ul className="results">
          {visibleInstitutions.map((institution, index) => {
            let url = this.props.match.url
            if (!url.match(/\/$/)) url += '/'
            return (
              <li key={index}>
                <h4>{institution.name}</h4>
                <p>Respondent ID: {institution.respondentId}</p>
                <Link
                  to={`${url}2017/institution/${institution.institutionId}`}
                  className="usa-font-small"
                >
                  View MSA/MDs
                </Link>
              </li>
            )
          })}
        </ul>
        {this.renderViewAllButton(this.props.institutions.length)}
      </>
    )
  }
}

export default Results
