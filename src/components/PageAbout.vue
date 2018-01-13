<template>
  <div>
    <h2>{{ title }}</h2>

    <p>
      Talmud is a collaborative art project, using math and philosophy to explore our sense of self and other.
    </p>

    <p>
      You can learn about the background and motivations
      <a href="http://nbviewer.jupyter.org/github/kronosapiens/thesis/blob/master/tex/thesis.pdf">here</a>
      and
      <a href="http://kronosapiens.github.io/blog/2016/01/11/blockchain-as-talmud.html">here</a>
      .
    </p>

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
