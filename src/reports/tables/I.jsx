import React from 'react'
import PropTypes from 'prop-types'

const renderData = institutions => {
  const sortedInstitutions = institutions.sort()
  return renderRows(sortedInstitutions)
}

const renderRows = institutions => {
  let toRender = []
  let institutionsToRender = []

  // build the list of 3 institutions
  institutions.map((institution, index) => {
    institutionsToRender.push(institution)

    if (
      institutionsToRender.length === 3 ||
      index === institutions.length - 1
    ) {
      toRender.push(
        <tr key={index}>
          {institutionsToRender.map((institutionToRender, index) => {
            return (
              <td
                style={{ borderWidth: 0, textAlign: 'left' }}
                key={institutionToRender + index}
              >
                {institutionToRender}
              </td>
            )
          })}
        </tr>
      )

      institutionsToRender = []
    }
  })

  return toRender
}

const I = props => {
  if (!props.report) return null
  return (
    <table style={{ fontSize: '.75em' }}>
      <thead>
        <tr>
          <th style={{ borderWidth: 0, textAlign: 'left' }} colSpan={3}>
            INSTITUTIONS WHO HAVE A HOME OR BRANCH OFFICE IN THE MSA/MD
          </th>
        </tr>
      </thead>
      <tbody>{renderData(props.report.institutions)}</tbody>
    </table>
  )
}

I.propTypes = {
  report: PropTypes.object
}

export default I
