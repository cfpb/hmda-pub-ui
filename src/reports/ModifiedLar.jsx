import React from 'react'
import Header from '../common/Header.jsx'
import SearchList from './SearchList.jsx'
import YearSelector from '../common/YearSelector.jsx'

import './ModifiedLar.css'

const ModifiedLar = props => {
  const year = props.match.params.year

  return (
    <React.Fragment>
      <div className="ModifiedLar" id="main-content">
        <Header
          type={1}
          headingText="Modified Loan/Application Register (LAR)"
          paragraphText="A downloadable modified LAR file is available for every
            financial institution that has completed a HMDA data submission in the selected year.
            Enter a financial institution’s name to download its modified LAR file.
            If you cannot find a particular financial institution using this form, the
            institution may not have been required to report HMDA data or it
            may not have completed its HMDA data submission."
        >
          <p>
            Modified LAR file specifications: <a
              title="Modified LAR 2018 file specification"
              href="https://github.com/cfpb/hmda-platform/blob/master/docs/v2/spec/Modified%20LAR%20Schema.csv"
            >2018</a>,{' '}
            <a
              title="Modified LAR 2017 file specification"
              href="https://github.com/cfpb/hmda-platform/blob/master/docs/v1/2017_Modified_LAR_Spec.csv"
            >2017</a>
          </p>
        </Header>
        <YearSelector standalone={true} />
        <SearchList year={year} />
      </div>
    </React.Fragment>
  )
}

export default ModifiedLar
