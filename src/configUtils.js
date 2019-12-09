const CONFIG_URL = 'https://raw.githubusercontent.com/cfpb/hmda-platform/master/frontend/config.json'

export function fetchEnvConfig() {
  return fetch(CONFIG_URL).then(data => data.json())
}

export function findObjIndex(array, key, value) {
  let index = -1
  array.some((obj, idx) => {
    if (obj[key] === value) {
      index = idx
      return true
    }
    return false
  })
  return index
}