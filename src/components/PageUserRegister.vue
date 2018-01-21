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
  <b-form-select v-model="form.cc" v-bind:options="countries" required>
  </b-form-select>
</b-form-group>

<b-form-group label="Zip Code" v-if="form.cc == 'US'">
  <b-form-input type="number"
    v-model="form.zip"
    placeholder="For US residents, enter your ZIP">
  </b-form-input>
</b-form-group>

<h4>Optional fields</h4>

<!-- Pivots -->
<b-form-group label="Gender Identity">
  <b-form-select v-model="form.gender" v-bind:options="genderOptions">
  </b-form-select>
</b-form-group>

<b-form-group label="Religious Identity">
  <b-form-input type="text"
    v-model="form.religion"
    placeholder="Optional: enter your religious affiliation">
  </b-form-input>
</b-form-group>

<b-form-group label="Ethnic Identity">
  <b-form-input type="text"
    v-model="form.ethnicity"
    placeholder="Optional: enter your ethnicity">
  </b-form-input>
</b-form-group>

<b-form-group label="Professional Identity">
  <b-form-input type="text"
    v-model="form.job"
    placeholder="Optional: enter your job title">
  </b-form-input>
</b-form-group>

<!-- Groupings -->
<b-form-group label="Age">
  <b-form-input type="number"
    v-model="form.age"
    placeholder="Optional: enter your age (for better insights)">
  </b-form-input>
</b-form-group>

<b-form-group label="Income">
  <b-form-input type="number"
    v-model="form.income"
    placeholder="Optional: enter your rough annual income (for better insights)">
  </b-form-input>
</b-form-group>

<b-button type="submit" variant="primary">Submit</b-button>
</b-form>

</div>
</template>

<script>
  import countryData from 'country-data'

  import { submitRegistration } from '../services/server'

  export default {
    name: 'page-user-register',
    data () {
      return {
        title: 'UserRegister',
        form: {
          email: '',
          password: '',
          passwordConfirm: '',
          regCode: '',
          cc: '',
          zip: '',
          gender: '',
          religion: '',
          ethnicity: '',
          job: '',
          age: '',
          income: '',
        },
        genderOptions: ['Male', 'Female', 'Genderqueer', 'Other'],
        countries: countryData.countries.all.map(c => {
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
          submitRegistration(this.form)
          this.$router.push('/')
        }
      }
    }
  }
</script>
