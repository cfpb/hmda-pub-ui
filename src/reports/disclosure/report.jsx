import React from 'react'

class Report extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      isLoaded: false,
      report: {}
    }
  }

  componentDidMount() {
    fetch(
      `https://s3.amazonaws.com/cfpb-hmda-public/prod/reports/disclosure/${this
        .props.match.params.institutionId}/${this.props.match.params
        .msaMdId}/${this.props.match.params.reportId}.json`
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            msaMds: result.msaMds
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

  render() {
    return (
      <h1>
        Report{' '}
        <code style={{ backgroundColor: '#f1f1f1', border: '1px solid #ddd' }}>
          {this.props.match.params.reportId}
        </code>{' '}
        for institution{' '}
        <code style={{ backgroundColor: '#f1f1f1', border: '1px solid #ddd' }}>
          {this.props.match.params.institutionId}
        </code>{' '}
        in MSA/MD{' '}
        <code style={{ backgroundColor: '#f1f1f1', border: '1px solid #ddd' }}>
          {this.props.match.params.msaMdId}
        </code>
      </h1>
    )
  }
}

export default Report
