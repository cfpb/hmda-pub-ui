import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../common/Header.jsx'

const ProgressCard = ({ name, id, link, title }) => {
  if (id === 'nationwide') {
    name = ''
  } else {
    name = name + ' - '
  }

  return (
    <div className="ProgressCard">
      <Header type={4} headingText={title} paragraphText={name + id}>
        <Link to={link}>Select a different {title}</Link>
      </Header>
    </div>
  )
}

export default ProgressCard
