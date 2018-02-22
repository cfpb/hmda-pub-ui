import React from 'react'
import Results from './Results.jsx'

class ModifiedLar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      institutionsFull: [],
      institutionsSearched: [],
      isLoaded: false,
      textInputValue: ''
    }

    this.handleTextInputChange = this.handleTextInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    // TODO
    // maybe this endpoint could use a query string
    // eg ...?string=abc
    // this would let us do a type-ahead search
    // or, this is fine and we load them all (~7000)
    // and do a type-ahead search on those
    /*fetch('https://ffiec-api.cfpb.gov/public/filers')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            institutionsFull: result.institutions
          })
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )*/

    this.setState({
      institutionsFull: [
        { name: 'Bank 0', id: '012345' },
        { name: 'Bank 1', id: '23423768' },
        { name: 'Bank of Andrew', id: '9345482' },
        { name: 'Manning of Omaha', id: '09433' },
        { name: 'Fells Wargo', id: '342735' },
        { name: 'Key Largo Federal', id: '49834' },
        { name: 'Small Town Small Bank', id: '32453483634' }
      ]
    })
  }

  handleTextInputChange(event) {
    this.setState({ textInputValue: event.target.value, error: null })
    let institutionsFiltered = []

    if (event.target.value.length !== 0) {
      this.state.institutionsFull.forEach(institution => {
        if (
          institution.name
            .toLowerCase()
            .includes(event.target.value.toLowerCase())
        ) {
          institutionsFiltered.push(institution)
        }
      })

      if (institutionsFiltered.length === 0) {
        this.setState({ error: 404 })
      }
    }

    this.setState({ institutionsSearched: institutionsFiltered })
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    return (
      <div className="usa-grid modified-lar" id="main-content">
        <div className="usa-width-one-whole">
          <h2>Modified LAR</h2>
          <p>
            Every institution that has filed has a download-able modified LAR.
            Using this form you can search for an institution, by name, and
            download their modified LAR file.
          </p>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="institution-name">Enter an institution name</label>
            <input
              id="institution-name"
              name="institution-name"
              type="text"
              value={this.state.textInputValue}
              onChange={this.handleTextInputChange}
              placeholder="Institution name"
            />
          </form>

          <Results
            error={this.state.error}
            institutions={this.state.institutionsSearched}
          />
        </div>
      </div>
    )
  }
}

export default ModifiedLar
