import React from 'react'

const defaultState = {
  start: 0,
  end: 6
}

const HEIGHT = 102

class Results extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.inputValue !== this.props.inputValue) return true
    if (nextState.start !== this.state.start) return true
    return false
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.inputValue !== this.props.inputValue) {
      if (this.scrollWrapper) this.scrollWrapper.scrollTo(0, 0)
      this.setState(defaultState)
    }
  }

  render() {
    if (this.props.status.id === -1)
      return (
        <div className="usa-alert usa-alert-error" role="alert">
          <div className="usa-alert-body">
            <h3 className="usa-alert-heading">
              List of institutions unavailable
            </h3>
            <p className="usa-alert-text">
              We're unable to load the institutions. Please try refreshing your
              browser.
            </p>
          </div>
        </div>
      )
    if (this.props.error === 'Not a filer')
      return (
        <div className="usa-alert usa-alert-error" role="alert">
          <div className="usa-alert-body">
            <h3 className="usa-alert-heading">Institution not found</h3>
            <p className="usa-alert-text">
              Sorry, that insitution isn't in our list of filers. If you think
              this is incorrect please contact{' '}
              <a href="mailto:hmdahelp@cfpb.gov">hmdahelp@cfpb.gov</a>.
            </p>
          </div>
        </div>
      )

    if (this.props.institutions.length === 0) return null

    const { start, end } = this.state
    const visibleInstitutions = this.props.institutions.slice(start, end)
    const oddIsGray = start % 2 === 0

    return (
      <React.Fragment>
        <h4>
          {this.props.institutions.length} financial institutions found for "{
            this.props.inputValue
          }"
        </h4>
        <div
          className="results-wrapper"
          ref={div => {
            this.scrollWrapper = div
          }}
          onScroll={e => {
            const start = (e.target.scrollTop / HEIGHT) >> 0
            const end = start + 6
            this.setState({
              start,
              end
            })
          }}
        >
          <div
            className="results-scroll-container"
            style={{ height: this.props.institutions.length * HEIGHT + 'px' }}
          >
            <ul
              className={'results ' + (oddIsGray ? 'odd' : 'even')}
              style={{ top: start * HEIGHT }}
            >
              {visibleInstitutions.map((institution, index) => {
                return (
                  <li key={index}>
                    <div>
                      <h4>{institution.name}</h4>
                      <p>Respondent ID: {institution.respondentId}</p>
                      <a
                        className="usa-font-small"
                        href={`https://s3.amazonaws.com/cfpb-hmda-public/prod/modified-lar/2017/${
                          institution.institutionId
                        }.txt`}
                        download
                      >
                        Download Modified LAR
                      </a>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Results
