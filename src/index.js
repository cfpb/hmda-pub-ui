/* global ga */
import '@babel/polyfill'
import React from 'react'
import { render } from 'react-dom'
import App from './App.jsx'

// awesome dev stuff
// use `yarn run js:dev` to see it in action
if (process.env.NODE_ENV !== 'production') {
  // react update logging
  const { whyDidYouUpdate } = require('why-did-you-update')
  whyDidYouUpdate(React)
}

render(<App />, document.getElementById('app'))
