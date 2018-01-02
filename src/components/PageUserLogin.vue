<template>
  <div>
    <h2>{{ title }}</h2>

    <b-form v-on:submit="onSubmit">

      <b-form-group label="Email">
        <b-form-input type="email"
        v-model="form.email"
        placeholder="Enter your email"
        required>
      </b-form-input>
    </b-form-group>

    <b-form-group label="Password">
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

  import { setLogin } from '../services/utils'
  import { submitLogin } from '../services/server'

  const countries = require('country-data').countries

  export default {
    name: 'userLogin',
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
        alert(JSON.stringify(this.form))
        submitLogin(this.form)
          .then(data => {
            console.log(data)
            setLogin(data.loggedIn)
            window.location.href = '/vote'
          })
      }
    }
  }
</script>
