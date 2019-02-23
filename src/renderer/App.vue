<template>
    <div id="app">
        <b-container fluid class="h-100">
            <b-row class="h-100">
                <b-col cols="4" v-if="isLoggedIn" class="sidebar border-right border-primary">
                    <sidebar></sidebar>
                </b-col>


                <b-col cols="8">
                    <b-button variant="danger" v-if="isLoggedIn" @click="logout" class="mt-2 float-right">
                        <font-awesome-icon icon="power-off"/>
                    </b-button>
                    <router-view></router-view>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
  import Sidebar from './components/parts/ClientSidebar'
  import {library} from '@fortawesome/fontawesome-svg-core'
  import {faPowerOff} from '@fortawesome/free-solid-svg-icons'

  library.add(faPowerOff)

  export default {
    name: 'opsi-manager',
    components: {Sidebar},
    computed: {
      isLoggedIn () {
        return this.$store.getters.isLoggedIn
      }
    },
    methods: {
      logout () {
        this.$store.dispatch('logout')
        location.reload()
      }
    }
  }
</script>

<style>
    /* CSS */
</style>
