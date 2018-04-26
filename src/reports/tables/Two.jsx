import React from 'react'
import PropTypes from 'prop-types'

const renderData = tracts => {
  return tracts.map((tract, index) => {
    return (
      <tr key={index}>
        <th
          style={{
            fontWeight: 'bold',
            textTransform: 'uppercase',
            backgroundColor: '#f1f1f1'
          }}
        >
          {tract.tract}
        </th>
        {renderValues(tract.values, index)}
      </tr>
    )
  })
}

const renderValues = (values, key) => {
  return values.map((value, index) => {
    return [
      <td key={`count-${key}-${index}`}>{value.count}</td>,
      <td key={`value-${key}-${index}`}>{value.value}</td>
    ]
  })
}

const Two = props => {
  if (!props.report) return null

  return (
    <table style={{ fontSize: '.75em' }}>
      <thead>
        <tr>
          <th width="20%" rowSpan={6}>
            CENSUS TRACT OR COUNTY NAME (STATE/COUNTY/TRACT NUMBER)
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
      <tbody>{renderData(props.report.tracts)}</tbody>
    </table>
  )
}

Two.propTypes = {
  report: PropTypes.object
}

export default Two
