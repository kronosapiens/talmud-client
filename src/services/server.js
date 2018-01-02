// General Utilities

const urlRoot = 'http://localhost:3000/'

function makePostParams (dataObject) {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataObject)
  }
}

function parse(response) {
  let data = response.json()
  console.log(data)
  return data
}

function getJsonP (path) {
  console.log('getting ' + path)
  return fetch(urlRoot + path)
  .then(response => parse(response))
}

function postJsonP (path, dataObject) {
  console.log('posting ' + path + ' with ' + JSON.stringify(dataObject))
  let params = makePostParams(dataObject)
  return fetch(urlRoot + path, params)
  .then(response => parse(response))
}

// Identity and Preference Methods

function fetchIdentities () {
  return getJsonP('identities')
  .then(identities => unpackIdentities(identities))
}

function fetchPreferences () {
  return getJsonP('preferences')
  .then(preferences => {
    return {
      nodes: unpackNodes(preferences),
      links: unpackLinks(preferences)
    }
  })
}

function unpackIdentities(identities) {
  return identities.map(identity => {
    return {id: identity.id, name: identity.name, value: identity.id}
  })
}

function unpackLinks(preferences) {
  return preferences.map(p =>
    p.winner ? { sid: p.a_id, tid: p.b_id } : { sid: p.b_id, tid: p.a_id }
    )
}

function unpackNodes(preferences) {
  const nodeSet = new Set()
  preferences.forEach(p => { nodeSet.add(p.a_id); nodeSet.add(p.b_id) })
  return Array.from(nodeSet).map(x => { return { id: x } })
}

function submitPreference(winner, loser) {
  return postJsonP('preferences', { winner: winner, loser: loser })
}

// Registration and Login Methods

function submitRegistration(form) {
  return postJsonP('register', form)
}

function submitLogin(form) {
  return postJsonP('login', form)
}

function fetchLogout() {
  return getJsonP('logout')
}

export {
  fetchIdentities,
  fetchPreferences,
  submitPreference,
  submitRegistration,
  submitLogin,
  fetchLogout
}
