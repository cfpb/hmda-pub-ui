import React from 'react'
import Header from '../common/Header.jsx'
import ProgressCard from './ProgressCard.jsx'
import Reports from './Reports.jsx'
import Report from './Report.jsx'
import { NATIONAL_AGGREGATE_REPORTS } from '../constants/national-aggregate-reports.js'

import './NationalAggregate.css'

const detailsCache = {
  reports: {}
}

NATIONAL_AGGREGATE_REPORTS.forEach(v => {
  if (v.value) {
    detailsCache.reports[v.value] = v
  }

  if (v.options) {
    v.options.forEach(option => {
      detailsCache.reports[option.value] = option
    })
  }
})

class NationalAggregate extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(val) {
    this.props.history.push({
      pathname: `${this.props.match.url}/${val}`
    })
  }

  render() {
    const { params } = this.props.match
    const report = detailsCache.reports[params.reportId]

    const header = (
      <Header
        type={1}
        headingText="National Aggregate Reports"
        paragraphText="These reports summarize nationwide lending activity. 
          They indicate the number and dollar amounts of loan applications, 
          cross-tabulated by loan, borrower and geographic characteristics."
      />
    )

    return (
      <React.Fragment>
        <div className="NationalAggregate" id="main-content">
          {header}
          <ol className="ProgressCards">
            <li>
              <ProgressCard
                title="report"
                name={params.reportId ? report.label : 'Select a report'}
                id={params.reportId ? report.value : ''}
                link={
                  params.reportId
                    ? `/national-aggregate-reports/${params.year}`
                    : null
                }
              />
            </li>
          </ol>
          <hr />
          {params.reportId ? null : <Reports {...this.props} />}
        </div>

        {params.reportId ? <Report {...this.props} /> : null}
      </React.Fragment>
    )
  }
}

export default NationalAggregate
