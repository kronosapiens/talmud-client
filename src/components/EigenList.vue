<template>

  <b-table striped hover :items="identities"></b-table>

</template>

<script>
  export default {
    name: 'eigen-list',
    data () {
      return {
        title: 'EigenList',
        identities: []
      }
    },
    created () {
      fetch('http://localhost:3000/identities')
        .then(response => response.json())
        .then(identities => { this.identities = identities })
    }
  }
</script>

<style>

</style>
