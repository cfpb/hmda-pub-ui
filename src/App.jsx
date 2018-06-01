import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Header, Footer } from 'hmda-ui'
import Home from './Home.jsx'
import ModifiedLar from './reports/ModifiedLar.jsx'
import Disclosure from './reports/Disclosure.jsx'
import Aggregate from './reports/Aggregate.jsx'
import Snapshot from './reports/snapshot/index.jsx'
import NotFound from './common/NotFound.jsx'

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/modified-lar/*" component={NotFound} />
        <Route path="/modified-lar" component={ModifiedLar} />
        <Route
          path="/disclosure-reports/:year/:institutionId?/:msaMdId?/:reportId?"
          component={Disclosure}
        />
        <Route
          path="/aggregate-reports/:year/:stateId?/:msaMdId?/:reportId?"
          component={Aggregate}
        />
        <Route
          path="/snapshot-national-loan-level-dataset"
          component={Snapshot}
        />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </>
  )
}

export default App
