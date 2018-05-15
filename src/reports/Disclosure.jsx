import React from 'react'
import Header from '../common/Header.jsx'
import LoadingIcon from '../common/LoadingIcon.jsx'
import SearchList from './SearchList.jsx'
import ProgressCard from './ProgressCard.jsx'
import MsaMds from './MsaMds.jsx'
import Reports from './Reports.jsx'
import Report from './Report.jsx'
import fetchMsas from './fetchMsas.js'
import { DISCLOSURE_REPORTS } from '../constants/disclosure-reports.js'

const detailsCache = {
  institutions: {},
  msaMds: {},
  reports: {}
}

let fetchedMsas = null

Object.keys(DISCLOSURE_REPORTS).forEach(key =>
  DISCLOSURE_REPORTS[key].forEach(v => {
    if (v.value) {
      detailsCache.reports[v.value] = v
    }

    if (v.options) {
      v.options.forEach(option => {
        detailsCache.reports[option.value] = option
      })
    }
  })
)

class Disclosure extends React.Component {
  constructor(props) {
    super(props)
    this.state = { fetched: false }
    this.makeListItem = this.makeListItem.bind(this)
  }

  componentDidMount() {
    const { params } = this.props.match
    if (params.institutionId) {
      fetchMsas(params.institutionId).then(result => {
        this.setInstitution(result.institution)
        if (params.msaMdId) {
          if (params.msaMdId === 'nationwide')
            this.setMsaMd({ id: 'nationwide' })
          result.msaMds.forEach(v => {
            if (v.id === params.msaMdId) this.setMsaMd(v)
          })
        }
        const msaMds = [...result.msaMds, { id: 'nationwide' }]
        fetchedMsas = msaMds
        this.setState({ fetched: true })
      })
    } else {
      this.setState({ fetched: true })
    }
  }

  makeListItem(institution, index) {
    let url = this.props.match.url
    if (!url.match(/\/$/)) url += '/'
    return (
      <li key={index}>
        <h4>{institution.name}</h4>
        <p>Respondent ID: {institution.respondentId}</p>
        <a
          href="#"
          className="usa-font-small"
          onClick={e => {
            e.preventDefault()
            this.setInstitution(institution)
            this.props.history.push({
              pathname: url + institution.institutionId
            })
          }}
        >
          View MSA/MDs
        </a>
      </li>
    )
  }

  setInstitution(institution) {
    const institutionId = institution.institutionId || institution.id
    detailsCache.institutions[institutionId] = institution
  }

  setMsaMd(msaMd) {
    detailsCache.msaMds[msaMd.id] = msaMd
  }

  render() {
    const { params } = this.props.match
    const institution = detailsCache.institutions[params.institutionId]
    const msaMd = detailsCache.msaMds[params.msaMdId]
    const report = detailsCache.reports[params.reportId]
    const institutionId =
      institution && (institution.institutionId || institution.id)
    const header = (
      <Header
        type={1}
        headingText="Disclosure reports"
        paragraphText="These reports summarize lending activity for individual
              institutions, both nationwide and by MSA/MD."
      />
    )

    console.log(report)
    console.log(detailsCache.reports)

    return this.state.fetched ? (
      <React.Fragment>
        <div className="usa-grid" id="main-content">
          {header}

          {params.institutionId ? (
            <React.Fragment>
              <ol className="ProgressCards usa-grid-full">
                <li>
                  <ProgressCard
                    title="institution"
                    name={institution.name}
                    id={institution.respondentId}
                    link={`/disclosure-reports/${params.year}`}
                  />
                </li>

                {params.msaMdId ? (
                  <li>
                    <ProgressCard
                      title="MSA/MD"
                      name={msaMd.name}
                      id={msaMd.id}
                      link={`/disclosure-reports/${
                        params.year
                      }/${institutionId}`}
                    />
                  </li>
                ) : null}

                {params.reportId ? (
                  <li>
                    <ProgressCard
                      title="report"
                      name={report.label}
                      id={report.value}
                      link={`/disclosure-reports/${
                        params.year
                      }/${institutionId}/${msaMd.id}`}
                    />
                  </li>
                ) : null}
              </ol>
              <hr />
            </React.Fragment>
          ) : null}

          {params.institutionId ? (
            params.msaMdId ? (
              params.reportId ? null : (
                <Reports {...this.props} />
              )
            ) : (
              <MsaMds
                {...this.props}
                fetchedMsas={fetchedMsas}
                selectorCallback={this.setMsaMd}
              />
            )
          ) : (
            <SearchList makeListItem={this.makeListItem} />
          )}
        </div>

        {params.reportId ? <Report {...this.props} /> : null}
      </React.Fragment>
    ) : (
      <LoadingIcon />
    )
  }
}

export default Disclosure
