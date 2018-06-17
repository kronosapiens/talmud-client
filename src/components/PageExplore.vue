<template>
  <div>

    <b-row no-gutters>
      <b-col lg="6">
        <PageExploreGraph
          v-model="identitiesLeft"
          v-bind:initialSelected="leftInitialSelected"
          ></PageExploreGraph>
      </b-col>

      <b-col lg="6">
        <PageExploreGraph
          v-model="identitiesRight"
          initialSelected="world"
          ></PageExploreGraph>
      </b-col>
    </b-row>

  </div>
</template>

<script>
  import similarity from 'compute-cosine-similarity'

  import { store } from '../services/store'

  import PageExploreGraph from './PageExploreGraph.vue'

  export default {
    name: 'page-explore',
    components: {
      PageExploreGraph,
    },
    data () {
      return {
        title: 'Explorer',
        identitiesLeft: [],
        identitiesRight: []
      }
    },
    methods: {
      cosineSimilarity: function () {
        let left = this.identitiesLeft
        let right = this.identitiesRight
        if ((left.length > 0) & (left.length == right.length))
          var score = similarity(left, right)
        else
          var score = 0
        let displayScore = Math.round(score * 100) / 100
        store.setAlert("Similarity score: " + displayScore.toString())
      }
    },
    computed: {
      leftInitialSelected: function () {
        return store.state.isLoggedIn ? 'me' : 'world'
      }
    },
    watch: {
      identitiesLeft: function () {
        this.cosineSimilarity()
      },
      identitiesRight: function () {
        this.cosineSimilarity()
      }
    }
  }
</script>

<style>

</style>
