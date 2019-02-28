<template>
  <div class="info">
    <div v-if="infodata">
      <h3>Info</h3>
      {{infodata}}
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
