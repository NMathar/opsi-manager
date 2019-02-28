<template>
  <div class="info">
    <p>Group:</p>
    <b-form-select v-model="selectedgroup" :options="allgroups"/>
    <b-button variant="default" @click="addToGroup" class="mt-2 float-right">
      Add to Group
    </b-button>
    {{selectedgroup}}

    <div v-if="clientgroups">
      <h3>Groups</h3>
      {{clientgroups}}
    </div>
    <InlineLoading :loading="!clientgroups"></InlineLoading>
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
        allgroups: [],
        clientgroups: [],
        selectedgroup: null
      }
    },
    methods: {
      async loadALLGroups () {
        const groups = await this.api.getAllHostGroups()
        // console.log(res.data)
        let self = this
        self.allgroups.push({value: null, text: 'Please select an option'})
        groups.data.forEach(function (element) {
          self.allgroups.push({value: element.ident, text: element.ident})
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
      this.loadALLGroups()
      this.clientgroups = false
      this.api.getClientGroups(this.clientid).then((res) => {
        // console.log(res.data)
        this.clientgroups = res.data
      })
    }
  }
</script>

<style scoped>

</style>
