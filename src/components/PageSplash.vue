<template>

  <div>
    <h1>Welcome!</h1>

    <b-row class="justify-content-center">
      <b-col cols="10" lg="6">
        <h6>Talmud is a game of identities.</h6>

        <p>
          We are complex creatures, and we play many roles: "friend", "sibling", "partner", and more. While we are <em>all</em> of these things, we are not all of them equally. If I had to choose, would I choose my sibling over my friend? My partner over my job? Do others feel the same? These are questions we rarely ask explicitly. Talmud is a game that helps you ask these questions and understand the answers.
        </p>

        <p>~~~</p>

        <h6>To get started:</h6>

      </b-col>
    </b-row>

    <b-row class="justify-content-center">

      <b-col cols="10" lg="6">
        <b-list-group>
          <b-list-group-item v-bind:variant="loginStyle" v-bind:to="'login'">
            1. <strong>Sign in</strong>, giving us some demographic info so we can give you a great experience.
          </b-list-group-item>

          <b-list-group-item v-bind:variant="playStyle" v-bind:to="'play'">
            2. <strong>Play</strong> our identity game, choosing the identities that feel the most important to you.
          </b-list-group-item>

          <b-list-group-item variant="default" v-bind:to="'explore'">
            3. <strong>Explore</strong> your identity graph, and see how you compare to others around the world.
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
</style>
