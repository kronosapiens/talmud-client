<template>
  <div>

    <b-form-group>
      <b-form-radio-group
        buttons
        button-variant="outline-info"
        size="md"
        v-model="playSelected"
        v-bind:options="playOptions"
        />
    </b-form-group>

    <p>
      Play Talmud by choosing which identity is more important to you. You can play as much as you like (the more the better).
    </p>

    <p>{{ exploreNudge }}</p>

    <PagePlayChance
      v-if="playSelected == 'Chance'"
      v-bind:identities="identities"
      v-model="numVotes"
      ></PagePlayChance>

    <PagePlayChoice
      v-else
      v-bind:identities="identities"
      v-model="numVotes"
      ></PagePlayChoice>

  </div>

</template>

<script>

  import { store } from '../services/store'
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
        playOptions: ['Chance', 'Choice'],
        numVotes: 0,
      }
    },
    created () {
      store.clearAlert()
      this.identities = this.addPivots(identities)
    },
    methods: {
      addPivots: function(identities) {
        let user = store.getUser()
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
    },
    computed: {
      exploreNudge: function () {
        if (this.numVotes > (process.env.NUM_EXPLORE_PUSH || 7)) {
          this.$router.push('/explore')
        } else if (this.numVotes > (process.env.NUM_EXPLORE_ALERT || 3)) {
          store.setAlert('Great job! Time to <strong>explore</strong>.')
        }
        return '~~~'
      }
    }
  }

</script>

<style scoped>

</style>
