import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const makeHeadingLink = (headingText, headingLink) => {
  return <Link to={headingLink}>{headingText}</Link>
}

const renderHeading = (type, heading) => {
  if (type === 1) return <h1>{heading}</h1>
  if (type === 2) return <h2>{heading}</h2>
  if (type === 4) return <h4>{heading}</h4>
}

const renderParagraph = (type, paragraphText) => {
  if (type === 1) return <p className="usa-font-lead">{paragraphText}</p>
  if (type === 4) return <p>{paragraphText}</p>
}

const Header = props => {
  let style = { marginBottom: '1em' }
  if (props.type === 1) style = { marginBottom: '3em' }

  let heading = props.headingText
  if (props.headingLink)
    heading = makeHeadingLink(props.headingText, props.headingLink)

  let paragraphText = null
  if (props.paragraphText)
    paragraphText = renderParagraph(props.type, props.paragraphText)

  return (
    <header className="header" style={style}>
      {renderHeading(props.type, heading)}
      {paragraphText}
      {props.children}
    </header>
  )
}

Header.propTypes = {
  type: PropTypes.oneOf([1, 2, 4]),
  headingText: PropTypes.string,
  paragraphText: PropTypes.string,
  headingLink: PropTypes.string
}

export default Header
