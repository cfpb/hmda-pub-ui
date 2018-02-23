import React from 'react'
import { Switch, Route } from 'react-router-dom'
import BannerUSA from './common/BannerUSA.jsx'
import Header from './common/Header.jsx'
import Home from './Home.jsx'
import ModifiedLar from './modified-lar/index.jsx'
import Disclosure from './disclosure/index.jsx'
import MsaMds from './disclosure/msa-mds.jsx'
import Reports from './disclosure/reports.jsx'
import Report from './disclosure/report.jsx'

const App = () => {
  console.log('routing')
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/modified-lar" component={ModifiedLar} />
      </Switch>
    </React.Fragment>
  )
}

export default App
