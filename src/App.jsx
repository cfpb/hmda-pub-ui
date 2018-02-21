import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import BannerUSA from './common/BannerUSA.jsx'
import Header from './common/Header.jsx'
import Home from './Home.jsx'
import ModifiedLar from './modified-lar/index.jsx'
import Disclosure from './disclosure/index.jsx'
import MsaMds from './disclosure/msa-mds.jsx'
import Reports from './disclosure/reports.jsx'
import Report from './disclosure/report.jsx'

const App = () => {
  return (
    <Router basename="/reports">
      <React.Fragment>
        <Header />

        <Route exact path="/" component={Home} />
        <Route exact path="/modified-lar" component={ModifiedLar} />
        <Route exact path="/disclosure" component={Disclosure} />
        <Route
          exact
          path="/disclosure/institution/:institutionId"
          component={MsaMds}
        />
        <Route
          exact
          path="/disclosure/institution/:institutionId/msa-md/:msaMdId"
          component={Reports}
        />
        <Route
          exact
          path="/disclosure/institution/:institutionId/msa-md/:msaMdId/report/:reportId"
          component={Report}
        />
      </React.Fragment>
    </Router>
  )
}

export default App
