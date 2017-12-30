<template>
  <div id="app">

    <Navbar v-on:navClick="changeView"></Navbar>

    <div v-if="view == 'talmud'">
      <h1>{{ msg }}</h1>
    </div>

    <div v-if="view == 'explore'">
      <Explore/>
    </div>

    <div v-if="view == 'vote'">
      <Voter/>
    </div>

    <Footer/>

  </div>
</template>

<script>

  import Navbar from './components/Navbar.vue'
  import Footer from './components/Footer.vue'
  import Explore from './components/Explore.vue'
  import Voter from './components/Voter.vue'

  export default {
    name: 'app',
    components: {
      Navbar,
      Footer,
      Explore,
      Voter,
    },
    data () {
      return {
        msg: 'Welcome to Talmud!',
        view: 'explore',
      }
    },
    methods: {
      changeView (view) {
        this.view = view.toLowerCase()
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
