<template>
  <div>
    <h2>{{ title }}</h2>

    <b-form v-on:submit="onSubmit">

      <b-form-group label="Basics 📚">
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
      <b-form-group label="Geographic Info 🌍">
        <b-form-select v-model="form.cc" v-bind:options="countries" required>
        </b-form-select>

        &nbsp
        <b-form-input type="number"
          v-if="form.cc == 'US'"
          v-model="form.zip"
          placeholder="Optional: for US residents, enter your ZIP">
        </b-form-input>
      </b-form-group>

      <br>
      <!-- Pivots -->
      <b-form-group label="Gender, Religious, Ethnic, and Professional Identity (optional) ✨">
        <b-form-select v-model="form.gender" v-bind:options="genderOptions">
        </b-form-select>

        &nbsp
        <b-form-input type="text"
          v-model="form.religion"
          placeholder="I am a... (Pastafarian, Buddhist, Jew, Protestant, etc.)">
        </b-form-input>

        <br>
        <b-form-input type="text"
          v-model="form.ethnicity"
          placeholder="I am a... (Hispanic, Caucasian, African, Mongolian, etc.)">
        </b-form-input>

        <br>
        <b-form-input type="text"
          v-model="form.job"
          placeholder="I am a... (Teacher, Artist, Doctor, Engineer, etc.)">
        </b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>

  </div>
</template>

<script>
  import countryData from 'country-data'

  import { submitRegistration, setJwt } from '../services/server'
  import { store } from '../services/store'

  export default {
    name: 'page-user-register',
    data () {
      return {
        title: 'UserRegister',
        form: {
          email: '',
          password: '',
          passwordConfirm: '',
          cc: 'US',
          zip: '',
          gender: 'Other Gender',
          religion: '',
          ethnicity: '',
          job: '',
        },
        genderOptions: ['Male', 'Female', 'Genderqueer', 'Other Gender'],
        countries: countryData.countries.all.map(c => {
          return { value: c.alpha2, text: c.name }
        }).sort((a, b) => a.text.localeCompare(b.text))
      }
    },
    methods: {
      onSubmit (event) {
        event.preventDefault()
        if (this.form.password != this.form.passwordConfirm) {
          alert('Passwords must match!')
        } else {
          submitRegistration(this.form)
            .then(data => {
              setJwt(data.jwt)
              store.setAlert('Registration success!')
              window.location.href = '/'
            })
        }
      }
    }
  }
</script>
