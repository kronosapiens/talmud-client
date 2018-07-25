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

    <b-row class="justify-content-center">
      <b-col cols="10" lg="6">

        <p>
          Pick the identity which feels more important to you.
          <br>
          You can play as much as you like (the more the better).
        </p>

        <p>{{ exploreNudge }}</p>

      </b-col>
    </b-row>

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

  import { getUser, store } from '../services/store'
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
      if (store.state.isLoggedIn) {
        this.identities = this.addPivots(identities)
      } else {
        this.identities = identities
      }
    },
    methods: {
      addPivots: function(identities) {
        let user = getUser()
        let identitiesCopy = JSON.parse(JSON.stringify(identities))
        identitiesCopy
          .forEach(el => { el.name = el.pivot ? pivots[el.id](user) : el.name })
        return identitiesCopy.filter(el => el.name)
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
