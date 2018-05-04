import React from 'react'
import { Link } from 'react-router-dom'

const capitalize = str => str[0].toUpperCase() + str.slice(1)
const ProgressCard = props => {
  return (
    <div className="ProgressCard usa-width-one-third">
      <h5>{capitalize(props.title)}</h5>
      <div>
        {props.name} - {props.id}
      </div>
      <Link to={props.link}>Select a different {props.title}</Link>
    </div>
  )
}

export default ProgressCard
