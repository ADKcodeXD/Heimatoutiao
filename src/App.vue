<template>
  <div id="app">
    <keep-alive :include="cachePages" >
       <router-view />
    </keep-alive>
     
  </div>
</template>

<script>
  import './styles/index.css';
  import {mapState} from 'vuex';
  export default {
    name: 'App',
    components: {

    },
    computed:{
      ...mapState(['cachePages'])
    }
  }
</script>

<style>

</style>