<template>
  <div>
    <h2>{{ title }}</h2>

    <p>
      Play by indicating how you feel for a given pair of identities. You can submit as many pairs as you like (the more the better).
    </p>

    <p>~~~</p>

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
  import { store } from '../services/store'

  export default {
    name: 'page-play',
    data () {
      return {
        title: 'Player',
        identities: [],
        winner: '...',
        loser: '...',
      }
    },
    created () {
      this.identities = this.addPivots(identities)
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
        if (getUser()) {
          submitPreference(winner.id, loser.id)
            .then(data => store.setAlert('Preference saved successfully!'))
            .catch(error => store.setAlert('Preference save failed...'))
        } else {
          store.setAlert('Must log in to play!')
        }
      },
      addPivots: function(identities) {
        let user = getUser()
        if (!user) {
          return identities
        } else {
          let malePivots = pivots.malePivots
          let femalePivots = pivots.femalePivots
          let identitiesCopy = JSON.parse(JSON.stringify(identities))
          return identitiesCopy.map(el => {
            if (el.pivot && user[el.pivot]) {
              if (el.pivot == 'gender') {
                let userGender = user.gender.toLowerCase()
                if (Object.keys(pivots).includes(userGender)) {
                  el.name = pivots[userGender].get(el.id)
                }
              } else {
                el.name = user[el.pivot]
              }
            }
            return el
          })
        }
      }
    }
  }

</script>

<style scoped>

</style>
