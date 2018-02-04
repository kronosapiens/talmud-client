<template>
  <div>

    <b-row>

      <b-col></b-col>

      <b-col sm="3">
        <b-btn
          variant="success"
          class="btn-luck"
          v-bind:block="true"
          v-on:click="alphaWinner">{{ alpha.name }}</b-btn>
      </b-col>

      <br><br><br><br><br>

      <b-col sm="3">
        <b-btn
          variant="success"
          class="btn-luck"
          v-bind:block="true"
          v-on:click="betaWinner">{{ beta.name }}</b-btn>
      </b-col>

      <b-col></b-col>

    </b-row>
      
    <b-row>
      <b-col></b-col>
      
      <b-col sm="2">
      <hr>
        <b-btn
          size="lg"
          v-on:click="resetOptions">Unsure!</b-btn> 
      </b-col>

      <b-col></b-col>
    </b-row>

  </div>

</template>

<script>
  import { submitPreference, getUser } from '../services/server'
  import { store } from '../services/store'

  export default {
    name: 'page-play-chance',
    props: ['identities'],
    data () {
      return {
        title: 'PlayerChance',
        alpha: {},
        beta: {},
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
        if (getUser()) {
          submitPreference(winner.id, loser.id)
            .then(data => this.resetOptions())
        } else {
          alert("Must log in to play!")
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
