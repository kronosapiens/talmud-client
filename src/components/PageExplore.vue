<template>
  <div>
    <h2>{{ title }}</h2>

    <h5>Similarity score: {{ cosineSimilarity }}</h5>

    <b-row>
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
    created () {
      store.clearAlert()
    },
    computed: {
      cosineSimilarity: function () {
        let left = this.identitiesLeft
        let right = this.identitiesRight
        if ((left.length > 0) & (left.length == right.length))
          var score = similarity(left, right)
        else
          var score = 0
        return Math.round(score * 1000) / 1000
      },
      leftInitialSelected: function () {
        return store.state.isLoggedIn ? 'me' : 'world'
      }
    }
  }
</script>

<style>

</style>
