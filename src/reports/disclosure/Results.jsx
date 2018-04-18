import React from 'react'
import PropTypes from 'prop-types'
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
    if (this.props.status.id === -1)
      return (
        <div className="usa-alert usa-alert-error" role="alert">
          <div className="usa-alert-body">
            <h3 className="usa-alert-heading">
              List of institutions unavailable
            </h3>
            <p className="usa-alert-text">
              We're unable to load the institutions. Please try refreshing your
              browser.
            </p>
          </div>
        </div>
      )
    if (this.props.error === 'Not a filer')
      return (
        <div className="usa-alert usa-alert-error" role="alert">
          <div className="usa-alert-body">
            <h3 className="usa-alert-heading">Institution not found</h3>
            <p className="usa-alert-text">
              Sorry, that insitution isn't in our list of filers. If you think
              this is incorrect please contact{' '}
              <a href="mailto:hmdahelp@cfpb.gov">hmdahelp@cfpb.gov</a>.
            </p>
          </div>
        </div>
      )

    if (this.props.institutions.length === 0) return null

    let visibleInstitutions = this.props.institutions.slice(
      0,
      DEFAULT_NUMBER_OF_INSTITUTIONS
    )
    if (this.state.showAll === true) {
      visibleInstitutions = this.props.institutions
    }

    console.log(this.props.match)
    return (
      <React.Fragment>
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
                  to={`${url}institution/${institution.institutionId}`}
                  className="usa-font-small"
                >
                  View MSA/MDs
                </Link>
              </li>
            )
          })}
        </ul>
        {this.renderViewAllButton(this.props.institutions.length)}
      </React.Fragment>
    )
  }
}

export default Results
