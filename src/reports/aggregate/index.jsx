import React from 'react'
import Header from '../../common/Header.jsx'
import LoadingIcon from '../../common/LoadingIcon.jsx'

const STATES = [
  { id: 'AK', name: 'Alaska' },
  { id: 'AL', name: 'Alabama' },
  { id: 'AR', name: 'Arkansas' },
  { id: 'AZ', name: 'Arizona' },
  { id: 'CA', name: 'California' },
  { id: 'CO', name: 'Colorado' },
  { id: 'CT', name: 'Connecticut' },
  { id: 'DC', name: 'District of Columbia' },
  { id: 'DE', name: 'Delaware' },
  { id: 'FL', name: 'Florida' },
  { id: 'GA', name: 'Georgia' },
  { id: 'HI', name: 'Hawaii' },
  { id: 'IA', name: 'Iowa' },
  { id: 'ID', name: 'Idaho' },
  { id: 'IL', name: 'Illinois' },
  { id: 'IN', name: 'Indiana' },
  { id: 'KS', name: 'Kansas' },
  { id: 'KY', name: 'Kentucky' },
  { id: 'LA', name: 'Louisiana' },
  { id: 'MA', name: 'Massachusetts' },
  { id: 'MD', name: 'Maryland' },
  { id: 'ME', name: 'Maine' },
  { id: 'MI', name: 'Michigan' },
  { id: 'MN', name: 'Minnesota' },
  { id: 'MO', name: 'Missouri' },
  { id: 'MS', name: 'Mississippi' },
  { id: 'MT', name: 'Montana' },
  { id: 'NC', name: 'North Carolina' },
  { id: 'ND', name: 'North Dakota' },
  { id: 'NE', name: 'Nebraska' },
  { id: 'NH', name: 'New Hampshire' },
  { id: 'NJ', name: 'New Jersey' },
  { id: 'NM', name: 'New Mexico' },
  { id: 'NV', name: 'Nevada' },
  { id: 'NY', name: 'New York' },
  { id: 'OH', name: 'Ohio' },
  { id: 'OK', name: 'Oklahoma' },
  { id: 'OR', name: 'Oregon' },
  { id: 'PA', name: 'Pennsylvania' },
  { id: 'PR', name: 'Puerto Rico' },
  { id: 'RI', name: 'Rhode Island' },
  { id: 'SC', name: 'South Carolina' },
  { id: 'SD', name: 'South Dakota' },
  { id: 'TN', name: 'Tennessee' },
  { id: 'TX', name: 'Texas' },
  { id: 'UT', name: 'Utah' },
  { id: 'VA', name: 'Virginia' },
  { id: 'VT', name: 'Vermont' },
  { id: 'WA', name: 'Washington' },
  { id: 'WI', name: 'Wisconsin' },
  { id: 'WV', name: 'West Virginia' },
  { id: 'WY', name: 'Wyoming' }
]

class Aggregate extends React.Component {
  constructor(props) {
    super(props)

    this.state = { selectValue: 'AK' }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      selectValue: event.target.value
    })
  }

  handleSubmit(event) {
    this.props.history.push({
      pathname: `${this.props.match.url}/state/${this.state.selectValue}`
    })
    event.preventDefault()
  }

  render() {
    return (
      <div className="usa-grid aggregate" id="main-content">
        <div className="usa-width-one-whole">
          <Header
            type={1}
            headingText="MSA/MD Aggregate Reports"
            paragraphText="These reports summarize lending activity by MSA/MD."
          />

          <form onSubmit={this.handleSubmit}>
            <label htmlFor="states">Select a state</label>

            <select
              name="states"
              id="states"
              value={this.state.selectValue}
              onChange={this.handleChange}
            >
              {STATES.map((state, index) => {
                return (
                  <option key={index} value={state.id}>
                    {state.name}
                  </option>
                )
              })}
            </select>

            <input type="submit" value="Next - Select an MSA/MD" />
          </form>
        </div>
      </div>
    )
  }
}

export default Aggregate
