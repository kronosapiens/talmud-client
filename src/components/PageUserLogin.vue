<template>
  <div>
    <h3>{{ title }}</h3>

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
  import { setPasswordHash, store } from '../services/store'

  export default {
    name: 'page-user-login',
    data () {
      return {
        title: 'Login',
        form: {
          email: '',
          password: '',
        }
      }
    },
    methods: {
      onSubmit (event) {
        event.preventDefault()
        store.setAlertSecondary("Logging you in...")
        setPasswordHash(this.form.password)
        submitLogin(this.form)
          .catch(error => store.setAlertDanger('Something went wrong 😭'))
          .then(data => {
            if (data.jwt) {
              store.handleLogin(data.jwt)
              store.setAlertSuccess('Login success! 🙏🏽')
              this.$router.push('/')
            } else {
              store.setAlertDanger(data.text + ' 😭')
            }
          })
      }
    }
  }
</script>
