import React from 'react'
import PropTypes from 'prop-types'

const Results = props => {
  if (props.status.id === -1)
    return (
      <ul className="results">
        <li className="error">
          <h4>We're unable to load the institutions.</h4>
        </li>
      </ul>
    )
  if (props.error === 'Not a filer')
    return (
      <ul className="results">
        <li className="error">
          <h4>Sorry, we couldn't find that institution.</h4>
        </li>
      </ul>
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
