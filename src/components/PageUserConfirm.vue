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

    <b-form-group label="Confirmation Code">
      <b-form-input type="text"
      v-model="form.confCode"
      placeholder="Enter your email Confirmation Code"
      required>
    </b-form-input>
  </b-form-group>

  <b-button type="submit" variant="primary">Submit</b-button>
</b-form>

</div>
</template>

<script>

  import { submitConfirm, setJwt } from '../services/server'

  export default {
    name: 'page-user-login',
    data () {
      return {
        title: 'UserConfirm',
        form: {
          email: '',
          password: '',
        }
      }
    },
    methods: {
      onSubmit (event) {
        event.preventDefault()
        submitConfirm(this.form)
          .then(data => {
            setJwt(data.jwt)
            window.location.href = '/'
          })
      }
    }
  }
</script>
