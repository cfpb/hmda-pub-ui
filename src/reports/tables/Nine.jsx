import React from 'react'
import PropTypes from 'prop-types'

const renderData = medianAges => {
  return medianAges.map((medianAge, index) => {
    return [
      <tr key={index}>
        <th
          style={{
            borderTopWidth: '2px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            backgroundColor: '#f1f1f1'
          }}
          colSpan={21}
        >
          {medianAge.medianAge}
        </th>
      </tr>,
      renderOriginated(medianAge.loanCategories, index),
      renderNotAccepted(medianAge.loanCategories, index),
      renderDenied(medianAge.loanCategories, index),
      renderWithdrawn(medianAge.loanCategories, index),
      renderIncomplete(medianAge.loanCategories, index)
    ]
  })
}

const renderOriginated = (loanCategories, key) => {
  return (
    <tr key={loanCategories[0].dispositions[0].disposition + key}>
      <th>{loanCategories[0].dispositions[0].disposition}</th>
      {loanCategories.map((loanCategory, index) => {
        return [
          <td
            key={`count-${
              loanCategories[0].dispositions[0].disposition
            }-${key}`}
          >
            {loanCategory.dispositions[0].count}
          </td>,
          <td
            key={`value-${
              loanCategories[0].dispositions[0].disposition
            }-${key}`}
          >
            {loanCategory.dispositions[0].value}
          </td>
        ]
      })}
    </tr>
  )
}

const renderNotAccepted = (loanCategories, key) => {
  return (
    <tr key={loanCategories[0].dispositions[1].disposition + key}>
      <th>{loanCategories[0].dispositions[1].disposition}</th>
      {loanCategories.map((loanCategory, index) => {
        return [
          <td
            key={`count-${
              loanCategories[0].dispositions[1].disposition
            }-${key}`}
          >
            {loanCategory.dispositions[1].count}
          </td>,
          <td
            key={`value-${
              loanCategories[0].dispositions[1].disposition
            }-${key}`}
          >
            {loanCategory.dispositions[1].value}
          </td>
        ]
      })}
    </tr>
  )
}

const renderDenied = (loanCategories, key) => {
  return (
    <tr key={loanCategories[0].dispositions[2].disposition + key}>
      <th>{loanCategories[0].dispositions[2].disposition}</th>
      {loanCategories.map((loanCategory, index) => {
        return [
          <td
            key={`count-${
              loanCategories[0].dispositions[2].disposition
            }-${key}`}
          >
            {loanCategory.dispositions[2].count}
          </td>,
          <td
            key={`value-${
              loanCategories[0].dispositions[2].disposition
            }-${key}`}
          >
            {loanCategory.dispositions[2].value}
          </td>
        ]
      })}
    </tr>
  )
}

const renderWithdrawn = (loanCategories, key) => {
  return (
    <tr key={loanCategories[0].dispositions[3].disposition + key}>
      <th>{loanCategories[0].dispositions[3].disposition}</th>
      {loanCategories.map((loanCategory, index) => {
        return [
          <td
            key={`count-${
              loanCategories[0].dispositions[3].disposition
            }-${key}`}
          >
            {loanCategory.dispositions[3].count}
          </td>,
          <td
            key={`value-${
              loanCategories[0].dispositions[3].disposition
            }-${key}`}
          >
            {loanCategory.dispositions[3].value}
          </td>
        ]
      })}
    </tr>
  )
}

const renderIncomplete = (loanCategories, key) => {
  return (
    <tr key={loanCategories[0].dispositions[4].disposition + key}>
      <th>{loanCategories[0].dispositions[4].disposition}</th>
      {loanCategories.map((loanCategory, index) => {
        return [
          <td
            key={`count-${
              loanCategories[0].dispositions[4].disposition
            }-${key}`}
          >
            {loanCategory.dispositions[4].count}
          </td>,
          <td
            key={`value-${
              loanCategories[0].dispositions[4].disposition
            }-${key}`}
          >
            {loanCategory.dispositions[4].value}
          </td>
        ]
      })}
    </tr>
  )
}
const Nine = props => {
  if (!props.report) return null

  return (
    <table style={{ fontSize: '.75em' }}>
      <thead>
        <tr>
          <th width="20%" rowSpan={6}>
            CENSUS TRACTS BY MEDIAN AGE OF HOMES
          </th>
        </tr>
        <tr>
          <th colSpan={8}>
            Loans on 1- to 4-Family Manufactured Home Dwellings
          </th>
          <th colSpan={6} />
        </tr>
        <tr>
          <th colSpan={4}>Home Purchase Loans</th>
          <th colSpan={10} />
        </tr>
        <tr>
          <th width="5%" colSpan={2}>
            FHA, FSA/RHS & VA
          </th>
          <th width="5%" colSpan={2}>
            Conventional
          </th>
          <th width="5%" colSpan={2}>
            Refinancings
          </th>
          <th width="5%" colSpan={2}>
            Home Improvement Loans
          </th>
          <th width="5%" colSpan={2}>
            Loans on Dwellings For 5 or More Families
          </th>
          <th width="5%" colSpan={2}>
            Nonoccupant Loans From Columns A, B, C, and D
          </th>
          <th width="5%" colSpan={2}>
            Loans On Manufactured Home Dwellings From Columns A, B, C, & D
          </th>
        </tr>
        <tr>
          <th colSpan={2}>A</th>
          <th colSpan={2}>B</th>
          <th colSpan={2}>C</th>
          <th colSpan={2}>D</th>
          <th colSpan={2}>E</th>
          <th colSpan={2}>F</th>
          <th colSpan={2}>G</th>
        </tr>
        <tr>
          <th>Number</th>
          <th>$000's</th>
          <th>Number</th>
          <th>$000's</th>
          <th>Number</th>
          <th>$000's</th>
          <th>Number</th>
          <th>$000's</th>
          <th>Number</th>
          <th>$000's</th>
          <th>Number</th>
          <th>$000's</th>
          <th>Number</th>
          <th>$000's</th>
        </tr>
      </thead>
      <tbody>{renderData(props.report.medianAges)}</tbody>
    </table>
  )
}

Nine.propTypes = {
  report: PropTypes.object
}

export default Nine
