import React from 'react'
import PropTypes from 'prop-types'

const renderData = report => {
  return (
    <React.Fragment>
      {renderCharacteristicTitle('Borrower Characteristics')}
      {mapCharacteristic(report.borrowerCharacteristics)}
      {renderCharacteristicTitle('Census Tract Characteristics')}
      {mapCharacteristic(report.censusTractCharacteristics)}
    </React.Fragment>
  )
}

const mapCharacteristic = (arr, label) => {
  return arr.map(characteristic => {
    return renderCharacteristic(characteristic, label)
  })
}

const renderCharacteristicTitle = key => {
  return (
    <tr className="characteristic-grey-title" key={key}>
      <th
        colSpan={13}
        style={{
          borderTopWidth: '2px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          backgroundColor: '#f1f1f1'
        }}
      >
        {key}
      </th>
    </tr>
  )
}

const renderCharacteristic = (characteristic, label) => {
  let name, currChar
  Object.keys(characteristic).forEach(key => {
    if (key === 'characteristic') name = characteristic[key]
    else currChar = characteristic[key]
  })

  return [
    <tr className="characteristic-title" key={name}>
      <th
        colSpan={15}
        style={{
          borderTopWidth: '2px',
          textTransform: 'uppercase',
          fontWeight: 'bold'
        }}
      >
        {name}
      </th>
    </tr>,
    currChar.map((detailObj, index) => {
      let detail, pricing
      Object.keys(detailObj).forEach(key => {
        if (key === 'pricingInformation') pricing = detailObj[key]
        else detail = detailObj[key]
      })

      return (
        <tr key={name + index}>
          <th>{detail}</th>
          {pricing.map((priceObj, index) => {
            return [<td>{disposition.count}</td>, <td>{disposition.value}</td>]
          })}
        </tr>
      )
    })
  ]
}

const Twelve = props => {
  if (!props.report) return null

  return (
    <table style={{ fontSize: '.75em' }}>
      <thead>
        <tr>
          <th width="20%" rowSpan={2}>
            BORROWER OR CENSUS TRACT CHARACTERISTICS
          </th>
          <th colSpan={2} width="13.333%">
            Applications Received
          </th>
          <th colSpan={2} width="13.333%">
            Loans Originated
          </th>
          <th colSpan={2} width="13.333%">
            Apps. Approved But Not Accepted
          </th>
          <th colSpan={2} width="13.333%">
            Applications Denied
          </th>
          <th colSpan={2} width="13.333%">
            Applications Withdrawn
          </th>
          <th colSpan={2} width="13.333%">
            Files Closed for Incompleteness
          </th>
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
        </tr>
      </thead>
      <tbody>{renderData(props.report)}</tbody>
    </table>
  )
}

Twelve.propTypes = {
  report: PropTypes.object
}

export default Twelve
