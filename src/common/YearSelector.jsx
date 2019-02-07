import React, { useState } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import YEARS from '../constants/years'

const YearSelector = withRouter(({ history }) => {
  const { push, location } = history
  //const [currentYear, setYear] = useState(location.pathname.split('/')[2])
  //const [currentYear, setYear] = useState('2018')
  const pathYear = location.pathname.split('/')[2]
  let newPathname = location.pathname.split('/')
  newPathname.splice(2, 1)

  return YEARS.map((year, i) => {
    console.log(pathYear, year, pathYear === year)

    return (
      <NavLink
        to={newPathname.join('/') + '/' + year}
        activeStyle={{
          fontWeight: 'bold',
          color: 'red'
        }}
      >
        {year}
      </NavLink>
    )

    /*return (
      <React.Fragment key={year}>
        <label>
          {year} (state is {pathYear})
        </label>{' '}
        <input
          type="radio"
          name="year"
          id={`year${i}`}
          value={year}
          checked={pathYear === year ? true : false}
          onChange={event => {
            event.preventDefault()
            //setYear(event.target.value)
            let newPathname = location.pathname.split('/')
            newPathname.splice(2, 1, event.target.value)
            push(newPathname.join('/'))
          }}
        />
      </React.Fragment>
    )*/
  })
})

export default YearSelector
