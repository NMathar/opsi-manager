<template>
  <div id="app">
    <b-container fluid class="h-100">
      <b-row class="h-100">
        <!--TODO: Add left sidebar with client-->
        <b-col cols="4" class="sidebar border-right border-primary">
          <!--<sidebar></sidebar>-->
        </b-col>


        <!--TODO: add main content -->
        <b-col cols="8"><router-view></router-view></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import Sidebar from './components/parts/ClientSidebar'

  export default {
    name: 'opsi-manager',
    components: {Sidebar}
  }
</script>

<style>
  /* CSS */
</style>
