import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AppHeader from './common/AppHeader.jsx'
import Footer from './common/Footer.jsx'
import Home from './Home.jsx'
import ModifiedLar from './reports/modified-lar/index.jsx'
import Disclosure from './reports/disclosure/index.jsx'
import Aggregate from './reports/aggregate/index.jsx'
import MsaMds from './reports/MsaMds.jsx'
import Reports from './reports/Reports.jsx'
import Report from './reports/Report.jsx'
import NotFound from './common/NotFound.jsx'

const App = () => {
  return (
    <React.Fragment>
      <AppHeader />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/modified-lar/*" component={NotFound} />
        <Route path="/modified-lar" component={ModifiedLar} />
        <Route
          path="/disclosure-reports/institution/:institutionId/msa-md/:msaMdId/report/:reportId"
          component={Report}
        />
        <Route
          path="/disclosure-reports/institution/:institutionId/msa-md/:msaMdId"
          component={Reports}
        />
        <Route
          path="/disclosure-reports/institution/:institutionId"
          component={MsaMds}
        />
        <Route path="/disclosure-reports" component={Disclosure} />
        <Route
          path="/aggregate-reports/state/:stateId/msa-md/:msaMdId/report/:reportId"
          component={Report}
        />
        <Route
          path="/aggregate-reports/state/:stateId/msa-md/:msaMdId"
          component={Reports}
        />
        <Route path="/aggregate-reports/state/:stateId" component={MsaMds} />
        <Route path="/aggregate-reports" component={Aggregate} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </React.Fragment>
  )
}

export default App
