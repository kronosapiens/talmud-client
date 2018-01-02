<template>

  <b-navbar toggleable="md" type="dark" variant="info">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="/">Talmud</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav v-for="item in items" :key="item.name">
        <b-nav-item v-bind:href="item.name">
          {{ item.name }}
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-navbar-nav right>
          <b-nav-item v-if="!getLogin()" href="login">login</b-nav-item>
          <b-nav-item v-else v-on:click="handleLogout()">logout</b-nav-item>
        </b-navbar-nav>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>


</template>

<script>

  import { setLogin, getLogin } from '../services/utils'
  import { fetchLogout } from '../services/server'

  export default {
    name: 'navbar',
    data () {
      return {
        items: [
          { name: 'explore' },
          { name: 'vote' }
        ]
      }
    },
    methods: {
      getLogin () {
        return getLogin()
      },
      handleLogout () {
        return fetchLogout()
          .then(data => {
            console.log(data)
            setLogin(data.loggedIn)
            window.location.href = '/login'
          })
      }
    }
  }
</script>

<style scoped>

</style>
