import React from 'react'
import Select from 'react-select'
import Header from '../common/Header.jsx'
import LoadingIcon from '../common/LoadingIcon.jsx'

class Selector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      [props.target]: []
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    fetch(this.getUrl())
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            [this.props.target]: result
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

  getUrl() {
    const { params } = this.props.match
    let url = `http://localhost:1337/cfpb-hmda-public/prod/reports/disclosure/2017/${
      params.institutionId
    }`
    if (params.msaMdId) url += `/${params.msaMdId}`
    return url
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
          type={1}
          headingText={this.props.getHeader.call(this)}
          paragraphText={this.props.paragraphText}
        />
        {this.state.isLoaded ? (
          <Select
            onChange={this.handleChange}
            placeholder={this.props.placeholder}
            searchable={false}
            simpleValue
            options={this.state[this.props.target].map(val => {
              val = val.split('.txt')[0]
              return { value: val, label: val }
            })}
          />
        ) : (
          <LoadingIcon />
        )}
      </div>
    )
  }
}

export default Selector
