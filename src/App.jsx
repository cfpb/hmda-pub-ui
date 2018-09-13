import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Header, Footer } from 'hmda-ui'
import Home from './Home.jsx'
import ModifiedLar from './reports/ModifiedLar.jsx'
import Disclosure from './reports/Disclosure.jsx'
import Aggregate from './reports/Aggregate.jsx'
import NationalAggregate from './reports/NationalAggregate.jsx'
import Snapshot from './reports/snapshot/index.jsx'
import DynamicDataset from './reports/DynamicDataset.jsx'
import NotFound from './common/NotFound.jsx'

const App = () => {
  return (
    <React.Fragment>
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
          path="/national-aggregate-reports/:year/:reportId?"
          component={NationalAggregate}
        />
        <Route
          path="/snapshot-national-loan-level-dataset"
          component={Snapshot}
        />
        <Route
          path="/dynamic-national-loan-level-dataset"
          component={DynamicDataset}
        />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </React.Fragment>
  )
}

export default App
