<template>
  <div>

    <h6>
      Talmud is a collaborative art project, using math and philosophy to explore our sense of self and other.
    </h6>

    <p>
      You can learn about the background and motivations
      <a href="http://kronosapiens.github.io/blog/2018/02/08/introducing-talmud.html">here</a>
      and
      <a href="http://kronosapiens.github.io/blog/2016/01/11/blockchain-as-talmud.html">here</a>
      .
    </p>

    <p>~</p>

    <h6>
      Frequently asked questions:
    </h6>
    <br>
    <b-row>
      <b-col></b-col>
      <b-col cols="*" sm="9" md="6">
        <p><strong>What is the graph in <em>explore</em>? </strong> The graph is the aggregation of all of the individual preferences. An arrow pointing A ← B means that A is more important than B.</p>

        <p><strong>What is the percentage under <em>share</em>? </strong> The percentage is the relative importance of that identity. The percentage is calculated from all of the indvidual preferences using a classic machine learning algorithm, <em>power iteration</em>.</p>

        <p><strong>What is the <em>similarity score</em>? </strong> This score, which goes from 1 to -1, shows how similar the two graphs are. 1 means they are identical, 0 means they are unrelated, and -1 means they are opposite. It is calculated using the <em>dot product</em>.</p>
      </b-col>
      <b-col></b-col>
    </b-row>

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
        <strong>Henry</strong>, you forget that in 🇮🇱 we read from thgir ot tfel.
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
  import { store } from '../services/store'

  export default {
    name: 'page-about',
    data () {
      return {
        title: 'About'
      }
    },
    created () {
      store.clearAlert()
    }
  }
</script>

<style>

</style>
