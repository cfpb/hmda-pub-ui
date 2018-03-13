import React from 'react'
import PropTypes from 'prop-types'

const Results = props => {
  if (!props.institutionsLoaded)
    return (
      <ul className="results">
        <li className="error">
          <h4>Please wait, we're still loading the institutions.</h4>
        </li>
      </ul>
    )
  if (props.error === 404)
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
            <p>{institution.id}</p>
            <a
              className="usa-font-small"
              href={`https://s3.amazonaws.com/cfpb-hmda-public/prod/lar/0.txt`}
              download
            >
              Download Modified LAR
            </a>
            {/*<a
              href={`https://s3.amazonaws.com/cfpb-hmda-public/prod/lar/${
                institution.id
              }.txt`}
              download
            >
              Download Modified LAR
            </a>*/}
          </li>
        )
      })}
    </ul>
  )
}

export default Results
