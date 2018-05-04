import React from 'react'
import Select from 'react-select'
import Option from '../Option.js'
import Header from '../common/Header.jsx'

class Selector extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(option) {
    console.log('opt', option)
    let url = this.props.match.url
    if (!url.match(/\/$/)) url += '/'
    this.props.history.push({
      pathname: url + option.value
    })
    this.props.selectorCallback(option.data)
  }

  render() {
    return (
      <>
        <Header type={3} headingText={this.props.header} />
        <Select
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          searchable={true}
          autoFocus
          openOnFocus
          options={this.props.options}
          optionComponent={Option}
        />
      </>
    )
  }
}

export default Selector
