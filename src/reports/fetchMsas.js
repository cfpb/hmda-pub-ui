function getMsaUrl(institutionId) {
  return `https://ffiec-api.cfpb.gov/public/filers/2017/${institutionId}/msaMds`
}

export default function(institutionId) {
  return fetch(getMsaUrl(institutionId)).then(res => res.json())
}
