import React from 'react'
import Selector from './Selector.jsx'
import LoadingIcon from '../common/LoadingIcon.jsx'
import stateToMsas from '../constants/stateToMsas.js'

const MSA_MDS = {}

class MsaMds extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      msaMds: []
    }
  }

  componentDidMount() {
    const { params } = this.props.match
    if (params.stateId) {
      this.setState({
        msaMds: stateToMsas[params.stateId],
        isLoaded: true
      })
    } else {
      if (MSA_MDS[params.institutionId]) {
        return this.setState({
          isLoaded: true,
          msaMds: MSA_MDS[params.institutionId]
        })
      }
      fetch(this.getMsaUrl(params))
        .then(res => res.json())
        .then(
          result => {
            const msaMds = [...result.msaMds, { id: 'nationwide' }]
            MSA_MDS[params.institutionId] = msaMds
            this.setState({
              isLoaded: true,
              msaMds: msaMds
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

  getHeader() {
    const { params } = this.props.match
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

  getMsaUrl(params) {
    return `https://ffiec-api.cfpb.gov/public/filers/2017/${
      params.institutionId
    }/msaMds`
  }

  render() {
    if (!this.state.isLoaded) return <LoadingIcon />
    if (this.state.error) return <p>{this.props.error}</p>

    const options = this.state.msaMds.map(val => {
      let label = val.id
      if (val.name) label += ' - ' + val.name
      else label = val.id.toUpperCase()
      return { value: val.id, label }
    })

    return (
      <Selector
        target="msa-md"
        options={options}
        placeholder="Select MSA/MD..."
        paragraphText="Listed below are all the MSA/MDs for this institution"
        header={this.getHeader()}
        {...this.props}
      />
    )
  }
}

export default MsaMds
