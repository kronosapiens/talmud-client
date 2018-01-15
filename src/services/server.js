const axios = require('axios')
const jsonwebtoken = require('jsonwebtoken')

// Browser storage

function setJwt (jwt) {
  let jwtStr = jwt ? jwt : '' // Deal with null and undefined
  return sessionStorage.setItem('jwt', jwtStr)
}

function getJwt () {
  return sessionStorage.getItem('jwt')
}

function getUser () {
  return jsonwebtoken.decode(getJwt())
}

// General Utilities

const urlRoot = 'http://localhost:3000/'

function getHeader () {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getJwt()
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
  return preferences.map(p => {
    let [sid, tid] = p.win_bit ? [p.alpha_id, p.beta_id] : [p.beta_id, p.alpha_id]
    return {
      sid: sid,
      tid: tid,
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

export {
  fetchIdentities,
  fetchPreferences,
  submitPreference,
  submitRegistration,
  submitLogin,
  getJwt,
  setJwt,
  getUser
}
