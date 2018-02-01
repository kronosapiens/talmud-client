<template>
  <div>
    <h2>{{ title }}</h2>

    <b-row>
      <b-col></b-col>
      <b-col cols="4">
        <PageUserRegister/>
      </b-col>
      <b-col cols="4">
        <PageUserLogin/>
      </b-col>
      <b-col></b-col>
    </b-row>

  </div>
</template>

<script>

  import PageUserLogin from './PageUserLogin.vue'
  import PageUserRegister from './PageUserRegister.vue'

  export default {
    name: 'page-user',
    components: {
      PageUserLogin,
      PageUserRegister,
    },
    data () {
      return {
        title: 'User',
      }
    }
  }
</script>
