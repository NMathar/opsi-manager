<template>
    <div>
        <div class="sticky-top bg-white">
            <b-nav fill tabs>
                <b-nav-item active>
                    <font-awesome-icon icon="desktop"/>
                </b-nav-item>
                <b-nav-item>
                    <font-awesome-icon icon="th-list"/>
                </b-nav-item>
            </b-nav>

            <b-form inline class="p-2">
                <label class="sr-only" for="clientSearch">Search</label>
                <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                    <b-input id="clientSearch" placeholder="Search"/>
                </b-input-group>

                <b-button variant="primary">
                    <font-awesome-icon icon="search"/>
                </b-button>
            </b-form>
        </div>
        <b-nav vertical v-if="!groupNav">
            <b-nav-item v-for="client in clients" :key="client.id"
                        :to="{ name: 'client-page', params: { id: client.id }}">{{client.id}}
            </b-nav-item>
        </b-nav>
        <b-nav vertical v-if="groupNav">
            <b-nav-item-dropdown v-for="(group, index) in groups" :key="index" :text="index">
                <b-dropdown-item v-for="client in group" :key="client.clientId">
                    {{client.clientId}}
                </b-dropdown-item>
            </b-nav-item-dropdown>
        </b-nav>
    </div>
</template>

<script>
  import {library} from '@fortawesome/fontawesome-svg-core'
  import {faSearch, faThList, faDesktop} from '@fortawesome/free-solid-svg-icons'

  library.add(faSearch, faThList, faDesktop)

  export default {
    name: 'ClientSidebar',
    data () {
      return {
        groupNav: true,
        clients: [],
        groups: []
      }
    },
    computed: {
      api () {
        return this.$store.getters.GET_API
      }
    },
    methods: {
      async getGroups () {
        const {data} = await this.api.getAllHostGroupsWithClients()
        await this.$nextTick()
        this.groups = data
        console.log(this.groups)
      }
    },
    watch: {
      groups: function (newGroups, oldGroups) {
        console.log(oldGroups)
        console.log(newGroups)
        // console.log(Object.keys(newGroups).length)
      }
    },
    mounted () {
      let self = this
      this.api.getAllClients().then((res) => {
        // console.log(res.data)
        this.clients = res.data
      })
      this.$nextTick(function () {
        self.api.getAllHostGroupsWithClients().then((res) => {
          // console.log(res.data)
          self.groups = res.data
        })
      })
    }
  }
</script>

<style scoped>

</style>
