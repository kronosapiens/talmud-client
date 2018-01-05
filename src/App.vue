<template>
  <div id="app">

    <BarNav/>

    <b-alert show>{{ alert }}</b-alert>

    <div v-if="route == '/'">
      <PageSplash/>
    </div>

    <div v-else-if="route == '/explore'">
      <PageExplore/>
    </div>

    <div v-else-if="route == '/play'">
      <PagePlay/>
    </div>

    <div v-else-if="route == '/about'">
      <PageAbout/>
    </div>

    <div v-else-if="route == '/login'">
      <PageUser/>
    </div>

    <div v-else>
      <h1>404</h1>
    </div>


    <BarFooter/>

  </div>
</template>

<script>

  import BarNav from './components/BarNav.vue'
  import BarFooter from './components/BarFooter.vue'
  import PageAbout from './components/PageAbout.vue'
  import PageExplore from './components/PageExplore.vue'
  import PagePlay from './components/PagePlay.vue'
  import PageUser from './components/PageUser.vue'
  import PageSplash from './components/PageSplash.vue'

  import { getJwt } from './services/server'

  export default {
    name: 'app',
    props: ['route'],
    components: {
      BarNav,
      BarFooter,
      PageAbout,
      PageExplore,
      PagePlay,
      PageUser,
      PageSplash,
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
