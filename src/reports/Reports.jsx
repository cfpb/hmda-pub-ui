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

  data.forEach(option => {
    if (option.value) {
      option.label = `${option.value} - ${option.label}`
    }

    if (option.options) {
      option.options.forEach(subOption => {
        subOption.label = `${subOption.value} - ${subOption.label}`
      })
    }
  })

  console.log(data)

  /*const options = data.map(option => {
    if (option.value) {
      return { value: option.value, label: `${option.value} - ${option.label}` }
    } else {
      return option.options.map(subOption => {
        return {
          lable: option.label
          options: {

          }

        }
      })
    }
  })*/

  //console.log(options)

  return (
    <Selector
      options={data}
      placeholder="Select report..."
      paragraphText="Listed below are the available reports"
      header={getHeader(params)}
      {...props}
    />
  )
}

export default Reports
