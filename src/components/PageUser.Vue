<template>
  <div>
    <h2>{{ title }}</h2>

    <b-row v-if="sharedState.isLoggedIn">
      <b-col></b-col>
      <b-col cols="4">
        <PageUserUpdate/>
      </b-col>
      <b-col></b-col>
    </b-row>

    <b-row v-else>
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

  import { store } from '../services/store'

  import PageUserUpdate from './PageUserUpdate.vue'
  import PageUserLogin from './PageUserLogin.vue'
  import PageUserRegister from './PageUserRegister.vue'

  export default {
    name: 'page-user',
    components: {
      PageUserUpdate,
      PageUserLogin,
      PageUserRegister,
    },
    data () {
      return {
        title: 'User',
        sharedState: store.state,
      }
    }
  }
</script>
