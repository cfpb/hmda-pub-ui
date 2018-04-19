import React from 'react'
import Header from '../../common/Header.jsx'
import STATES from '../../constants/states.js'

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
