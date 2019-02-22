<template>
    <div>
        <h2>Client Infos for {{ $route.params.id }}</h2>
        <Loading :loading="!client"></Loading>

        <div class="clientInfo" v-if="client">
            {{client}}
        </div>
    </div>
</template>

<script>
  import {OPSIApi} from 'opsi-api'
  import Loading from '../parts/Loading'

  export default {
    name: 'Client',
    components: {Loading},
    data () {
      return {
        client: false
      }
    },
    computed: {
      opsiLogin () {
        return this.$store.getters.GET_LOGIN
      }
    },
    watch: {
      '$route' (to, from) {
        this.client = false
        // react to route changes...
        console.log(to)
        console.log(from)
        this.loadClientInfo()
      }
    },
    methods: {
      loadClientInfo () {
        const api = new OPSIApi(this.opsiLogin.server, this.opsiLogin.user, this.opsiLogin.password)
        api.getAllClientData(this.$route.params.id).then((res) => {
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
