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

  getMsaUrl(params) {
    return `https://ffiec-api.cfpb.gov/public/filers/2017/${
      params.institutionId
    }/msaMds`
  }

  render() {
    if (!this.state.isLoaded) return <LoadingIcon />
    if (this.state.error) return <p>{this.state.error}</p>

    const options = this.state.msaMds.map(val => {
      let label = val.id
      if (val.name) label += ' - ' + val.name
      else label = val.id.toUpperCase()
      return { value: val.id, label }
    })

    return (
      <Selector
        options={options}
        placeholder="Select MSA/MD..."
        header="Choose an available MSA/MD"
        {...this.props}
      />
    )
  }
}

export default MsaMds
