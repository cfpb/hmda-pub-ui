import React from 'react'

const capitalize = str => str[0].toUpperCase() + str.slice(1)
const ProgressCard = props => {
  return (
    <div className="ProgressCard usa-width-one-third">
      <h5>{capitalize(props.title)}</h5>
      <div>
        {props.name} - {props.id}
      </div>
      <a
        href="#"
        onClick={e => {
          e.preventDefault()
          props.goBack()
        }}
      >
        Select a different {props.title}
      </a>
    </div>
  )
}

export default ProgressCard
