<template>
    <div>
        <div class="sticky-top bg-white">
            <b-nav fill tabs>
                <b-nav-item @click="groupNav = false" :active="!groupNav">
                    <font-awesome-icon icon="desktop"/>
                </b-nav-item>
                <b-nav-item @click="groupNav = true" :active="groupNav">
                    <font-awesome-icon icon="th-list"/>
                </b-nav-item>
            </b-nav>
        </div>
        <b-nav vertical v-if="!groupNav">
            <b-form class="p-2">
                <label class="sr-only" for="clientSearch">Search</label>
                <b-input-group class="mb-2">
                    <b-input v-model="clientSearch" @input="search" id="clientSearch" placeholder="Search"/>
                </b-input-group>
            </b-form>
            <b-nav-item v-for="client in clients" :key="client.id"
                        :to="{ name: 'client-page', params: { id: client.id }}">{{client.id}}
            </b-nav-item>
        </b-nav>
        <b-nav vertical v-if="groupNav">
            <b-nav-item-dropdown v-if="groups" v-for="(group, index) in groups" :key="index" :text="index">
                <b-form @submit.prevent>
                    <p v-for="client in group"
                       :key="client.clientId"
                    >
                        <b-link
                                :to="{ name: 'client-page', params: { id: client.clientId }}"
                                class="small pl-4"
                        >{{client.clientId}}
                        </b-link>
                    </p>
                </b-form>
            </b-nav-item-dropdown>
        </b-nav>
    </div>
</template>

<script>
  import {library} from '@fortawesome/fontawesome-svg-core'
  import {faSearch, faThList, faDesktop, faWindowClose} from '@fortawesome/free-solid-svg-icons'

  library.add(faSearch, faThList, faDesktop, faWindowClose)

  export default {
    name: 'ClientSidebar',
    data () {
      return {
        clientSearch: '',
        groupNav: false,
        clients: [],
        clientsOrig: [],
        groups: []
      }
    },
    computed: {
      api () {
        return this.$store.getters.GET_API
      }
    },
    methods: {
      sortBy (array, p) {
        return array.slice(0).sort(function (a, b) {
          return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0
        })
      },
      search () {
        this.clients = this.clientsOrig.filter(obj => {
          return obj.ident.includes(this.clientSearch)
        })
      },
      loadAllClients () {
        this.api.getAllClients().then((res) => {
          this.clients = this.sortBy(res.data, 'id')
          this.clientsOrig = this.sortBy(res.data, 'id')
        })
      }
    },
    mounted () {
      this.loadAllClients()
      this.api.getAllHostGroupsWithClients().then((res) => {
        // console.log(res.data)
        this.groups = res.data
      })
    }
  }
</script>

<style scoped>

</style>
