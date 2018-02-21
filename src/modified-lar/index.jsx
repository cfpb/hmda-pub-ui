import React from 'react'

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
        { name: 'Bank 0', id: '0' },
        { name: 'Bank 1', id: '1' },
        { name: 'Andrew Has No Money', id: '0' },
        { name: 'We Have Lots of Money', id: '1' },
        { name: 'Bank of GIF', id: '0' },
        { name: 'Key Largo', id: '1' },
        { name: "Baby Why Don't We Go", id: '0' }
      ]
    })
  }

  handleTextInputChange(event) {
    this.setState({ textInputValue: event.target.value })

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
    }

    this.setState({ institutionsSearched: institutionsFiltered })
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    return (
      <div className="usa-grid">
        <div className="usa-width-one-whole">
          <h1>Find an institution.</h1>
          <form onSubmit={this.handleSubmit}>
            <label for="institution-name">Institution name</label>
            <input
              id="institution-name"
              name="institution-name"
              type="text"
              value={this.state.textInputValue}
              onChange={this.handleTextInputChange}
            />
          </form>

          <ul>
            {this.state.institutionsSearched.map((institution, index) => {
              return (
                <li key={index}>
                  {institution.name} ({institution.id}) -{' '}
                  <a
                    href={`https://s3.amazonaws.com/cfpb-hmda-public/prod/lar/${
                      institution.id
                    }.txt`}
                    download
                  >
                    Download Modified LAR
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default ModifiedLar
