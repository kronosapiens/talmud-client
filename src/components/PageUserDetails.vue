<template>
  <div>

      <b-form-group label="🌍 Geographic Info">
        <b-form-select v-model="form.cc" v-bind:options="countries" required>
        </b-form-select>

        &nbsp
        <b-form-input type="number"
          v-if="form.cc == 'US'"
          v-model="form.zip"
          placeholder="Optional: enter your ZIP">
        </b-form-input>
      </b-form-group>

      <br>
      <!-- Pivots -->
      <b-form-group label="✨ Demographic Identities (optional)">
        <p>🔒This optional information is used to customize your experience, and is encrypted with <em>your</em> password. It is not used for analytics, and no one, <em>not even us</em>, can ever see it.</p>
        <b-form-select v-model="form.gender" v-bind:options="genderOptions">
        </b-form-select>

        &nbsp
        <b-form-select v-model="form.relationship" v-bind:options="relationshipOptions">
        </b-form-select>

        &nbsp
        <b-form-select v-model="form.siblings" v-bind:options="siblingsOptions">
        </b-form-select>

        &nbsp
        <b-form-select v-model="form.children" v-bind:options="childrenOptions">
        </b-form-select>

        &nbsp
        <b-form-input type="text"
          v-model="form.religion"
          placeholder="Religious identity (i.e. Pastafarian, Buddhist, Jew)">
        </b-form-input>

        <br>
        <b-form-input type="text"
          v-model="form.ethnicity"
          placeholder="Ethnic identity (i.e. Hispanic, Caucasian, African)">
        </b-form-input>

        <br>
        <b-form-input type="text"
          v-model="form.job"
          placeholder="Professional identity (i.e. Teacher, Artist, Doctor)">
        </b-form-input>

        <br>
        <b-form-input type="text"
          v-model="form.party"
          placeholder="Political identity (i.e. Liberal, Moderate, Conservative)">
        </b-form-input>
      </b-form-group>

  </div>
</template>

<script>
  import countryData from 'country-data'

  import { getUser, store } from '../services/store'

  export default {
    name: 'page-user-details',
    data () {
      return {
        title: 'UserDetails',
        form: {
          cc: 'US',
          zip: '',
          gender: 'Other Gender',
          relationship: 'Single',
          siblings: 'No Siblings',
          children: 'No Kids',
          religion: '',
          ethnicity: '',
          job: '',
          party: '',
        },
        genderOptions: ['Female', 'Male', 'Genderqueer', 'Other Gender'],
        relationshipOptions: ['Single', 'In a Relationship', 'Married', 'It\'s Complicated'],
        siblingsOptions: ['Siblings', 'No Siblings'],
        childrenOptions: ['Kids', 'No Kids'],
        countries: countryData.countries.all.map(c => {
          return { value: c.alpha2, text: c.name }
        }).sort((a, b) => a.text.localeCompare(b.text))
      }
    },
    created () {
      let user = getUser()
      if (user) {
        this.form = user
      }
      this.$emit('input', this.form)
    },
    watch: {
      form: {
        handler: function () {
          this.$emit('input', this.form)
        },
        deep: true
      }
    }
  }
</script>
