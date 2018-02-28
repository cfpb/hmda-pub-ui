import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SideNav from './common/SideNav.jsx'

class Home extends Component {
  render() {
    return (
      <div className="home usa-grid">
        <SideNav />
        <div className="usa-width-three-fourths">
          <header>
            <h1>HMDA reporting</h1>
            <p className="usa-font-lead">All things HMDA reporting.</p>
          </header>
        </div>
      </div>
    )
  }
}

export default Home
