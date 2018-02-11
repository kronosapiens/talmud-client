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
  },
  setAlert (newValue) {
    if (this.debug) console.log('setAlert triggered with', newValue)
    this.state.alert = newValue
  },
  clearAlert () {
    if (this.debug) console.log('clearAlert triggered')
    this.state.alert = '📖'
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
