<template>

  <div>
    <h1>{{ msg }}</h1>
    <br>

    <div v-if="Math.random() > 0.5">
      <p>
        "<strong>Golda</strong>, you must remember that first I am an
        <b-btn variant="success" size="md">American</b-btn>
        , second I am
        <b-btn variant="success" size="md">Secretary Of State</b-btn>
        , and third I am a
        <b-btn variant="success" size="md">Jew</b-btn>
        ."
      </p>
      <br>
      <p>
        “<strong>Henry</strong>, you forget that in 🇮🇱 we read from right to left.”
      </p>
    </div>

    <div v-else>
      <p>
        "Do I contradict myself?
        <br>
        Very well then I contradict myself.
        <br>
        (I am large, I contain multitudes)"
        <br>
        -- <em> Walt Whitman </em>
      </p>
    </div>

    <div>
      <b-btn variant="info" size="lg" href="login">Sign Up</b-btn>
      <b-btn variant="info" size="lg" href="explore">Explore</b-btn>
    </div>

  </div>

</template>

<script>
  export default {
    name: 'page-splash',
    data () {
      return {
        title: 'PageSplash',
        msg: 'Welcome to Talmud!',
      }
    }
  }
</script>

<style scoped>

p {
  font-size:large;
}

</style>
