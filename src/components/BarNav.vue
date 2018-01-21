<template>

  <b-navbar toggleable="md" type="dark" variant="info">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand v-bind:to="'/'">Talmud</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav v-for="item in items" v-bind:key="item.name">
        <b-nav-item v-bind:to="item.name">
          {{ item.name }}
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-navbar-nav right>
          <b-nav-item v-if="isLoggedIn" v-on:click="handleLogout()">logout</b-nav-item>
          <b-nav-item v-else v-bind:to="'login'">login</b-nav-item>
        </b-navbar-nav>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>


</template>

<script>

  import { fetchLogout, getJwt, setJwt } from '../services/server'

  export default {
    name: 'bar-nav',
    data () {
      return {
        title: 'Navbar',
        items: [
          { name: 'play' },
          { name: 'explore' },
          { name: 'about' },
        ]
      }
    },
    computed: {
      isLoggedIn () {
        return Boolean(getJwt())
      }
    },
    methods: {
      handleLogout () {
        setJwt('')
        window.location.href = '/'
        // this.$router.push('login')
      }
    }
  }
</script>

<style scoped>

</style>
