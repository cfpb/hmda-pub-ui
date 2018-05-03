import React from 'react'
import Selector from './Selector.jsx'
import { DISCLOSURE_REPORTS } from '../constants/disclosure-reports.js'
import { AGGREGATE_REPORTS } from '../constants/aggregate-reports.js'

const getHeader = params => {
  let header = ''

  if (params.stateId) {
    header = `Choose a generated report for state ${
      params.stateId
    } and MSA/MD ${params.msaMdId}`
  } else {
    header = `Choose a generated report for institution ${
      params.institutionId
    } and MSA/MD ${params.msaMdId}`
  }

  return header
}

const Reports = props => {
  const { params } = props.match
  let data
  if (params.stateId) {
    data = AGGREGATE_REPORTS
  } else {
    data =
      params.msaMdId === 'nationwide'
        ? DISCLOSURE_REPORTS.nationwide
        : DISCLOSURE_REPORTS.msa
  }

  const options = data.map(val => {
    return { value: val.id, label: `${val.id} ${val.name}` }
  })

  return (
    <Selector
      options={options}
      placeholder="Select report..."
      paragraphText="Listed below are the available reports"
      header={getHeader(params)}
      {...props}
    />
  )
}

export default Reports
