<template>
  <div class="software">
    <b-row>
      <b-col md="5" class="my-4">
        <h3>Software</h3>
      </b-col>
      <b-col offset-md="2" md="5" class="my-4">
        <b-form-group class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search" />
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-table striped hover :filter="filter" :items="softwaredata" :fields="fields"/>
  </div>
</template>

<script>
  export default {
    name: 'Software',
    props: ['softwaredata'],
    data () {
      return {
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
    }
  }
</script>

<style scoped>

</style>
