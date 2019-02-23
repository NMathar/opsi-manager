<template>
    <div>
        <h2>Client Infos for {{ $route.params.id }}</h2>
        <Loading :loading="!client"></Loading>

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
            </b-nav>

            <div class="info-tab" v-if="showInfo">
                <InfoTab :infodata="client.info"></InfoTab>
            </div>
            <div class="hardware-tab" v-if="showHardware">
                <HardwareTab :hardwaredata="client.hardware"></HardwareTab>
            </div>
            <div class="software" v-if="showSoftware">
                <SoftwareTab :softwaredata="client.products"></SoftwareTab>
            </div>
        </div>
    </div>
</template>

<script>
  import Loading from '../parts/Loading'
  import HardwareTab from '../tabs/Hardware'
  import InfoTab from '../tabs/Info'
  import SoftwareTab from '../tabs/Software'

  export default {
    name: 'Client',
    components: {Loading, HardwareTab, InfoTab, SoftwareTab},
    props: ['showHardware', 'showInfo', 'showSoftware'],
    data () {
      return {
        client: false
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
        console.log(to)
        console.log(from)
        if (this.client.info.hostId !== to.params.id) {
          this.client = false
          this.loadClientInfo()
        }
      }
    },
    methods: {
      loadClientInfo () {
        this.api.getAllClientData(this.$route.params.id).then((res) => {
          // console.log(res.data)
          this.client = res.data
        })
      }
    },
    mounted () {
      this.loadClientInfo()
    }
  }
</script>

<style scoped>

</style>
