<template>
  <div>
    <h2>{{ title }}</h2>

    <p>
      Talmud is a collaborative art project, using math and philosophy to explore our sense of self and other.
    </p>

    <p>
      You can learn about the background and motivations
      <a href="http://kronosapiens.github.io/blog/2018/02/08/introducing-talmud.html">here</a>
      and
      <a href="http://kronosapiens.github.io/blog/2016/01/11/blockchain-as-talmud.html">here</a>
      .
    </p>

    <p>~</p>

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

  </div>
</template>

<script>

  export default {
    name: 'page-about',
    data () {
      return {
        title: 'About'
      }
    }
  }
</script>

<style>

</style>
