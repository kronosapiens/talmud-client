const store = {
  debug: process.env.NODE_ENV != 'production',
  state: {
    alert: '📖'
  },
  setAlert (newValue) {
    if (this.debug) console.log('setAlert triggered with', newValue)
      this.state.alert = newValue
  },
  clearAlert () {
    if (this.debug) console.log('clearAlert triggered')
      this.state.alert = '📖'
  }
}

export {
  store
}
