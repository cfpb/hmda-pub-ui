import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { DYNAMIC_DATASET } from './constants/dynamic-dataset'
import { SNAPSHOT_DATASET } from './constants/snapshot-dataset'

import Header from './Header'
import Home from './Home'
import ModifiedLar from './reports/ModifiedLar'
import SupportingDocs from './reports/SupportingDocs.jsx'
import Disclosure from './reports/Disclosure'
import Aggregate from './reports/Aggregate'
import NationalAggregate from './reports/NationalAggregate'
import Snapshot from './reports/snapshot/index'
import DynamicDataset from './reports/DynamicDataset'
import NotFound from './common/NotFound'
import Footer from './Footer'

import './app.css'

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Redirect exact from="/modified-lar" to="/modified-lar/2018" />
        <Route path="/documents" component={SupportingDocs} />
        <Route path="/modified-lar/:year" component={ModifiedLar} />
        <Route
          path="/disclosure-reports/:year?/:institutionId?/:msaMdId?/:reportId?"
          component={Disclosure}
        />
        <Route
          path="/aggregate-reports/:year?/:stateId?/:msaMdId?/:reportId?"
          component={Aggregate}
        />
        <Route
          path="/national-aggregate-reports/:year?/:reportId?"
          component={NationalAggregate}
        />
        <Route
          path="/snapshot-national-loan-level-dataset/:year?"
          render={ props => {
            const { year } = props.match.params
            if(year && SNAPSHOT_DATASET.displayedYears.indexOf(year) === -1){
              return <NotFound/>
            }
            return <Snapshot {...props}/>
          }}
        />
        <Route
          path="/dynamic-national-loan-level-dataset/:year?"
          render={ props => {
            const { year } = props.match.params
            if(year && DYNAMIC_DATASET.displayedYears.indexOf(year) === -1){
              return <NotFound/>
            }
            return <DynamicDataset {...props}/>
          }}
        />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </React.Fragment>
  )
}

export default App
