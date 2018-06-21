const jsonwebtoken = require('jsonwebtoken')

function setJwt (jwt) {
  let jwtStr = jwt ? jwt : '' // Deal with null and undefined
  return sessionStorage.setItem('jwt', jwtStr)
}

function getJwt () {
  return sessionStorage.getItem('jwt')
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
    return setJwt('')
  },
  getUser () {
    return jsonwebtoken.decode(getJwt())
  },
  initialize () {
    if (this.getUser()) this.state.isLoggedIn = true
  }
}

export {
  store
}
