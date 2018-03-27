import React from 'react'
import Header from '../../common/Header.jsx'

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
      `https://s3.amazonaws.com/cfpb-hmda-public/prod/reports/disclosure/${
        this.props.match.params.institutionId
      }/${this.props.match.params.msaMdId}/${
        this.props.match.params.reportId
      }.json`
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
      <div className="usa-grid report" id="main-content">
        <Header
          type="main"
          headingText={`Report ${
            this.props.match.params.reportId
          } for institution ${
            this.props.match.params.institutionId
          } for MSA/MD ${this.props.match.params.msaMdId}`}
          paragraphText="This is the report."
        />
      </div>
    )
  }
}

export default Report
