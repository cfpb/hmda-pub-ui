import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AppHeader from './common/AppHeader.jsx'
import Footer from './common/Footer.jsx'
import Home from './Home.jsx'
import ModifiedLar from './reports/ModifiedLar.jsx'
import Disclosure from './reports/Disclosure.jsx'
import Aggregate from './reports/Aggregate.jsx'
import NotFound from './common/NotFound.jsx'

const App = () => {
  return (
    <>
      <AppHeader />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/modified-lar/*" component={NotFound} />
        <Route path="/modified-lar" component={ModifiedLar} />
        {/*<Route
          path="/disclosure-reports/:year/:institutionId?/:msaMdId?/:reportId?"
          component={Disclosure}
        />*/}
        <Route
          path="/aggregate-reports/:year/:stateId?/:msaMdId?/:reportId?"
          component={Aggregate}
        />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </>
  )
}

export default App
