<template>

  <div>
    <h1>{{ msg }}</h1>
    <br>
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

</template>

<script>
  export default {
    name: 'pageSplash',
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
