function getMsaUrl(institutionId, year) {
  if (year === '2017')
    return `https://ffiec-api.cfpb.gov/public/filers/2017/${institutionId}/msaMds`
  return `/v2/reporting/filers/${year}/${institutionId}/msaMds`
}

export default function(institutionId, year) {
  return fetch(getMsaUrl(institutionId, year)).then(res => res.json())
}
