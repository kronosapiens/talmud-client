<template>
  <div>
    <h2>{{ title }}</h2>

    <b-form v-on:submit="onSubmit">

      <b-form-group label="Email">
        <b-form-input type="email"
        v-model="form.email"
        placeholder="Enter an email"
        required>
      </b-form-input>
    </b-form-group>

    <b-form-group label="Password">
      <b-form-input type="password"
      v-model="form.password"
      placeholder="Choose a password"
      required>
    </b-form-input>
  </b-form-group>

  <b-form-group label="Confirm Password">
    <b-form-input type="password"
    v-model="form.passwordConfirm"
    placeholder="Enter it again ;)"
    required>
  </b-form-input>
</b-form-group>

<b-form-group label="Registration Code">
  <b-form-input type="text"
  v-model="form.regCode"
  placeholder="Enter your registration code"
  required>
</b-form-input>
</b-form-group>

<b-form-group label="Country">
  <b-form-select v-model="form.cc" :options="countries" required>
  </b-form-select>
</b-form-group>

<b-form-group label="Zip Code" v-if="form.cc == 'US'">
  <b-form-input type="number"
  v-model="form.zip"
  placeholder="For US residents, enter your ZIP">
</b-form-input>
</b-form-group>

<b-button type="submit" variant="primary">Submit</b-button>
</b-form>

</div>
</template>

<script>

  import { submitRegistration } from '../services/server'

  const countries = require('country-data').countries

  export default {
    name: 'userRegister',
    data () {
      return {
        title: 'UserRegister',
        form: {
          email: '',
          password: '',
          passwordConfirm: '',
          cc: '',
          zip: '',
          regCode: '',
        },
        countries: countries.all.map(c => {
          return { value: c.alpha2, text: c.name }
        }).sort((a, b) => a.text.localeCompare(b.text))
      }
    },
    methods: {
      onSubmit (event) {
        event.preventDefault();
        if (this.form.password != this.form.passwordConfirm) {
          alert('Passwords must match!')
        } else {
          alert(JSON.stringify(this.form))
          submitRegistration(this.form)
        }
      }
    }
  }
</script>
