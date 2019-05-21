import React from 'react'
import Header from '../common/Header.jsx'

import './SupportingDocs.css'

const ModifiedLarDocs = props => {
  return (
    <div className="SupportingDocs" id="main-content">
      <Header
        type={1}
        headingText="HMDA Supporting Documents"
      ></Header>
      <div className="DocSection">
        <h2>Modified LAR</h2>
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
          <p>
            Modified LAR header for CSV files: <a
              title="Modified LAR header for 2018 csv file"
              href="https://github.com/cfpb/HMDA_Data_Science_Kit/blob/master/documentation_resources/schemas/mlar/headers/mlar_header_2018.csv"
            >2018</a>,{' '}
            <a
              title="Modified LAR header for 2017 csv file"
              href="https://github.com/cfpb/HMDA_Data_Science_Kit/blob/master/documentation_resources/schemas/mlar/headers/mlar_header_2017.csv"
            >2017</a>
          </p>
          <p>
            Modified LAR Data Dictionaries: <a
              title="Modified LAR 2018 data dictionary"
              href="https://github.com/cfpb/HMDA_Data_Science_Kit/blob/master/documentation_resources/schemas/mlar/schemas/mlar_schema_2018.csv"
            >2018</a>,{' '}
            <a
              title="Modified LAR 2017 data dictionary"
              href="https://github.com/cfpb/HMDA_Data_Science_Kit/blob/master/documentation_resources/schemas/mlar/schemas/mlar_schema_2017.csv"
            >2017</a>
          </p>
          <p>
            <a
              title="Modified LAR Field information"
              href="https://github.com/cfpb/HMDA_Data_Science_Kit/blob/master/documentation_resources/AboutModifiedLAR.md"
            >Modified LAR Field information</a>
          </p>
          <p>
            <a
              title="Opening Modified LAR Text Files With Excel"
              href="https://github.com/cfpb/HMDA_Data_Science_Kit/blob/master/documentation_resources/ModifiedLarWithExcel.md"
            >Opening Modified LAR Text Files With Excel</a>
          </p>
      </div>
      <div className="DocSection">
        <h2>Disclosure</h2>
          <p>
            Something else
          </p>
          <p>
            Another thing
          </p>
      </div>
    </div>
  )
}

export default ModifiedLarDocs

