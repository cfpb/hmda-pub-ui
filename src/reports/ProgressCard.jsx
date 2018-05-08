import React from 'react'
import { Link } from 'react-router-dom'

const capitalize = str => str[0].toUpperCase() + str.slice(1)
const ProgressCard = ({ name, id, link, title }) => {
  if (id === 'nationwide') {
    name = ''
    id = capitalize(id)
  } else {
    name = name + ' - '
  }

  return (
    <div className="ProgressCard usa-width-one-third">
      <h5>{capitalize(title)}</h5>
      <div>
        {name}
        {id}
      </div>
      <Link to={link}>Select a different {title}</Link>
    </div>
  )
}

export default ProgressCard
