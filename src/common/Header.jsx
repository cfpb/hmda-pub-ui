import React from 'react'

const renderHeading = (type, headingText) => {
  if (type === 'main') return <h1>{headingText}</h1>
  if (type === 'sub') return <h4>{headingText}</h4>
}

const renderParagraph = (type, paragraphText) => {
  if (type === 'main') return <p className="usa-font-lead">{paragraphText}</p>
  if (type === 'sub') return <p>{paragraphText}</p>
}

const Header = props => {
  let style = { marginBottom: '3em' }
  if (props.type === 'sub') style = { marginBottom: '1em' }
  return (
    <header className="header" style={style}>
      {renderHeading(props.type, props.headingText)}
      {renderParagraph(props.type, props.paragraphText)}
      {props.children}
    </header>
  )
}

export default Header
