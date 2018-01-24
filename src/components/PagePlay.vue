<template>
  <div>
    <h2>{{ title }}</h2>

    <p>
      Play by indicating how you feel for a given pair of identities. You can submit as many pairs as you like (the more the better).
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
  import { submitPreference, getUser } from '../services/server'
  import { identities, pivots } from '../services/identities'

  export default {
    name: 'page-play',
    data () {
      return {
        title: 'Player',
        identities: [],
        winner: '',
        loser: '',
      }
    },
    created () {
      this.identities = this.addPivots(identities)
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
        this.winner = this.loser = ''
        if (getUser()) {
          submitPreference(winner.id, loser.id)
            .then(data => this.$emit('input', 'Preference saved successfully!'))
            .catch(error => this.$emit('input', 'Preference save failed...'))
        } else {
          this.$emit('input', 'Must log in to play!')
        }
      },
      addPivots: function(identities) {
        let user = getUser()
        if (!user) {
          return identities
        } else {
          let malePivots = pivots.malePivots
          let femalePivots = pivots.femalePivots
          return identities.map(el => {
            if (el.pivot && user[el.pivot]) {
              if (el.pivot == 'gender') {
                if (Object.keys(pivots).includes(user.gender)) {
                  el.name = pivots[user.gender.toLowerCase()].get(el.id)
                }
              } else {
                el.name = user[el.pivot]
              }
              return el
            } else {
              return el
            }
          })
        }
      }
    }
  }

</script>

<style scoped>

</style>
