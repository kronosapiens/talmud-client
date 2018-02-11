<template>

  <div>
    <h1>Welcome to Talmud!</h1>
    <p>~~~</p>

    <div v-if="Math.random() > 0.7">
      <p>
        <strong>Golda</strong>, you must remember that first I am an
        <b-btn variant="success" size="md">American</b-btn>
        , second I am
        <b-btn variant="success" size="md">Secretary Of State</b-btn>
        , and third I am a
        <b-btn variant="success" size="md">Jew</b-btn>
        .
      </p>
      <br>
      <p>
        <strong>Henry</strong>, you forget that in 🇮🇱 we read from right to left.
      </p>
    </div>

    <div v-else>
      <p>
        <em>
          Do I contradict myself?
          <br>
          Very well then I contradict myself.
          <br>
          (I am large, I contain multitudes)
        </em>
        <br><br>
        -- <strong> Walt Whitman </strong>
      </p>
    </div>

    <p>~</p>

    <div>
      <b-btn v-bind:variant="loginStyle" size="lg" v-bind:to="'login'">Sign Up</b-btn>
      <b-btn v-bind:variant="playStyle" size="lg" v-bind:to="'play'">&ensp;Play&ensp;</b-btn>
      <b-btn variant="info" size="lg" v-bind:to="'explore'">Explore</b-btn>
    </div>

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
        return store.state.isLoggedIn ? 'info' : 'danger'
      },
      playStyle () {
        return store.state.isLoggedIn ? 'danger' : 'info'
      }
    }
  }
</script>

<style scoped>

p {
  font-size:large;
}

</style>
