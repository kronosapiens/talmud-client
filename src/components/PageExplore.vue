<template>
  <div>
    <h2>{{ title }}</h2>

    <h4>Similarity score: {{ cosineSimilarity }}</h4>

    <b-row>
      <b-col lg="6">
        <PageExploreGraph v-model="identitiesLeft"></PageExploreGraph>
      </b-col>

      <b-col lg="6">
        <PageExploreGraph v-model="identitiesRight"></PageExploreGraph>
      </b-col>
    </b-row>

  </div>
</template>

<script>
  import similarity from 'compute-cosine-similarity'

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
    computed: {
      cosineSimilarity: function () {
        let left = this.identitiesLeft
        let right = this.identitiesRight
        console.log([left, right])
        if ((left.length > 0) & (left.length == right.length))
          var score = similarity(left, right)
        else
          var score = 0
        return Math.round(score * 1000) / 1000
      }
    }
  }
</script>

<style>

</style>
