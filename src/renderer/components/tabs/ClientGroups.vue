<template>
  <div class="info">
    <div v-if="groups">
      <h3>Groups</h3>
      {{groups}}
    </div>
    <InlineLoading :loading="!groups"></InlineLoading>
  </div>
</template>

<script>
  import InlineLoading from '../parts/Inline-Loading'

  export default {
    name: 'ClientGroups',
    props: ['clientid'],
    components: {InlineLoading},
    computed: {
      api () {
        return this.$store.getters.GET_API
      }
    },
    data () {
      return {
        groups: []
      }
    },
    mounted () {
      this.groups = false
      this.api.getClientGroups(this.clientid).then((res) => {
        // console.log(res.data)
        this.groups = res.data
      })
    }
  }
</script>

<style scoped>

</style>
