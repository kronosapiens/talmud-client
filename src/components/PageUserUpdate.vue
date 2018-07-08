<template>
  <div>

    <b-row class="justify-content-center">
      <b-col cols="10" lg="6">
        <h3>{{ title }}</h3>

        <b-form v-on:submit="onSubmit">
          <PageUserDetails v-model="form"></PageUserDetails>
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>

      </b-col>
    </b-row>

  </div>
</template>

<script>
  import { submitUpdate } from '../services/server'
  import { store } from '../services/store'

  import PageUserDetails from './PageUserDetails.vue'

  export default {
    name: 'page-user-update',
    components: {
      PageUserDetails,
    },
    data () {
      return {
        title: 'Update',
        form: {},
      }
    },
    methods: {
      onSubmit (event) {
        event.preventDefault()
        store.setAlertSecondary("Submitting update...")
        submitUpdate(this.form)
          .catch(error => store.setAlertDanger('Something went wrong 😭'))
          .then(data => {
            if (data.jwt) {
              store.handleLogin(data.jwt)
              store.setAlertSuccess('Information updated! 🙏🏽')
              this.$router.push('/')
            } else {
              store.setAlertDanger(data.text + ' 😭')
            }
          })
      }
    }
  }
</script>
