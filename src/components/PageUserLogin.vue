<template>
  <div>
    <h2>{{ title }}</h2>

    <b-form v-on:submit="onSubmit">

      <b-form-group label="🌞 Welcome">
        <b-form-input type="email"
        v-model="form.email"
        placeholder="Enter your email"
        required>
      </b-form-input>

      <br>
      <b-form-input type="password"
      v-model="form.password"
      placeholder="Enter your password"
      required>
    </b-form-input>
  </b-form-group>

  <b-button type="submit" variant="primary">Submit</b-button>
</b-form>

</div>
</template>

<script>

  import { submitLogin } from '../services/server'
  import { store } from '../services/store'

  export default {
    name: 'page-user-login',
    data () {
      return {
        title: 'UserLogin',
        form: {
          email: '',
          password: '',
        }
      }
    },
    methods: {
      onSubmit (event) {
        event.preventDefault()
        submitLogin(this.form)
          .catch(error => store.setAlert('Something went wrong :('))
          .then(data => {
            if (data.jwt) {
              store.handleLogin(data.jwt)
              store.setAlert('Login success! 🙏')
            } else {
              store.setAlert(data.text + ' :(')
            }
          })
        this.$router.push('/')
      }
    }
  }
</script>
