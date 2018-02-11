<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <nav-menu></nav-menu>
    <router-view/>
  </div>
</template>

<script>
import NavMenu from '@/components/NavMenu'
export default {
  name: 'App',
  components: {
    NavMenu
  }
}
</script>
