import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Results extends React.Component {
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.inputValue !== this.props.inputValue) return true
    return false
  }

  render() {
    if (this.props.status.id === -1) return null
    if (this.props.states.length === 0) return null

    return (
      <ul className="results">
        {this.props.states.map((state, index) => {
          return (
            <li key={index}>
              <h4>
                {state.name} - {state.id}
              </h4>
              <Link
                to={`${this.props.match.url}/state/${state.id}`}
                className="usa-font-small"
              >
                View MSA/MDs
              </Link>
            </li>
          )
        })}
      </ul>
    )
  }
}

export default Results
