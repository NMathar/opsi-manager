<template>
    <div>
        <h2>Client Infos for {{ $route.params.id }}</h2>
        <Loading :loading="!client"></Loading>


        <div class="clientInfo" v-if="client">
            <div class="client-status-area">
                <b-badge variant="secondary">Last seen: {{clientinfodata.lastSeen}}</b-badge>
                <b-badge :variant="clientstate ? 'success' : 'danger'">{{clientstate ? 'On' : 'Off'}}</b-badge>
                <b-badge variant="warning">Packages to upgrade: {{Math.floor((Math.random() * 100) + 1)}}</b-badge>
            </div>
            <hr>
            <div class="client-action-area my-4">
                <b-button v-b-modal.installModal>Install Software</b-button>
                <b-button variant="danger" v-b-modal.modalDelConfirm>Delete</b-button>
                <!--<b-button variant="success"></b-button>-->
                <b-button variant="outline-danger">Power - Off</b-button>
                <b-button variant="outline-success">Power - On</b-button>
            </div>

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

        <!--Delete confirm Modal-->
        <b-modal id="modalDelConfirm" title="Confirmation" @ok="deleteClient">Are you sure you want to delete
            the client {{client}}?
        </b-modal>

        <!--Install software modal-->
        <b-modal id="installModal" title="Packages" @show="loadInstallableSoftware" @ok="installSoftware">
            <InstallModal :software-array="installids"></InstallModal>
        </b-modal>

    </div>
</template>

<script>
  import Loading from '../parts/Loading'
  import HardwareTab from '../tabs/Hardware'
  import InfoTab from '../tabs/Info'
  import SoftwareTab from '../tabs/Software'
  import GroupTab from '../tabs/ClientGroups'
  import InstallModal from '../parts/InstallPackageModal'

  export default {
    name: 'Client',
    components: {Loading, HardwareTab, InfoTab, SoftwareTab, GroupTab, InstallModal},
    props: ['showHardware', 'showInfo', 'showSoftware', 'showGroups'],
    data () {
      return {
        client: false,
        installids: [],
        clientinfodata: false,
        clientstate: false
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
      async deleteClient () {
        const {success, message} = await this.api.deleteClient(this.client)
        if (success) {
          this.$router.push('/')
          location.reload()
        } else {
          console.error(message)
        }
      },
      getClientState () {
        this.clientstate = false
        this.api.isClientOn(this.client).then((res) => {
          console.log(res.data)
          this.clientstate = res.data[this.client]
        })
      },
      getClientInfos () {
        this.clientinfodata = false
        this.api.getClientInfo(this.client).then((res) => {
          // console.log(res.data)
          this.clientinfodata = res.data
        })
      },
      installSoftware () {
        console.log('install software')
        this.$emit('installModalShow', false)
      },
      async loadInstallableSoftware () {
        const {data} = await this.api.getInstallableProductIds(this.client)
        this.installids = data
      }
    },
    mounted () {
      this.client = this.$route.params.id
      this.getClientInfos()
      this.getClientState()
    }
  }
</script>

<style scoped>

</style>
