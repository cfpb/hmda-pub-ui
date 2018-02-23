import React from 'react'
import { Switch, Route } from 'react-router-dom'
import BannerUSA from './common/BannerUSA.jsx'
import Header from './common/Header.jsx'
import Home from './Home.jsx'
import ModifiedLar from './modified-lar/index.jsx'
import NotFound from './common/NotFound.jsx'

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/modified-lar" component={ModifiedLar} />
        <Route component={NotFound} />
      </Switch>
    </React.Fragment>
  )
}

export default App
