<template>
  <div id="app">
    <nav-menu v-if="isLogin"></nav-menu>
    <router-view />
  </div>
</template>

<script>
import NavMenu from '@/components/NavMenu'

export default {
  name: 'App',
  components: {
    NavMenu
  },
  computed: {
    isLogin () {
      return this.$store.state.user.isLogin
    }
  }
}
</script>
