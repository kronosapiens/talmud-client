<template>
  <div>
    <h2>{{ title }}</h2>
    <b-row>

      <b-col lg="6">
        <PageExploreGraph/>
      </b-col>

      <b-col lg="6">
        <PageExploreGraph/>
      </b-col>

    </b-row>
  </div>
</template>

<script>

  import PageExploreGraph from './PageExploreGraph.vue'

  export default {
    name: 'explorer',
    components: {
      PageExploreGraph,
    },
    data () {
      return {
        title: 'Explorer'
      }
    }
  }
</script>

<style>

</style>
