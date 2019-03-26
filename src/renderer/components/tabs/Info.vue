<template>
    <div class="info">
        <div v-if="infodata">
            <h3>Info</h3>
            <b-row>
                <b-col class="border-right">
                    <p>Name: {{infodata.id}}</p>
                    <p>IP: {{infodata.ipAddress}}</p>
                    <p>Mac: {{infodata.hardwareAddress}}</p>
                    <p>Inventory Number: {{infodata.inventoryNumber}}</p>
                    <p>Created: {{infodata.created}}</p>
                    <p>Last seen: {{infodata.lastSeen}}</p>
                    <p>
                        <b>Note:</b>
                    </p>
                    <p>
                        {{infodata.note}}
                    </p>
                </b-col>
                <b-col cols="5">
                    <p><b>Description:</b></p>
                    <p>{{infodata.description}}</p>
                </b-col>
            </b-row>
        </div>
        <InlineLoading :loading="!infodata"></InlineLoading>
    </div>
</template>

<script>
  import InlineLoading from '../parts/Inline-Loading'

  export default {
    name: 'Info',
    components: {InlineLoading},
    props: ['clientid'],
    computed: {
      api () {
        return this.$store.getters.GET_API
      }
    },
    watch: {
      clientid () {
        this.getInfos()
      }
    },
    data () {
      return {
        infodata: []
      }
    },
    methods: {
      getInfos () {
        this.infodata = false
        this.api.getClientInfo(this.clientid).then((res) => {
          // console.log(res.data)
          this.infodata = res.data
        })
      }
    },
    mounted () {
      this.getInfos()
    }
  }
</script>

<style scoped>

</style>
