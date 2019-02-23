<template>
    <div>
        <div class="sticky-top bg-white">
            <b-nav fill tabs>
                <b-nav-item active><font-awesome-icon icon="desktop"/></b-nav-item>
                <b-nav-item><font-awesome-icon icon="th-list"/></b-nav-item>
            </b-nav>

            <b-form inline class="p-2">
                <label class="sr-only" for="clientSearch">Search</label>
                <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                    <b-input id="clientSearch" placeholder="Search" />
                </b-input-group>

                <b-button variant="primary"><font-awesome-icon icon="search"/></b-button>
            </b-form>
        </div>
        <b-nav vertical>
            <b-nav-item v-for="client in clients" :key="client.id" :to="{ name: 'client-page', params: { id: client.id }}">{{client.id}}</b-nav-item>
        </b-nav>
    </div>
</template>

<script>
  import {library} from '@fortawesome/fontawesome-svg-core'
  import {faSearch, faThList, faDesktop} from '@fortawesome/free-solid-svg-icons'
  // import {OPSIApi} from 'opsi-api'

  library.add(faSearch, faThList, faDesktop)

  export default {
    name: 'ClientSidebar',
    data () {
      return {
        clients: []
      }
    },
    computed: {
      api () {
        return this.$store.getters.GET_API
      }
    },
    mounted () {
      this.api.getAllClients().then((res) => {
        // console.log(res.data)
        this.clients = res.data
      })
    }
  }
</script>

<style scoped>

</style>
