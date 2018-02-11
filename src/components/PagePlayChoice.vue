<template>
  <div>

    <b-row>

      <b-col></b-col>

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

      <b-col></b-col>

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
        this.winner = this.loser = '...'
        if (store.state.isLoggedIn) {
          submitPreference(winner.id, loser.id)
            .then(data => store.setAlert('Preference saved successfully!'))
            .catch(error => store.setAlert('Preference save failed...'))
        } else {
          alert("Must log in to play!")
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
