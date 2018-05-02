import React from 'react'
import Select from 'react-select'
import Header from '../../common/Header.jsx'
import STATES from '../../constants/states.js'

class Aggregate extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(val) {
    this.props.history.push({
      pathname: `${this.props.match.url}/2017/state/${val}`
    })
  }

  render() {
    const options = STATES.map(state => {
      return { value: state.id, label: state.name }
    })
    return (
      <div className="usa-grid aggregate" id="main-content">
        <div className="usa-width-one-whole">
          <Header
            type={1}
            headingText="MSA/MD Aggregate Reports"
            paragraphText="These reports summarize lending activity by MSA/MD."
          />
          <Select
            onChange={this.handleChange}
            placeholder="Select a state..."
            searchable={false}
            autoFocus
            openOnFocus
            simpleValue
            options={options}
          />
        </div>
      </div>
    )
  }
}

export default Aggregate
