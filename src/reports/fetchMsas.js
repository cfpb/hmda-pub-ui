import isomorphicFetch from 'isomorphic-fetch'

function getMsaUrl(institutionId) {
  return `https://ffiec-api.cfpb.gov/public/filers/2017/${institutionId}/msaMds`
}

export default function(institutionId) {
  return isomorphicFetch(getMsaUrl(institutionId)).then(res => res.json())
}
