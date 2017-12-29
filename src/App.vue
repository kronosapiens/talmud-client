<template>
  <div id="app" class="container-fluid">
    <Navbar/>

    <h1>{{ msg }}</h1>

    <div class="row">
      <div class="col-8">
        <Graph/>
      </div>
      <div class="col-4">
        <EigenList/>
      </div>
    </div>

    <Footer/>

  </div>
</template>

<script>

  import Navbar from './components/Navbar.vue'
  import Footer from './components/Footer.vue'
  import EigenList from './components/EigenList.vue'
  import Graph from './components/Graph.vue'

  export default {
    name: 'app',
    components: {
      Navbar,
      Footer,
      EigenList,
      Graph
    },
    data () {
      return {
        msg: 'Welcome to Talmud!',
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
