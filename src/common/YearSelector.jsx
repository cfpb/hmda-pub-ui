import React from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import YEARS from '../constants/years'

import './YearSelector.css'

const YearSelector = withRouter(({ history, standalone, years = YEARS }) => {
  const { pathname } = history.location
  const pathApp = pathname.split('/')[1]
  const pathYear = pathname.split('/')[2]

  return (
    <div className={'YearSelector' + (standalone ? ' standalone' : '')}>
      <h4>Select a year</h4>
      {years.map((year, i) => {
        const className = year === pathYear ? 'active' : ''
        // just link to the current path if its the selected year
        // if it's a different year, jump back to the start for that year
        const toURL = year === pathYear ? pathname : `/${pathApp}/${year}`
        return (
          <NavLink to={toURL} className={className} key={i}>
            {year}
          </NavLink>
        )
      })}
    </div>
  )
})

export default YearSelector
