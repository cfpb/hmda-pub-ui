import React from 'react'
import Header from '../common/Header.jsx'

const MSAMDS = [
  { id: '25420', name: 'Harrisburg-Carlisle, PA' },
  { id: '25180', name: 'Hagerstown-Martinsburg, MD-WV' },
  { id: '25060', name: 'Gulfport-Biloxi, MS' },
  { id: '25020', name: 'Guayama, PR' },
  { id: '24860', name: 'Greenville, SC' },
  { id: '24780', name: 'Greenville, NC' },
  { id: '25500', name: 'Harrisonburg, VA' },
  { id: '25540', name: 'Hartford-West Hartford-East Hartford, CT' },
  { id: '25620', name: 'Hattiesburg, MS' },
  { id: '25860', name: 'Hickory-Lenoir-Morganton, NC' },
  { id: '25980', name: 'Hinesville-Fort Stewart, GA' },
  { id: '26100', name: 'Holland-Grand Haven, MI' },
  { id: '26180', name: 'Honolulu, HI' },
  { id: '26300', name: 'Hot Springs, AR' },
  { id: '26380', name: 'Houma-Bayou Cane-Thibodaux, LA' }
]

class MsaMds extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      isLoaded: false,
      msamds: [],
      selectValue: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    // TODO: load either MSA/MDs for an institution or for a state
    let fetchURL = ''
    if (this.props.match.params.institutionId)
      fetchURL = `https://ffiec-api.cfpb.gov/public/filers/${
        this.props.match.params.institutionId
      }/msamds`
    if (this.props.match.params.stateId)
      fetchURL = `https://ffiec-api.cfpb.gov/public/msamds?state=${
        this.props.match.params.stateId
      }`

    this.setState({ msamds: MSAMDS, isLoaded: true, selectValue: MSAMDS[0].id })
    /*
    fetch(fetchURL)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            msamds: result.msamds
          })
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )*/
  }

  handleChange(event) {
    this.setState({ selectValue: event.target.value })
  }

  handleSubmit(event) {
    this.props.history.push({
      pathname: `${this.props.match.url}/msa-md/${this.state.selectValue}`
    })
    event.preventDefault()
  }

  render() {
    let msaMdsFor = ''
    if (this.props.match.params.institutionId)
      msaMdsFor = this.props.match.params.institutionId
    if (this.props.match.params.stateId)
      msaMdsFor = this.props.match.params.stateId

    return (
      <div className="usa-grid msa-mds" id="main-content">
        <Header
          type={1}
          headingText={`Choose an available MSA/MD for ${msaMdsFor}`}
        />

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="states">Select a MSA/MD</label>

          <select
            name="msamds"
            id="msamds"
            value={this.state.selectValue}
            onChange={this.handleChange}
          >
            {this.state.msamds.map((msamd, index) => {
              return (
                <option key={index} value={msamd.id}>
                  {msamd.id} - {msamd.name}
                </option>
              )
            })}
          </select>

          <input type="submit" value="Next - Find a Report" />
        </form>
      </div>
    )
  }
}

export default MsaMds
