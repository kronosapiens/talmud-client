<template>
  <div>

    <b-row class="justify-content-center">

      <b-col md="5" lg="3">
        <b-btn
          variant="success"
          class="btn-luck mb-1"
          v-bind:block="true"
          v-on:click="alphaWinner">{{ alpha.name }}</b-btn>
      </b-col>

      <br><br><br><br><br>

      <b-col md="5" lg="3">
        <b-btn
          variant="success"
          class="btn-luck"
          v-bind:block="true"
          v-on:click="betaWinner">{{ beta.name }}</b-btn>
      </b-col>

    </b-row>

    <b-row class="justify-content-center">

      <b-col sm="2">
      <hr>
        <b-btn
          size="lg"
          v-on:click="resetOptions">Unsure!</b-btn>
      </b-col>

    </b-row>

  </div>

</template>

<script>
  import { submitPreference } from '../services/server'
  import { store } from '../services/store'

  export default {
    name: 'page-play-chance',
    props: ['identities'],
    data () {
      return {
        title: 'PlayerChance',
        alpha: {},
        beta: {},
        numVotes: 0,
      }
    },
    methods: {
      resetOptions: function () {
        var alphaIdx, betaIdx
        alphaIdx = betaIdx = Math.floor(Math.random() * this.identities.length)
        while (alphaIdx == betaIdx) {
          betaIdx = Math.floor(Math.random() * this.identities.length)
        }
        this.alpha = this.identities[alphaIdx]
        this.beta = this.identities[betaIdx]
      },
      handleWinner: function (winner, loser) {
        if (store.state.isLoggedIn) {
          store.setAlertSecondary("Submitting preference...")
          submitPreference(winner.id, loser.id)
            .then(data => {
              this.resetOptions()
              store.setAlertSuccess('Preference saved successfully!')
              this.$emit('input', this.numVotes += 1)
            })
        } else {
          store.setAlertDanger('Must log in to play! ✋🏽')
        }
      },
      alphaWinner: function () {
        this.handleWinner(this.alpha, this.beta)
      },
      betaWinner: function () {
        this.handleWinner(this.beta, this.alpha)
      },
    },
    created () {
      this.resetOptions()
    }
  }

</script>

<style scoped>

  .btn-luck {
    font-size:36px;
    padding:32px;
  }

</style>
