<template>
  <div id="app">

    <BarNav/>

    <b-alert show>{{ alert }}</b-alert>

    <router-view v-model="alert"></router-view>

    <BarFooter/>

  </div>
</template>

<script>

  import BarNav from './components/BarNav.vue'
  import BarFooter from './components/BarFooter.vue'

  import { getJwt } from './services/server'

  export default {
    name: 'app',
    components: {
      BarNav,
      BarFooter,
    },
    data () {
      return {
        alert: 'Jwt: ' + getJwt()
      }
    }
  }
</script>

<style>
  div {
    border:1px solid grey
  }

  html {
    position: relative;
    min-height: 100%;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  h1,a {
    font-family: Garamond, Times, serif;
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
