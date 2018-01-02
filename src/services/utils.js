function setLogin(boolean) {
  console.log('Setting login bit to ' + boolean)
  return sessionStorage.setItem('loggedIn', boolean)
}

function getLogin() {
  return JSON.parse(sessionStorage.getItem('loggedIn'))
}

export {
  setLogin,
  getLogin
}
