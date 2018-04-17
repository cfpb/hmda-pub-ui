import React from 'react'
import Selector from './Selector.jsx'

const Reports = props => {
  return (
    <Selector
      target="report"
      placeholder="Select report..."
      paragraphText="Listed below are the available reports"
      getHeader={function() {
        return `Choose a generated report for institution ${
          this.props.match.params.institutionId
        } and MSA/MD ${this.props.match.params.msaMdId}`
      }}
      {...props}
    />
  )
}

export default Reports
