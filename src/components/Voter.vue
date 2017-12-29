<template>
  <div>
    <h2>{{ title }}</h2>

    <b-row>
      <b-col cols="6">
        <h3> I am a </h3><br>
        <h2>blank</h2><br>
        <h3> first and a </h3><br>
        <h2>blank</h2><br>
        <h3> second. </h3>
      </b-col>
      <b-col cols="6">
        <b-btn variant="outline-success" size="lg" v-for="identity in identities" :key="identity.name">
          {{ identity.name }}
        </b-btn>
      </b-col>
    </b-row>

  </div>

</template>

<script>
  import { fetchIdentities } from '../services/server'

  export default {
    name: 'voter',
    data () {
      return {
        title: 'Voter',
        identities: []
      }
    },
    created () { fetchIdentities(this) }
  }

</script>

<style>

</style>
