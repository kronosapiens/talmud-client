<template>
  <div id="app">

    <BarNav v-on:navClick="changeView"></BarNav>

    <div v-if="view == 'talmud'">
      <h1>{{ msg }}</h1>
      <br>
      <p>
        “Golda, you must remember that first I am an American, second I am Secretary Of State, and third I am a Jew.”
      </p><br>
      <p>
        “Henry, you forget that in Israel we read from right to left.”
      </p>
    </div>

    <div v-if="view == 'explore'">
      <PageExplore/>
    </div>

    <div v-if="view == 'vote'">
      <PageVote/>
    </div>

    <div v-if="view == 'login'">
      <PageUser/>
    </div>

    <BarFooter/>

  </div>
</template>

<script>

  import BarNav from './components/BarNav.vue'
  import BarFooter from './components/BarFooter.vue'
  import PageExplore from './components/PageExplore.vue'
  import PageVote from './components/PageVote.vue'
  import PageUser from './components/PageUser.vue'

  export default {
    name: 'app',
    components: {
      BarNav,
      BarFooter,
      PageExplore,
      PageVote,
      PageUser,
    },
    data () {
      return {
        msg: 'Welcome to Talmud!',
        view: 'login',
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
  div {
    border:1px solid grey
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
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
