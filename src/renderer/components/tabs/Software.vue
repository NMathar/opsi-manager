<template>
  <div class="software">
    <div v-if="softwaredata">
      <b-row>
        <b-col md="5" class="my-4">
          <h3>Software</h3>
        </b-col>
        <b-col offset-md="2" md="5" class="my-4">
          <b-form-group class="mb-0">
            <b-input-group>
              <b-form-input v-model="filter" placeholder="Type to Search"/>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-table striped hover :filter="filter" :items="softwaredata" :fields="fields"/>
    </div>
    <InlineLoading :loading="!softwaredata"></InlineLoading>
  </div>
</template>

<script>
  import InlineLoading from '../parts/Inline-Loading'
  export default {
    name: 'Software',
    props: ['clientid'],
    components: {InlineLoading},
    computed: {
      api () {
        return this.$store.getters.GET_API
      }
    },
    data () {
      return {
        softwaredata: [],
        filter: null,
        fields: {
          productId: {
            label: 'Product',
            sortable: true
          },
          productVersion: {
            label: 'Version',
            sortable: false
          },
          installationStatus: {
            label: 'State',
            sortable: false
          },
          actionResult: {
            label: 'Action Result',
            sortable: false
          },
          modificationTime: {
            label: 'last change',
            sortable: true
          }
        }
      }
    },
    mounted () {
      this.softwaredata = false
      this.api.getClientSoftware(this.clientid).then((res) => {
        // console.log(res.data)
        this.softwaredata = res.data
      })
    }
  }
</script>

<style scoped>

</style>
