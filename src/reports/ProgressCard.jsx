import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../common/Header.jsx'

const ProgressCard = ({ name, id, link, title }) => {
  if (id !== '') {
    name = name + ' - '
  }

  if (id === 'nationwide') {
    name = ''
  }

  let disabled = false
  if (link === null) {
    disabled = true
  }

  return (
    <div className="ProgressCard">
      <Header
        type={4}
        headingText={title}
        paragraphText={name + id}
        headingLink={link}
        disabled={disabled}
      />
    </div>
  )
}

export default ProgressCard
