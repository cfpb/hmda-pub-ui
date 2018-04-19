import React from 'react'
import Select from 'react-select'
import Header from '../common/Header.jsx'
import LoadingIcon from '../common/LoadingIcon.jsx'
import { DISCLOSURE_REPORTS } from '../constants/disclosure-reports.js'
import { AGGREGATE_REPORTS } from '../constants/aggregate-reports.js'
import stateToMsas from '../constants/stateToMsas.js'
import msaToName from '../constants/msaToName.js'

class Selector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      [props.target]: []
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const { params } = this.props.match
    // reports are always the same
    if (this.props.target === 'report') {
      // aggregate
      if (params.stateId) {
        this.setState({
          isLoaded: true,
          [this.props.target]: AGGREGATE_REPORTS
        })
      }
      // disclosure
      if (params.institutionId) {
        this.setState({
          isLoaded: true,
          [this.props.target]: DISCLOSURE_REPORTS
        })
      }
    } else {
      if (params.stateId) {
        this.setState({
          [this.props.target]: stateToMsas[params.stateId],
          isLoaded: true
        })
      } else {
        fetch(this.getUrl())
          .then(res => res.json())
          .then(
            result => {
              this.setState({
                isLoaded: true,
                [this.props.target]: this.getMsaNames(result)
              })
            },
            error => {
              this.setState({
                isLoaded: true,
                error
              })
            }
          )
      }
    }
  }

  getMsaNames(msas) {
    return msas.map(msa => {
      return { msa, name: msaToName[msa] }
    })
  }

  getUrl() {
    const { params } = this.props.match
    let url = `http://localhost:1337/cfpb-hmda-public/prod/reports/disclosure/2017/${
      params.institutionId
    }`
    if (params.msaMdId) url += `/${params.msaMdId}`
    return url
  }

  handleChange(val) {
    let url = this.props.match.url
    if (!url.match(/\/$/)) url += '/'
    this.props.history.push({
      pathname: `${url}${this.props.target}/${val}`
    })
  }

  render() {
    let options = []
    if (this.props.target === 'report') {
      options = this.state[this.props.target].map(val => {
        return { value: val.id, label: `${val.id} ${val.name}` }
      })
    } else {
      options = this.state[this.props.target].map(val => {
        let label = val.msa
        if (val.name) label += ' - ' + val.name
        else label = val.msa.toUpperCase()
        return { value: val.msa, label }
      })
    }

    return (
      <div className="usa-grid" id="main-content">
        <Header
          type={1}
          headingText={this.props.getHeader.call(this)}
          paragraphText={this.props.paragraphText}
        />
        {this.state.isLoaded ? (
          <Select
            onChange={this.handleChange}
            placeholder={this.props.placeholder}
            searchable={false}
            simpleValue
            options={options}
          />
        ) : (
          <LoadingIcon />
        )}
      </div>
    )
  }
}

export default Selector
