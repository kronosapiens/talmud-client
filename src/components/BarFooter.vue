<template>

  <footer class="sticky-footer">
    <div class="container text-muted">
        &copy; <b-link v-bind:href="url">kronosapiens</b-link> {{ year }}
    </div>
  </footer>

</template>

<script>
  export default {
    name: 'bar-footer',
    data () {
      return {
        year: (new Date).getFullYear(),
        url: 'http://www.hamsterdance.org/hamsterdance/'
      }
    }
  }
</script>

<style>

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
