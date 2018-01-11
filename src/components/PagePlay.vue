<template>
  <div>
    <h2>{{ title }}</h2>

    <p>
      Play by indicating how you feel for a given pair of identities. You can submit as many pairs as you like.
    </p>

    <b-row>
      <b-col></b-col>

      <b-col sm="4">
        <b-btn
          variant="outline-success"
          size="lg"
          v-for="identity in identities"
          v-bind:key="identity.name"
          v-on:click="handleClick">{{ identity.name }}</b-btn>
      </b-col>

      <b-col sm="4">
        <h3> I am a </h3>
        <br>
        <b-btn
          variant="success"
          size="lg"
          v-on:click="winner = ''">{{ winner }}</b-btn>
        <br><br>
        <h3> first and a </h3>
        <br>
        <b-btn
          variant="success"
          size="lg"
          v-on:click="loser = ''">{{ loser }}</b-btn>
        <br><br>
        <h3> second. </h3>
      </b-col>

      <b-col></b-col>
    </b-row>

    <b-row>

      <b-col></b-col>

      <b-col sm="6">
        <b-btn
        variant="info"
        size="lg"
        v-on:click="submitPreference">Submit</b-btn>
      </b-col>

      <b-col></b-col>

    </b-row>

  </b-row>

</div>

</template>

<script>
  import { fetchIdentities, submitPreference } from '../services/server'

  export default {
    name: 'player',
    data () {
      return {
        title: 'Player',
        identities: [],
        winner: '',
        loser: '',
      }
    },
    methods: {
      handleClick: function (event) {
        let name = event.target.innerText
        if (!this.winner & this.loser != name)
          this.winner = name
        else if (!this.loser & this.winner != name)
          this.loser = name
      },
      submitPreference: function () {
        let winner = this.identities.find(el => el.name == this.winner)
        let loser = this.identities.find(el => el.name == this.loser)
        submitPreference(winner.id, loser.id)
        this.winner = this.loser = ''
      }
    },
    created () {
      fetchIdentities()
        .then(identities => this.identities = identities)
     }
  }

</script>

<style scoped>

</style>
