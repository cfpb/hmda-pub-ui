import React from 'react'
import Header from '../common/Header.jsx'
import SearchList from './SearchList.jsx'
import ProgressCard from './ProgressCard.jsx'
import MsaMds from './MsaMds.jsx'
import Reports from './Reports.jsx'
import Report from './Report.jsx'

const defaultState = {
  institution: null,
  msa: null,
  report: null
}

class Disclosure extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.makeListItem = this.makeListItem.bind(this)
    this.setMsa = this.setMsa.bind(this)
    this.setReport = this.setReport.bind(this)
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
            this.props.history.push({
              pathname: url + institution.respondentId
            })
            this.setInstitution(institution)
          }}
        >
          View MSA/MDs
        </a>
      </li>
    )
  }

  setInstitution(institution) {
    this.setState({ institution: institution })
  }

  setMsa(msa) {
    this.setState({ msa: msa })
  }

  setReport(report) {
    this.setState({ report: report })
  }

  render() {
    console.log(this.props, this.state)
    const { institution, msa, report } = this.state
    const header = (
      <Header
        type={2}
        headingText="Disclosure reports"
        paragraphText="These reports summarize lending activity for individual
              institutions, both nationwide and by MSA/MD."
      />
    )
    return (
      <>
        <div className="usa-grid" id="main-content">
          {header}
          {institution ? (
            <>
              <ProgressCard
                title="institution"
                name={institution.name}
                id={institution.respondentId}
                goBack={() => {
                  this.props.history.push({
                    pathname: '/disclosure-reports'
                  })
                  this.setState(defaultState)
                }}
              />
              {msa ? (
                <>
                  <ProgressCard
                    title="MSA/MD"
                    name={msa.name}
                    id={msa.id}
                    goBack={() => {
                      this.props.history.push({
                        pathname: `/disclosure-reports/${
                          institution.respondentId
                        }`
                      })
                      this.setState({ ...this.state, msa: null, report: null })
                    }}
                  />
                  {report ? (
                    <>
                      <ProgressCard
                        title="report"
                        name={report.name}
                        id={report.id}
                        goBack={() => {
                          this.props.history.push({
                            pathname: `/disclosure-reports/${
                              institution.respondentId
                            }/${msa.id}`
                          })
                          this.setState({ ...this.state, report: null })
                        }}
                      />
                    </>
                  ) : (
                    <Reports
                      {...this.props}
                      selectorCallback={this.setReport}
                    />
                  )}
                </>
              ) : (
                <MsaMds {...this.props} selectorCallback={this.setMsa} />
              )}
            </>
          ) : (
            <SearchList makeListItem={this.makeListItem} />
          )}
        </div>
        {report ? <Report {...this.props} /> : null}
      </>
    )
  }
}

export default Disclosure
