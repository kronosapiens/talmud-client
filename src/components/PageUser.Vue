<template>
  <div>
    <h2>{{ title }}</h2>

    <b-row>
      <b-col cols="6">
        <PageUserConfirm/>
        <hr>
        <PageUserLogin/>
      </b-col>
      <b-col cols="6">
        <PageUserRegister/>
      </b-col>
    </b-row>

  </div>
</template>

<script>

  import PageUserConfirm from './PageUserConfirm.vue'
  import PageUserLogin from './PageUserLogin.vue'
  import PageUserRegister from './PageUserRegister.vue'

  export default {
    name: 'page-user',
    components: {
      PageUserConfirm,
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
