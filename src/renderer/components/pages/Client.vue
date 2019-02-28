<template>
  <div>
    <h2>Client Infos for {{ $route.params.id }}</h2>
    <Loading :loading="!client"></Loading>

    <p>Group:</p>
    <b-form-select v-model="clientgroup" :options="groups"/>
    <b-button variant="default" @click="addToGroup" class="mt-2 float-right">
      Add to Group
    </b-button>
    {{clientgroup}}
    <div class="clientInfo" v-if="client">
      <b-nav tabs>
        <b-nav-item :active="showInfo" :to="{ name: 'client-info-page', params: { id: $route.params.id }}">
          Info
        </b-nav-item>
        <b-nav-item :active="showHardware"
                    :to="{ name: 'client-hardware-page', params: { id: $route.params.id }}">Hardware
        </b-nav-item>
        <b-nav-item :active="showSoftware"
                    :to="{ name: 'client-software-page', params: { id: $route.params.id }}">Software
        </b-nav-item>
        <b-nav-item :active="showGroups"
                    :to="{ name: 'client-group-page', params: { id: $route.params.id }}">Groups
        </b-nav-item>
      </b-nav>

      <div class="info-tab" v-if="showInfo">
        <InfoTab :clientid="$route.params.id"></InfoTab>
      </div>
      <div class="hardware-tab" v-if="showHardware">
        <HardwareTab :clientid="$route.params.id"></HardwareTab>
      </div>
      <div class="software" v-if="showSoftware">
        <SoftwareTab :clientid="$route.params.id"></SoftwareTab>
      </div>
      <div class="groups" v-if="showGroups">
        <GroupTab :clientid="$route.params.id"></GroupTab>
      </div>
    </div>
  </div>
</template>

<script>
  import Loading from '../parts/Loading'
  import HardwareTab from '../tabs/Hardware'
  import InfoTab from '../tabs/Info'
  import SoftwareTab from '../tabs/Software'
  import GroupTab from '../tabs/ClientGroups'

  export default {
    name: 'Client',
    components: {Loading, HardwareTab, InfoTab, SoftwareTab, GroupTab},
    props: ['showHardware', 'showInfo', 'showSoftware', 'showGroups'],
    data () {
      return {
        client: false,
        groups: [],
        clientgroup: null
      }
    },
    computed: {
      api () {
        return this.$store.getters.GET_API
      }
    },
    watch: {
      '$route' (to, from) {
        // react to route changes...
        // console.log(to)
        // console.log(from)
        if (this.client !== to.params.id) {
          this.client = to.params.id
          console.log('switch route to: ', to.params.id)
          this.$router.push({name: 'client-page', params: {id: to.params.id}})
        }
      }
    },
    methods: {
      async loadGroups () {
        const groups = await this.api.getAllHostGroups()
        // console.log(res.data)
        let self = this
        self.groups.push({value: null, text: 'Please select an option'})
        groups.data.forEach(function (element) {
          self.groups.push({value: element.ident, text: element.ident})
        })
      },
      async addToGroup () {
        const {success, message} = await this.api.addClientToGroup(this.$route.params.id, this.clientgroup)
        console.log(success)
        console.log(message)
        // TODO: add notification
      }
    },
    mounted () {
      this.client = this.$route.params.id
      this.loadGroups()
    }
  }
</script>

<style scoped>

</style>
