<template>

  <b-navbar toggleable="lg" type="dark" variant="info">

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
          <b-nav-item v-if="sharedState.isLoggedIn" v-bind:to="'login'">{{ userEmail }}</b-nav-item>
          <b-nav-item v-if="sharedState.isLoggedIn" v-on:click="handleLogout()">logout</b-nav-item>
          <b-nav-item v-else v-bind:to="'login'">login</b-nav-item>
        </b-navbar-nav>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>


</template>

<script>

  import { store } from '../services/store'

  export default {
    name: 'bar-nav',
    data () {
      return {
        title: 'Navbar',
        sharedState: store.state,
        items: [
          { name: 'play' },
          { name: 'explore' },
          { name: 'about' },
        ]
      }
    },
    computed: {
      userEmail () {
        if (this.sharedState.isLoggedIn) {
          return store.getUser().email.split('@')[0]
        }
      }
    },
    methods: {
      handleLogout () {
        store.handleLogout()
        store.setAlert('See you later! 👋')
      }
    }
  }
</script>

<style scoped>

  .nav-item {
    font-size:large;
  }

</style>
