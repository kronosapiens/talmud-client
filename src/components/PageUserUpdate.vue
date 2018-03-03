<template>
  <div>
    <h2>{{ title }}</h2>

    <b-form v-on:submit="onSubmit">

      <br>
      <b-form-group label="🌍 Geographic Info">
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
      <b-form-group label="✨ Demographic Identities (optional)">
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

  import { submitUpdate } from '../services/server'
  import { store } from '../services/store'

  export default {
    name: 'page-user-update',
    data () {
      return {
        title: 'UserUpdate',
        form: {},
        genderOptions: ['Female', 'Male', 'Genderqueer', 'Other Gender'],
        countries: countryData.countries.all.map(c => {
          return { value: c.alpha2, text: c.name }
        }).sort((a, b) => a.text.localeCompare(b.text))
      }
    },
    created () {
      this.form = store.getUser()
    },
    methods: {
      onSubmit (event) {
        submitUpdate(this.form)
          .catch(error => store.setAlert('Something went wrong :('))
          .then(data => {
            if (data.jwt) {
              store.handleLogin(data.jwt)
              store.setAlert('Information updated! 🙏')
            } else {
              store.setAlert(data.text + ' :(')
            }
          })
        this.$router.push('/')
      }
    }
  }
</script>
