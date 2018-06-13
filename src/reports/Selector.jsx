import React from 'react'
import Select from 'react-select-plus'
import Option from '../Option.js'
import Header from '../common/Header.jsx'

class Selector extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(option) {
    if (this.props.selectorCallback) this.props.selectorCallback(option.data)
    let url = this.props.match.url
    if (!url.match(/\/$/)) url += '/'
    this.props.history.push({
      pathname: url + option.value
    })
  }

  render() {
    return (
      <React.Fragment>
        <Header type={4} headingText={this.props.header} />
        <Select
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          searchable={true}
          autoFocus
          openOnFocus
          options={this.props.options}
          optionComponent={Option}
          noResultsText={
            <div className="usa-alert usa-alert-error" role="alert">
              <div className="usa-alert-body">
                <h3 className="usa-alert-heading">No results found!</h3>
                Sorry, there doesn't seem to be a match found. Please try again.
              </div>
            </div>
          }
        />
      </React.Fragment>
    )
  }
}

export default Selector
