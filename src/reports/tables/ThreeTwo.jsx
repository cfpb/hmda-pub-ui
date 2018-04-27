import React from 'react'
import PropTypes from 'prop-types'

const renderPricingInfo = (pricingInfo, countOrValue) => {
  return pricingInfo.map((pricing, index) => {
    return (
      <tr key={index}>
        <th style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
          {pricing.pricing}
        </th>
        {renderPricing(pricing.purchasers, 'pricing' + index, countOrValue)}
      </tr>
    )
  })
}

const renderPricing = (purchasers, key, countOrValue) => {
  return purchasers.map((purchaser, index) => {
    if (countOrValue === 'count') {
      return [
        <td key={'first' + countOrValue + key + index}>
          {purchaser.firstLienCount}
        </td>,
        <td key={'junior' + countOrValue + key + index}>
          {purchaser.juniorLienCount}
        </td>
      ]
    } else if (countOrValue === 'value') {
      return [
        <td key={'first' + countOrValue + key + index}>
          {purchaser.firstLienValue}
        </td>,
        <td key={'junior' + countOrValue + key + index}>
          {purchaser.juniorLienValue}
        </td>
      ]
    }
  })
}

const renderPoints = (points, countOrValue) => {
  return points.map((point, index) => {
    return (
      <tr key={index}>
        <th>{point.pricing}</th>
        {renderPoint(point.purchasers, 'points' + index, countOrValue)}
      </tr>
    )
  })
}

const renderPoint = (purchasers, key, countOrValue) => {
  return purchasers.map((purchaser, index) => {
    if (countOrValue === 'count') {
      return [
        <td key={'first' + countOrValue + key + index}>
          {purchaser.firstLienCount}
        </td>,
        <td key={'junior' + countOrValue + key + index}>
          {purchaser.juniorLienCount}
        </td>
      ]
    } else if (countOrValue === 'value') {
      return [
        <td key={'first' + countOrValue + key + index}>
          {purchaser.firstLienValue}
        </td>,
        <td key={'junior' + countOrValue + key + index}>
          {purchaser.juniorLienValue}
        </td>
      ]
    }
  })
}

const renderHoepa = (hoepa, countOrValue) => {
  return (
    <tr key={'hoepa' + countOrValue}>
      <th
        style={{
          borderTopWidth: '2px',
          fontWeight: 'bold',
          textTransform: 'uppercase'
        }}
      >
        HOEPA LOANS
      </th>
      {renderHoepaData(hoepa.purchasers, 'hoepa', countOrValue)}
    </tr>
  )
}

const renderHoepaData = (purchasers, key, countOrValue) => {
  return purchasers.map((purchaser, index) => {
    if (countOrValue === 'count') {
      return [
        <td
          style={{ borderTopWidth: '2px' }}
          key={'first' + countOrValue + key + index}
        >
          {purchaser.firstLienCount}
        </td>,
        <td
          style={{ borderTopWidth: '2px' }}
          key={'junior' + countOrValue + key + index}
        >
          {purchaser.juniorLienCount}
        </td>
      ]
    } else if (countOrValue === 'value') {
      return [
        <td
          style={{ borderTopWidth: '2px' }}
          key={'first' + countOrValue + key + index}
        >
          {purchaser.firstLienValue}
        </td>,
        <td
          style={{ borderTopWidth: '2px' }}
          key={'junior' + countOrValue + key + index}
        >
          {purchaser.juniorLienValue}
        </td>
      ]
    }
  })
}

const ThreeTwo = props => {
  if (!props.report) return null

  return [
    <table key="count" style={{ fontSize: '.75em' }}>
      <thead>
        <tr>
          <th width="20%" rowSpan={2}>
            PRICING INFORMATION
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
          <th>First Lien #</th>
          <th>Junior Lien #</th>
          <th>First Lien #</th>
          <th>Junior Lien #</th>
          <th>First Lien #</th>
          <th>Junior Lien #</th>
          <th>First Lien #</th>
          <th>Junior Lien #</th>
          <th>First Lien #</th>
          <th>Junior Lien #</th>
          <th>First Lien #</th>
          <th>Junior Lien #</th>
          <th>First Lien #</th>
          <th>Junior Lien #</th>
          <th>First Lien #</th>
          <th>Junior Lien #</th>
          <th>First Lien #</th>
          <th>Junior Lien #</th>
        </tr>
      </thead>
      <tbody>
        {renderPricingInfo(props.report.pricingInformation, 'count')}
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
            PERCENTAGE POINTS ABOVE AVERAGE PRIME OFFER RATE: ONLY INCLUDES
            LOANS WITH APR ABOVE THE THRESHOLD
          </th>
        </tr>
        {renderPoints(props.report.points, 'count')}
        {renderHoepa(props.report.hoepa, 'count')}
      </tbody>
    </table>,
    <table key="value" style={{ fontSize: '.75em' }}>
      <thead>
        <tr>
          <th width="20%" rowSpan={2}>
            PRICING INFORMATION
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
          <th>First Lien $000's</th>
          <th>Junior Lien $000's</th>
          <th>First Lien $000's</th>
          <th>Junior Lien $000's</th>
          <th>First Lien $000's</th>
          <th>Junior Lien $000's</th>
          <th>First Lien $000's</th>
          <th>Junior Lien $000's</th>
          <th>First Lien $000's</th>
          <th>Junior Lien $000's</th>
          <th>First Lien $000's</th>
          <th>Junior Lien $000's</th>
          <th>First Lien $000's</th>
          <th>Junior Lien $000's</th>
          <th>First Lien $000's</th>
          <th>Junior Lien $000's</th>
          <th>First Lien $000's</th>
          <th>Junior Lien $000's</th>
        </tr>
      </thead>
      <tbody>
        {renderPricingInfo(props.report.pricingInformation, 'value')}
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
            PERCENTAGE POINTS ABOVE AVERAGE PRIME OFFER RATE: ONLY INCLUDES
            LOANS WITH APR ABOVE THE THRESHOLD
          </th>
        </tr>
        {renderPoints(props.report.points, 'value')}
        {renderHoepa(props.report.hoepa, 'value')}
      </tbody>
    </table>
  ]
}

ThreeTwo.propTypes = {
  report: PropTypes.object
}

export default ThreeTwo
