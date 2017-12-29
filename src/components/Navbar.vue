<template>

  <b-navbar toggleable="md" type="dark" variant="info">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand v-on:click="navClick">Talmud</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav v-for="item in items" :key="item.name">
        <b-nav-item v-on:click="navClick">
          {{ item.name }}
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-navbar-nav right>
          <b-nav-item v-on:click="navClick">Login</b-nav-item>
        </b-navbar-nav>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>


</template>

<script>
  export default {
    name: 'navbar',
    data () {
      return {
        items: [
          { name: 'Explore' },
          { name: 'Vote' }
        ]
      }
    },
    methods: { // Could also use v-on:click="$emit('navClick', item.name)"
      navClick (event) {
        let view = event.srcElement.innerText.toLowerCase()
        this.$emit('navClick', view)
      }
    }
  }
</script>

<style scoped>

</style>
