import React from 'react'
import Selector from './Selector.jsx'

const MsaMds = props => {
  return (
    <Selector
      target="msa-md"
      placeholder="Select MSA/MD..."
      paragraphText="Listed below are all the MSA/MDs for this institution"
      getHeader={function() {
        return `Choose an available MSA/MD for institution ${
          this.props.match.params.institutionId
        }`
      }}
      {...props}
    />
  )
}

export default MsaMds
