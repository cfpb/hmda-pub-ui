import React from 'react'
import PropTypes from 'prop-types'

const renderData = characteristics => {
  return characteristics.map((characteristic, index) => {
    return [
      renderCharacteristicTitle(characteristic.characteristic, index),
      renderCharacteristicDetails(characteristic)
    ]
  })
}

const renderCharacteristicTitle = (characteristic, key) => {
  return (
    <tr key={key}>
      <th
        colSpan={19}
        style={{
          borderTopWidth: '2px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          backgroundColor: '#f1f1f1'
        }}
      >
        {characteristic}
      </th>
    </tr>
  )
}

const renderCharacteristicDetails = characteristic => {
  if (characteristic.characteristic === 'Race')
    return characteristic.races.map((race, index) => {
      return (
        <tr key={index}>
          <th>{race.race}</th>
          {race.purchasers.map((purchaser, index) => {
            return [
              <td key="count">{purchaser.count}</td>,
              <td key="value">{purchaser.value}</td>
            ]
          })}
        </tr>
      )
    })

  if (characteristic.characteristic === 'Ethnicity')
    return characteristic.ethnicities.map((ethnicity, index) => {
      return (
        <tr key={index}>
          <th>{ethnicity.ethnicity}</th>
          {ethnicity.purchasers.map((purchaser, index) => {
            return [
              <td key="count">{purchaser.count}</td>,
              <td key="value">{purchaser.value}</td>
            ]
          })}
        </tr>
      )
    })

  if (characteristic.characteristic === 'Minority Status')
    return characteristic.minorityStatuses.map((minorityStatus, index) => {
      return (
        <tr key={index}>
          <th>{minorityStatus.minorityStatus}</th>
          {minorityStatus.purchasers.map((purchaser, index) => {
            return [
              <td key="count">{purchaser.count}</td>,
              <td key="value">{purchaser.value}</td>
            ]
          })}
        </tr>
      )
    })

  if (characteristic.characteristic === 'Applicant Income')
    return characteristic.applicantIncomes.map((applicantIncome, index) => {
      return (
        <tr key={index}>
          <th>{applicantIncome.applicantIncome}</th>
          {applicantIncome.purchasers.map((purchaser, index) => {
            return [
              <td key="count">{purchaser.count}</td>,
              <td key="value">{purchaser.value}</td>
            ]
          })}
        </tr>
      )
    })

  if (characteristic.characteristic === 'Racial/Ethnic Composition')
    return characteristic.tractPctMinorities.map((tractPctMinority, index) => {
      return (
        <tr key={index}>
          <th>{tractPctMinority.tractPctMinority}</th>
          {tractPctMinority.purchasers.map((purchaser, index) => {
            return [
              <td key="count">{purchaser.count}</td>,
              <td key="value">{purchaser.value}</td>
            ]
          })}
        </tr>
      )
    })

  if (characteristic.characteristic === 'Income')
    return characteristic.incomeLevels.map((incomeLevel, index) => {
      return (
        <tr key={index}>
          <th>{incomeLevel.incomeLevel}</th>
          {incomeLevel.purchasers.map((purchaser, index) => {
            return [
              <td key="count">{purchaser.count}</td>,
              <td key="value">{purchaser.value}</td>
            ]
          })}
        </tr>
      )
    })
}

const ThreeOne = props => {
  if (!props.report) return null

  return (
    <table style={{ fontSize: '.75em' }}>
      <thead>
        <tr>
          <th width="20%" rowSpan={2}>
            BORROWER OR CENSUS TRACT CHARACTERISTICS
          </th>
          <th colSpan={2} width="13.333%">
            Fannie Mae
          </th>
          <th colSpan={2} width="13.333%">
            Ginnie Mae
          </th>
          <th colSpan={2} width="13.333%">
            Freddie Mac
          </th>
          <th colSpan={2} width="13.333%">
            Farmer Mac
          </th>
          <th colSpan={2} width="13.333%">
            Private Securitization
          </th>
          <th colSpan={2} width="13.333%">
            Commercial Bank, Savings Bank, or Saving Assoc
          </th>
          <th colSpan={2} width="13.333%">
            Insurance Co, Credit Union, Mortgage Bk, or Finance Co
          </th>
          <th colSpan={2} width="13.333%">
            Affiliate Institution
          </th>
          <th colSpan={2} width="13.333%">
            Other Purchaser
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
          <th>Number</th>
          <th>$000's</th>
          <th>Number</th>
          <th>$000's</th>
          <th>Number</th>
          <th>$000's</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th
            colSpan={19}
            style={{
              borderTopWidth: '2px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              backgroundColor: '#f1f1f1'
            }}
          >
            BORROWER CHARACTERISTICS
          </th>
        </tr>
        {renderData(props.report.borrowerCharacteristics)}
        <tr>
          <th
            colSpan={19}
            style={{
              borderTopWidth: '2px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              backgroundColor: '#f1f1f1'
            }}
          >
            CENSUS TRACT CHARACTERISTICS
          </th>
        </tr>
        {renderData(props.report.censusCharacteristics)}
      </tbody>
      <tfoot>
        <tr>
          <th>Total</th>
          {props.report.total.purchasers.map((total, index) => {
            return [
              <td key="count">{total.count}</td>,
              <td key="value">{total.value}</td>
            ]
          })}
        </tr>
      </tfoot>
    </table>
  )
}

ThreeOne.propTypes = {
  report: PropTypes.object
}

export default ThreeOne
