<template>
<div v-if="loading" class="loading">
    <font-awesome-icon icon="spinner" spin size="2x"/>
</div>
</template>

<script>
  import {library} from '@fortawesome/fontawesome-svg-core'
  import {faSpinner} from '@fortawesome/free-solid-svg-icons'

  library.add(faSpinner)

  export default {
    name: 'Loading',
    props: ['loading'],
    data () {
      return {
      }
    }
  }
</script>

<style scoped>
    /* Absolute Center Spinner */
    .loading {
        position: fixed;
        z-index: 1999;
        height: 2em;
        width: 2em;
        overflow: visible;
        margin: auto;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }

    /* Transparent Overlay */
    .loading:before {
        content: '';
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.3);
    }
</style>
