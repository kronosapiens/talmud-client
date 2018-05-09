<template>

  <div>
    <h1>Welcome to Talmud!</h1>

    <p>~~~</p>

    <p>
      Talmud is a collaborative art project, using math and philosophy to explore our sense of self and other.

      <br><br>

      To get started:
    </p>

    <b-row class="justify-content-center">

      <b-col lg="6">
        <b-list-group>
          <b-list-group-item v-bind:variant="loginStyle" v-bind:to="'login'">
            1. <strong>Sign in</strong>, giving us a little demographic info so we can give you an optimal experience.
          </b-list-group-item>

          <b-list-group-item v-bind:variant="playStyle" v-bind:to="'play'">
            2. <strong>Play</strong> our identity game, choosing the identities that feel the most important to you.
          </b-list-group-item>

          <b-list-group-item variant="default" v-bind:to="'explore'">
            3. <strong>Explore</strong> your identity, and see how your identity compares to others around the world.
          </b-list-group-item>
        </b-list-group>
      </b-col>

    </b-row>

  </div>

</template>

<script>

  import { store } from '../services/store'

  export default {
    name: 'page-splash',
    data () {
      return {
        title: 'PageSplash',
      }
    },
    computed: {
      loginStyle () {
        return store.state.isLoggedIn ? 'light' : 'success'
      },
      playStyle () {
        return store.state.isLoggedIn ? 'success' : 'default'
      }
    }
  }
</script>

<style scoped>

p {
  font-size:large;
}

</style>
