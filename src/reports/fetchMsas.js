function getMsaUrl(institutionId, year) {
  console.log('getMsaUrl', year)
  return `https://ffiec-api.cfpb.gov/public/filers/2017/${institutionId}/msaMds`
}

export default function(institutionId, year) {
  return fetch(getMsaUrl(institutionId, year)).then(res => res.json())
}
