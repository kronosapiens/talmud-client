<template>
  <div>
    <h2>{{ title }}</h2>
    <b-table striped hover :items="identities"></b-table>
  </div>
</template>

<script>

  import { fetchIdentities } from '../services/server'

  export default {
    name: 'eigen-list',
    data () {
      return {
        title: 'EigenList',
        identities: []
      }
    },
    created () { fetchIdentities(this) }
  }
</script>

<style>

</style>
