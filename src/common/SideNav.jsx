import React from 'react'
import { Link } from 'react-router-dom'

const SideNav = ({ match }) => {
  return (
    <aside className="usa-width-one-fourth">
      <ul className="usa-sidenav-list">
        <li>
          <Link to="/modified-lar">Modified LAR</Link>
        </li>
      </ul>
    </aside>
  )
}

export default SideNav
