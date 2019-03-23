<template>
    <div>
        <h2>Software</h2>
        <!--{{softwareArray}}-->
        <b-form-group id="installSoftware" label="Install:" label-for="installSoftwareSelect">
            <b-form-select id="installSoftwareSelect" :options="softwareArray" required v-model="install"/>
        </b-form-group>
        <div v-if="info">
            <p>Name: {{info.name}}</p>
            <p>Type: {{info.type}}</p>
            <p>Product Version: {{info.productVersion}}</p>
            <p>Package Version: {{info.packageVersion}}</p>
            <p>Description: {{info.description}}</p>
            </div>
        <b-button variant="outline-primary" v-if="install" @click="installSoftware" class="my-3">Install</b-button>
    </div>
</template>

<script>
  export default {
    name: 'InstallPackageModal',
    props: ['softwareArray'],
    data () {
      return {
        install: false,
        info: false
      }
    },
    computed: {
      api () {
        return this.$store.getters.GET_API
      }
    },
    watch: {
      install: function (val) {
        this.getProductInfo(val)
      }
    },
    methods: {
      installSoftware () {
        console.log('install -> ', this.install)
      },
      async getProductInfo (val) {
        const {data} = await this.api.getProductInfo(this.install)
        this.info = data
      }
    }
  }
</script>

<style scoped>

</style>
