import React from 'react'

const Header = props => {
  return (
    <header className="header">
      <h1>{props.heading}</h1>
      <p className="usa-font-lead">{props.lead}</p>
      {props.heading === 'Modified LAR' ? (
        <p className="usa-text-small">
          You can also <a href="#">download all the modified LAR files</a> in a
          zip file. This is useful for more detailed statistical analysis and
          for importing into other software.
        </p>
      ) : null}
    </header>
  )
}

export default Header
