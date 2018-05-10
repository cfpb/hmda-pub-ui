import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../common/Header.jsx'

const ProgressCard = ({ name, id, link, title }) => {
  if (id === 'nationwide') {
    name = ''
  } else {
    name = name + ' - '
  }

  let stepNumber = '1.'
  if (title === 'MSA/MD') stepNumber = '2.'
  if (title === 'report') stepNumber = '3.'

  return (
    <div className="ProgressCard usa-width-one-third">
      <Header
        type={4}
        headingText={`${stepNumber} ${title}`}
        paragraphText={name + id}
      >
        <p style={{ marginBottom: '0' }}>
          <Link to={link}>Select a different {title}</Link>
        </p>
      </Header>
    </div>
  )
}

export default ProgressCard
