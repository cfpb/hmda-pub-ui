import React from 'react'
import Select from 'react-select'
import Option from '../Option.js'
import Header from '../common/Header.jsx'
import ProgressCard from './ProgressCard.jsx'
import MsaMds from './MsaMds.jsx'
import Reports from './Reports.jsx'
import Report from './Report.jsx'
import STATES from '../constants/states.js'
import stateToMsas from '../constants/stateToMsas.js'
import { AGGREGATE_REPORTS } from '../constants/aggregate-reports.js'

const detailsCache = {
  states: {},
  msaMds: {},
  reports: {}
}

STATES.forEach(v => (detailsCache.states[v.id] = v))
AGGREGATE_REPORTS.forEach(v => (detailsCache.reports[v.id] = v))

class Aggregate extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)

    const { params } = this.props.match
    if (params.stateId && params.msaMdId) {
      stateToMsas[params.stateId].forEach(v => {
        if (v.id === +params.msaMdId) this.setMsaMd(v)
      })
    }
  }

  handleChange(val) {
    this.props.history.push({
      pathname: `${this.props.match.url}/${val}`
    })
  }

  setMsaMd(msaMd) {
    detailsCache.msaMds[msaMd.id] = msaMd
  }

  render() {
    const { params } = this.props.match
    const state = detailsCache.states[params.stateId]
    const msaMd = detailsCache.msaMds[params.msaMdId]
    const report = detailsCache.reports[params.reportId]

    const options = STATES.map(state => {
      return { value: state.id, label: state.name }
    })

    const header = (
      <Header
        type={2}
        headingText="MSA/MD Aggregate Reports"
        paragraphText="These reports summarize lending activity by MSA/MD."
      />
    )

    return (
      <>
        <div className="usa-grid" id="main-content">
          {header}
          {params.stateId ? (
            <>
              <ProgressCard
                title="state"
                name={state.name}
                id={state.id}
                link={`/aggregate-reports/${params.year}`}
              />
              {params.msaMdId ? (
                <>
                  <ProgressCard
                    title="MSA/MD"
                    name={msaMd.name}
                    id={msaMd.id}
                    link={`/aggregate-reports/${params.year}/${state.id}`}
                  />
                  {params.reportId ? (
                    <>
                      <ProgressCard
                        title="report"
                        name={report.name}
                        id={report.id}
                        link={`/aggregate-reports/${params.year}/${state.id}/${
                          msaMd.id
                        }`}
                      />
                    </>
                  ) : (
                    <Reports {...this.props} />
                  )}
                </>
              ) : (
                <MsaMds {...this.props} selectorCallback={this.setMsaMd} />
              )}
            </>
          ) : (
            <Select
              onChange={this.handleChange}
              placeholder="Select a state..."
              searchable={true}
              autoFocus
              openOnFocus
              simpleValue
              options={options}
              optionComponent={Option}
            />
          )}
        </div>
        {params.reportId ? <Report {...this.props} /> : null}
      </>
    )
  }
}

export default Aggregate
