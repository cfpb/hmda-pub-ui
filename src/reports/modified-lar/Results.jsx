import React from 'react'
import PropTypes from 'prop-types'

const Results = props => {
  if (props.status.id === -1)
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
  if (props.error === 'Not a filer')
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

  if (props.institutions.length === 0) return null

  return (
    <ul className="results">
      {props.institutions.map((institution, index) => {
        return (
          <li key={index}>
            <h4>{institution.name}</h4>
            <p>Respondent ID: {institution.respondentId}</p>
            <a
              className="usa-font-small"
              href={`https://s3.amazonaws.com/cfpb-hmda-public/prod/modified-lar/2017/${
                institution.institutionId
              }.txt`}
              download
            >
              Download Modified LAR
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export default Results
