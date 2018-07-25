const jsonwebtoken = require('jsonwebtoken')
const AES = require("crypto-js/aes")
const enc = require("crypto-js/enc-utf8")
const SHA256 = require("crypto-js/sha256")

const encodedIdentities = [
  'religion',
  'ethnicity',
  'job',
  'gender',
  'children',
  'siblings',
  'relationship',
  'party'
]

function setJwt (jwt) {
  let jwtStr = jwt ? jwt : '' // Deal with null and undefined
  sessionStorage.setItem('jwt', jwtStr)
  return jwtStr
}

function setPasswordHash (password) {
  let passwordHash = SHA256(password).toString()
  sessionStorage.setItem('passwordHash', passwordHash)
  return passwordHash
}

function getJwt () {
  return sessionStorage.getItem('jwt')
}

function getPasswordHash () {
  return sessionStorage.getItem('passwordHash')
}

function encodeUser (user, passwordHash) {
  const _user = JSON.parse(JSON.stringify(user))
  encodedIdentities.forEach(identity => {
    _user[identity] = AES.encrypt(_user[identity], passwordHash).toString()
  })
  return _user
}

function decodeUser (encodedUser, passwordHash) {
  const _user = JSON.parse(JSON.stringify(encodedUser))
  encodedIdentities.forEach(identity => {
    _user[identity] = AES.decrypt(_user[identity], passwordHash).toString(enc)
  })
  return _user
}

function getUser () {
  const encodedUser = jsonwebtoken.decode(getJwt())
  return encodedUser ? decodeUser(encodedUser, getPasswordHash()) : ''
}

const store = {
  debug: process.env.NODE_ENV != 'production',
  state: {
    isLoggedIn: false,
    alert: '📖',
    alertVariant: 'info'
  },
  setAlert (alert, variant = 'info') {
    if (this.debug) console.log('setAlert triggered with', alert)
    this.state.alert = alert
    this.state.alertVariant = variant
  },
  setAlertSuccess (alert) {
    this.setAlert(alert, 'success')
  },
  setAlertSecondary (alert) {
    this.setAlert(alert, 'secondary')
  },
  setAlertDanger (alert) {
    this.setAlert(alert, 'danger')
  },
  clearAlert () {
    if (this.debug) console.log('clearAlert triggered')
    this.state.alert = '📖'
    this.state.alertVariant = 'info'
  },
  handleLogin (jwt) {
    if (this.debug) console.log('Logging in!')
    this.state.isLoggedIn = true
    return setJwt(jwt)
  },
  handleLogout () {
    if (this.debug) console.log('Logging out!')
    this.state.isLoggedIn = false
    setPasswordHash('')
    setJwt('')
  },
  initialize () {
    if (getUser()) this.state.isLoggedIn = true
  }
}

export {
  encodeUser,
  getUser,
  getPasswordHash,
  setPasswordHash,
  store
}
