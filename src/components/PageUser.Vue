<template>
  <div>

    <b-form-group>
      <b-form-radio-group
        buttons
        button-variant="outline-info"
        size="md"
        v-model="userSelected"
        v-bind:options="userOptions"
        />
    </b-form-group>

    <b-row class="justify-content-center">
      <b-col cols="10" lg="6">
        <PageUserRegister v-if="userSelected == 'Register'"/>
        <PageUserLogin v-else/>
      </b-col>
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
        userSelected: 'Register',
        userOptions: ['Register', 'Login'],
        sharedState: store.state,
      }
    },
    created () {
      store.clearAlert()
    }
  }
</script>
