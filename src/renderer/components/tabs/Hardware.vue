<template>
  <div class="hardware">
    <div v-if="hardwaredata">
      <h3>Hardware</h3>
      {{hardwaredata}}
    </div>
    <InlineLoading :loading="!hardwaredata"></InlineLoading>
  </div>
</template>

<script>
  import InlineLoading from '../parts/Inline-Loading'
  export default {
    name: 'Hardware',
    props: ['clientid'],
    components: {InlineLoading},
    computed: {
      api () {
        return this.$store.getters.GET_API
      }
    },
    data () {
      return {
        hardwaredata: []
      }
    },
    mounted () {
      this.hardwaredata = false
      this.api.getClientHardware(this.clientid).then((res) => {
        // console.log(res.data)
        this.hardwaredata = res.data
      })
    }
  }
</script>

<style scoped>

</style>
