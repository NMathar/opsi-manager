<template>
    <b-container>
        <router-link to="/" class="btn btn-lg btn-default">Zurück</router-link>
        <b-row>
            <b-col md="8" sm="12" offset-md="2">
                <b-form @submit="onSubmit">
                    <b-input-group size="lg" class="mt-3">
                        <b-input-group-prepend is-text>
                            <font-awesome-icon icon="link"/>
                        </b-input-group-prepend>
                        <b-form-input id="url"
                                      type="url"
                                      v-model="form.url"
                                      required
                                      placeholder="https://localhost:4447">
                        </b-form-input>
                    </b-input-group>
                    <b-input-group size="lg" class="mt-3">
                        <b-input-group-prepend is-text>
                            <font-awesome-icon icon="user"/>
                        </b-input-group-prepend>
                        <b-form-input id="username"
                                      type="text"
                                      v-model="form.username"
                                      required
                                      placeholder="User">
                        </b-form-input>
                    </b-input-group>

                    <b-input-group size="lg" class="mt-3">
                        <b-input-group-prepend is-text>
                            <font-awesome-icon icon="lock"/>
                        </b-input-group-prepend>
                        <b-form-input id="password"
                                      type="password"
                                      v-model="form.password"
                                      required
                                      placeholder="Password">
                        </b-form-input>
                    </b-input-group>

                    <b-button type="submit" class="mt-3" size="lg" variant="primary">Login</b-button>
                </b-form>
            </b-col>
        </b-row>
    </b-container>

</template>

<script>
  import {library} from '@fortawesome/fontawesome-svg-core'
  import {faUser, faLock, faLink} from '@fortawesome/free-solid-svg-icons'

  library.add(faUser, faLock, faLink)
  export default {
    name: 'Login',
    data () {
      return {
        loading: false,
        visible: false,
        form: {
          url: '',
          username: '',
          password: ''
        }
      }
    },
    methods: {
      onSubmit (evt) {
        evt.preventDefault()
        this.visible = false
        this.login()
        // console.log(JSON.stringify(this.form))
      },
      login () {
        this.$store.dispatch('login', {
          url: this.form.url,
          user: this.form.username,
          password: this.form.password
        }).then(() => {
          this.$router.push('/')
        })
      }
    }
  }
</script>

<style scoped>

</style>
