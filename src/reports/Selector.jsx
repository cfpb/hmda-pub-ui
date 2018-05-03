import React from 'react'
import Select from 'react-select'
import Option from '../Option.js'
import Header from '../common/Header.jsx'

class Selector extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(val) {
    let url = this.props.match.url
    if (!url.match(/\/$/)) url += '/'
    this.props.history.push({
      pathname: `${url}${this.props.target}/${val}`
    })
  }

  render() {
    return (
      <div className="usa-grid" id="main-content">
        <Header
          type={2}
          headingText={this.props.header}
          paragraphText={this.props.paragraphText}
        />
        <Select
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          searchable={true}
          autoFocus
          openOnFocus
          simpleValue
          options={this.props.options}
          optionComponent={Option}
        />
      </div>
    )
  }
}

export default Selector
