// Browser storage

function setJwt(jwt) {
  let jwtStr = jwt ? jwt : '' // Deal with null and undefined
  return sessionStorage.setItem('jwt', jwtStr)
}

function getJwt() {
  return sessionStorage.getItem('jwt')
}

// General Utilities

const urlRoot = 'http://localhost:3000/'

function makePostParams (dataObject) {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getJwt()
    },
    body: JSON.stringify(dataObject)
  }
}

function getJsonP (path) {
  console.log('getting ' + path)
  return fetch(urlRoot + path)
    .then(response => response.json())
    .then(data => { console.log(data); return data })
}

function postJsonP (path, dataObject) {
  console.log('posting ' + path + ' with ' + JSON.stringify(dataObject))
  let params = makePostParams(dataObject)
  return fetch(urlRoot + path, params)
    .then(response => response.json())
    .then(data => { console.log(data); return data })
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
    p.win_bit ? { sid: p.alpha_id, tid: p.beta_id } : { sid: p.beta_id, tid: p.alpha_id }
    )
}

function unpackNodes(preferences) {
  const nodeSet = new Set()
  preferences.forEach(p => { nodeSet.add(p.alpha_id); nodeSet.add(p.beta_id) })
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

export {
  fetchIdentities,
  fetchPreferences,
  submitPreference,
  submitRegistration,
  submitLogin,
  getJwt,
  setJwt
}
