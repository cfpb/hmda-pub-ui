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

  renderChoices(params) {}

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
        type={1}
        headingText="MSA/MD Aggregate Reports"
        paragraphText="These reports summarize lending activity by MSA/MD."
      />
    )

    return (
      <React.Fragment>
        <div className="usa-grid" id="main-content">
          {header}

          <ol className="ProgressCards usa-grid-full">
            <li>
              <ProgressCard
                title="state"
                name={params.stateId ? state.name : 'Select a state'}
                id={params.stateId ? state.id : ''}
                link={`/aggregate-reports/${params.year}`}
              />
            </li>

            <li>
              <ProgressCard
                title="MSA/MD"
                name={
                  params.msaMdId
                    ? msaMd.name
                    : params.stateId
                      ? 'Select a MSA/MD'
                      : ''
                }
                id={params.msaMdId ? msaMd.id : ''}
                link={
                  params.stateId
                    ? `/aggregate-reports/${params.year}/${state.id}`
                    : null
                }
              />
            </li>

            <li>
              <ProgressCard
                title="report"
                name={
                  params.reportId
                    ? report.name
                    : params.msaMdId
                      ? 'Select a report'
                      : params.stateId
                        ? ''
                        : ''
                }
                id={params.reportId ? report.id : ''}
                link={
                  params.msaMdId
                    ? `/aggregate-reports/${params.year}/${state.id}/${
                        msaMd.id
                      }`
                    : null
                }
              />
            </li>
          </ol>
          <hr />

          {params.stateId ? (
            params.msaMdId ? (
              params.reportId ? null : (
                <Reports {...this.props} />
              )
            ) : (
              <MsaMds {...this.props} selectorCallback={this.setMsaMd} />
            )
          ) : (
            <React.Fragment>
              <Header type={4} headingText="Select a state" />
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
            </React.Fragment>
          )}
        </div>

        {params.reportId ? <Report {...this.props} /> : null}
      </React.Fragment>
    )
  }
}

export default Aggregate
