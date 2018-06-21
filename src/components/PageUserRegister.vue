<template>
  <div>
    <h2>{{ title }}</h2>

    <b-form v-on:submit="onSubmit">

      <b-form-group label="📚 Basics">
        <b-form-input type="email"
          v-model="form.email"
          placeholder="Enter an email"
          required>
        </b-form-input>

        <br>
        <b-form-input type="password"
          v-model="form.password"
          placeholder="Choose a password"
          required>
        </b-form-input>

        <br>
        <b-form-input type="password"
          v-model="form.passwordConfirm"
          placeholder="Enter it again ;)"
          required>
        </b-form-input>
      </b-form-group>

      <br>
      <PageUserDetails v-model="demographicsForm"></PageUserDetails>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>

  </div>
</template>

<script>
  import { submitRegistration } from '../services/server'
  import { store } from '../services/store'

  import PageUserDetails from './PageUserDetails.vue'

  export default {
    name: 'page-user-register',
    components: {
      PageUserDetails,
    },
    data () {
      return {
        title: 'UserRegister',
        form: {
          email: '',
          password: '',
          passwordConfirm: ''
        },
        demographicsForm: {}
      }
    },
    methods: {
      onSubmit (event) {
        event.preventDefault()
        if (this.form.password != this.form.passwordConfirm) {
          alert('Passwords must match!')
        } else {
          Object.assign(this.form, this.demographicsForm) // Combine forms
          store.setAlertSecondary("Submitting registration...")
          submitRegistration(this.form)
            .catch(error => store.setAlertDanger('Something went wrong :('))
            .then(data => {
              if (data.jwt) {
                store.handleLogin(data.jwt)
                store.setAlertSuccess('Registration success! 🙏')
                this.$router.push('/')
              } else {
                store.setAlertDanger(data.text + ' :(')
              }
            })
        }
      }
    }
  }
</script>
