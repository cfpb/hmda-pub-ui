export const DYNAMIC_DATASET = {
  // '2019':
  //   {
  //      lar : "2019-lar",
  //      ts : "2019-ts",
  //      lar_spec : "2019-lar-specs",
  //      ts_spec : "2019-ts-spec"
  //   },
  //
  '2018':
    {
       lar : "2018-lar",
       ts : "2018-ts",
       lar_spec : "2018-lar-specs",
       ts_spec : "2018-ts-spec"
    },

  '2017':
    {
       lar: "https://s3.amazonaws.com/cfpb-hmda-public/prod/dynamic-data/2017_lar.txt",
       ts : "https://s3.amazonaws.com/cfpb-hmda-public/prod/dynamic-data/2017_ts.txt",
       lar_spec : "https://github.com/cfpb/hmda-platform/blob/v1.x/Documents/2017_Dynamic_LAR_Spec.csv",
       ts_spec : "https://github.com/cfpb/hmda-platform/blob/v1.x/Documents/2017_Dynamic_TS_Spec.csv"
    }

}
