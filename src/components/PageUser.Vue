<template>
  <div>
    <h2>{{ title }}</h2>

    <b-row>
      <b-col cols="6">
        <PageUserLogin/>
      </b-col>
      <b-col cols="6">
        <PageUserRegister/>
      </b-col>
    </b-row>

  </div>
</template>

<script>

  import PageUserRegister from './PageUserRegister.vue'
  import PageUserLogin from './PageUserLogin.vue'

  export default {
    name: 'user',
    components: {
      PageUserRegister,
      PageUserLogin,
    },
    data () {
      return {
        title: 'User',
      }
    }
  }
</script>
