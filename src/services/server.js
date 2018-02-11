const axios = require('axios')


// General Utilities
const urlRoot = (process.env.NODE_ENV == 'production')
  ? 'http://api.talmud.ai/'
  : 'http://localhost:3000/'

function getHeader () {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    }
  }
}

function getJsonP (path) {
  console.log('getting ' + path)
  return axios.get(urlRoot + path)
    .catch(error => { console.log(error); throw error })
    .then(res => { console.log(res); return res.data })
}

function postJsonP (path, data) {
  console.log('posting ' + path + ' with ' + JSON.stringify(data))
  return axios.post(urlRoot + path, data, getHeader())
    .catch(error => {console.log(error); throw error })
    .then(res => { console.log(res); return res.data })
}

// Identity and Preference Methods

function fetchPreferences () {
  return getJsonP('preferences')
    .then(preferences => {
      return {
        nodes: unpackNodes(preferences),
        links: unpackLinks(preferences)
      }
    })
}

function unpackLinks(preferences) {
  return preferences.map(p => {
    let [sid, tid] = p.win_bit ? [p.alpha_id, p.beta_id] : [p.beta_id, p.alpha_id]
    return {
      sid: sid.toString(), // TODO: revert id to int once graph is patched.
      tid: tid.toString(),
      uid: p.user_id,
      cc: p.cc,
      zip: p.zip
    }
  })
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

function submitConfirm(form) {
  return postJsonP('confirm', form)
}

export {
  fetchIdentities,
  fetchPreferences,
  submitPreference,
  submitRegistration,
  submitLogin,
  submitConfirm
}
