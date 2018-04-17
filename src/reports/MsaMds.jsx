import React from 'react'
import Selector from './Selector.jsx'

const getHeader = params => {
  let header = ''

  // aggregate
  if (params.stateId) {
    header = `Choose an MSA/MD for state ${params.stateId}`
  }

  // disclosure
  if (params.institutionId) {
    header = `Choose an available MSA/MD for institution ${
      params.institutionId
    }`
  }

  return header
}

const MsaMds = props => {
  return (
    <Selector
      target="msa-md"
      placeholder="Select MSA/MD..."
      paragraphText="Listed below are all the MSA/MDs for this institution"
      getHeader={function() {
        return getHeader(this.props.match.params)
      }}
      {...props}
    />
  )
}

export default MsaMds
