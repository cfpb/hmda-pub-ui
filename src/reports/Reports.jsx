import React from 'react'
import Selector from './Selector.jsx'

const getHeader = params => {
  let header = ''

  // aggregate
  if (params.stateId) {
    header = `Choose a generated for state ${params.stateId} and MSA/MD ${
      params.msaMdId
    }`
  }

  // disclosure
  if (params.institutionId) {
    header = `Choose a generated report for institution ${
      params.institutionId
    } and MSA/MD ${params.msaMdId}`
  }

  return header
}

const Reports = props => {
  return (
    <Selector
      target="report"
      placeholder="Select report..."
      paragraphText="Listed below are the available reports"
      getHeader={function() {
        return getHeader(this.props.match.params)
      }}
      {...props}
    />
  )
}

export default Reports
