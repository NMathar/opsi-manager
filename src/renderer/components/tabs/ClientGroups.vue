<template>
    <div class="info">
        <p>Add to Group:</p>
        <b-form-select class="my-3" v-model="selectedgroup" :options="allgroups"/>
        <b-button variant="outline-primary" v-if="selectedgroup" @click="addToGroup" class="my-3">Add to Group
        </b-button>

        <div v-if="clientgroups">
            <h3>Groups</h3>
            <!--{{clientgroups}}-->
            <div class="groupslist">
                <ul>
                    <li class="py-2" v-for="group in clientgroups" :key="group.groupId">
                        {{group.groupId}}
                        <b-button size="sm" variant="danger" @click="removeFromGroup(group.groupId)">Remove from Group</b-button>
                    </li>
                </ul>
            </div>
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
      loadClientGroups () {
        this.clientgroups = false
        this.api.getClientGroups(this.clientid).then((res) => {
          // console.log(res.data)
          this.clientgroups = res.data
        })
      },
      async addToGroup () {
        const {success, message} = await this.api.addClientToGroup(this.clientid, this.selectedgroup)
        console.log(success)
        console.log(message)
        // TODO: add notification and render update
        if (success) {
          this.loadClientGroups()
        }
      },
      async removeFromGroup (groupId) {
        const {success, message} = await this.api.removeClientFromGroup(this.clientid, groupId)
        console.log(success)
        console.log(message)
        // TODO: add notification and render update
        if (success) {
          this.loadClientGroups()
        }
      }
    },
    mounted () {
      this.loadALLGroups()
      this.loadClientGroups()
    }
  }
</script>

<style scoped>

</style>
