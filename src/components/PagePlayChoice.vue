<template>
  <div>

    <b-row class="justify-content-center">

      <b-col sm="4">
        <h3> I am a </h3>
        <br>
        <b-btn
          variant="success"
          size="lg"
          v-on:click="winner = '...'">{{ winner }}</b-btn>
        <br><br>
        <h3> before I am a </h3>
        <br>
        <b-btn
          variant="success"
          size="lg"
          v-on:click="loser = '...'">{{ loser }}</b-btn>
        <br><br>
        <h3>~</h3>
      </b-col>

      <b-col sm="4">
        <b-btn
          variant="outline-success"
          size="lg"
          class="btn-choice"
          v-for="identity in identities"
          v-bind:key="identity.name"
          v-on:click="handleClick">{{ identity.name }}</b-btn>

        <hr>

        <b-btn
        variant="info"
        size="lg"
        v-on:click="submitPreference">Submit</b-btn>
      </b-col>

    </b-row>

  </b-row>

</div>

</template>

<script>
  import { submitPreference } from '../services/server'
  import { store } from '../services/store'

  export default {
    name: 'page-play-choice',
    props: ['identities'],
    data () {
      return {
        title: 'PlayerChoice',
        winner: '...',
        loser: '...',
        numVotes: 0,
      }
    },
    methods: {
      handleClick: function (event) {
        let name = event.target.innerText
        if (this.winner == '...' & this.loser != name)
          this.winner = name
        else if (this.loser == '...' & this.winner != name)
          this.loser = name
      },
      submitPreference: function () {
        let winner = this.identities.find(el => el.name == this.winner)
        let loser = this.identities.find(el => el.name == this.loser)
        if (store.state.isLoggedIn) {
          store.setAlertSecondary("Submitting preference...")
          submitPreference(winner.id, loser.id)
            .then(data => {
              this.winner = this.loser = '...'
              store.setAlertSuccess('Preference saved successfully!')
              this.$emit('input', this.numVotes += 1)
            })
            .catch(error => store.setAlertDanger('Preference save failed...'))
        } else {
          store.setAlertDanger('Must log in to play! ✋🏽')
        }
      }
    }
  }

</script>

<style scoped>

  .btn-choice {
    margin:5px;
  }

</style>
