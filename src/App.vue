<template>
  <div id="app">

    <Navbar v-on:navClick="changeView"></Navbar>

    <b-row v-if="view == 'talmud'">
      <b-col cols="12">
        <h1>{{ msg }}</h1>
      </b-col>
    </b-row>

    <b-row v-if="view == 'explore'">
      <b-col cols="8">
        <Graph/>
      </b-col>
      <b-col cols="4">
        <EigenList/>
      </b-col>
    </b-row>

    <b-row v-if="view == 'vote'">
      <b-col cols="12">
        <Voter/>
      </b-col>
    </b-row>

    <Footer/>

  </div>
</template>

<script>

  import Navbar from './components/Navbar.vue'
  import Footer from './components/Footer.vue'
  import EigenList from './components/EigenList.vue'
  import Graph from './components/Graph.vue'
  import Voter from './components/Voter.vue'

  export default {
    name: 'app',
    components: {
      Navbar,
      Footer,
      EigenList,
      Graph,
      Voter,
    },
    data () {
      return {
        msg: 'Welcome to Talmud!',
        view: 'talmud',
      }
    },
    methods: {
      changeView (view) {
        this.view = view
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

  div {
    border:1px solid grey
  }

  h1,a {
    color: #1aad8d;
    text-decoration: none;
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
