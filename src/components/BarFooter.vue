<template>

  <footer class="sticky-footer">
    <div class="container text-muted">
      &nabla; <b-link v-bind:href="url">kronosapiens</b-link> {{ year }}
    </div>
  </footer>

</template>

<script>
  export default {
    name: 'sticky-footer',
    data () {
      return {
        year: (new Date).getFullYear(),
        url: 'https://twitter.com/kronosapiens'
      }
    }
  }
</script>

<style scoped>
  html {
    position: relative;
    min-height: 100%;
  }
  body {
    /* Margin bottom by footer height */
    margin-bottom: 60px;
  }
  .sticky-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    /* Set the fixed height of the footer here */
    height: 60px;
    line-height: 60px; /* Vertically center the text there */
    background-color: #f5f5f5;
  }
</style>
