<template>

  <b-table striped hover :items="identities"></b-table>

</template>

<script>

  function unpackIdentities(identities) {
    return identities.map(identity => {
      return {name: identity.name, weight: 10 - identity.id}
    })
  }

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
        .then(identities => {
          this.identities = unpackIdentities(identities)
        })
    }
  }
</script>

<style>

</style>
