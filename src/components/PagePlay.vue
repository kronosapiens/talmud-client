<template>
  <div>
    <h2>{{ title }}</h2>

    <p>
      Play Talmud by choosing which identity is more important to you. You can play as much as you like (the more the better).
    </p>

    <p>~~~</p>

    <b-form-group>
      <b-form-radio-group
        buttons
        button-variant="outline-info"
        size="lg"
        v-model="playSelected"
        v-bind:options="playOptions"
        />
    </b-form-group>

    <PagePlayChance v-if="playSelected == 'Chance'" v-bind:identities="identities"></PagePlayChance>
    <PagePlayChoice v-else v-bind:identities="identities"></PagePlayChoice>

  </div>
</template>

<script>

  import { getUser } from '../services/server'
  import { identities, pivots } from '../services/identities'

  import PagePlayChance from './PagePlayChance.vue'
  import PagePlayChoice from './PagePlayChoice.vue'

  export default {
    name: 'page-play',
    components: {
      PagePlayChance,
      PagePlayChoice,
    },
    data () {
      return {
        title: 'Player',
        identities: [],
        playSelected: 'Chance',
        playOptions: ['Chance', 'Choice']
      }
    },
    created () {
      this.identities = this.addPivots(identities)
    },
    methods: {
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
