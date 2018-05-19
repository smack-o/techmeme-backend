<template>
  <div class="navmenu-wrapper">
    <div class="user-info">
      账号: {{username}}
      <router-link class="logout" tag="span" :to="{ name: 'Logout' }">登出</router-link>
    </div>
    <el-menu
    :default-active="active"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>标签管理</span>
      </template>
      <router-link tag="div" :to="{ name: 'Topic' }"><el-menu-item index="1-1">标签列表</el-menu-item></router-link>
      <router-link tag="div" :to="{ name: 'Restaurants' }"><el-menu-item index="1-2">
        文章列表</el-menu-item></router-link>
      </el-submenu>
      <!-- <el-menu-item index="2">
      <router-link slot="title" tag="div" :to="{ name: 'Restaurants' }">
      <i class="el-icon-menu"></i>
      文章列表
    </router-link>
  </el-menu-item> -->
  <el-submenu index="2">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span>编辑推荐</span>
    </template>
    <router-link tag="div" :to="{ name: 'Recommends' }"><el-menu-item index="2-1">所有编辑推荐</el-menu-item></router-link>
    <router-link tag="div" :to="{ name: 'Recommends', query: { top: 1 }}"><el-menu-item index="2-2">
      首页展示编辑推荐</el-menu-item></router-link>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>城市攻略</span>
      </template>
      <router-link tag="div" :to="{ name: 'CityGuids' }"><el-menu-item index="3-1">城市攻略列表</el-menu-item></router-link>
      <!-- <router-link tag="div" :to="{ name: 'Recommends', query: { top: 1 }}"><el-menu-item index="2-2">
      首页展示编辑推荐</el-menu-item></router-link> -->
    </el-submenu>
  </el-menu>
</div>
</template>
<style media="screen" lang="less" scoped>
@import "../assets/var.less";
.navmenu-wrapper {
  height: 100%;
  width: 200px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: @ColorWhite;
}
.el-menu-vertical-demo {
  height: 100%;
}
.logout {
  color: blue;
  cursor: pointer;
}
.user-info {
  text-align: center;
  padding: 10px 0;
  border-bottom: solid 1px #e6e6e6;
  border-right: solid 1px #e6e6e6;
  // border-bottom: 1px solid gray;
}
</style>
<script>
const ROUTER_INDEX = {
  'Restaurants': '1-2',
  'Topic': '1-1',
  'Recommend': '2-1',
  'Recommends': '2-1',
  'CityGuid': '3-1',
  'CityGuids': '3-1'
}
export default {
  data () {
    return {
      active: ''
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  computed: {
    username () {
      return this.$store.state.user.username
    }
  },
  watch: {
    $route (to) {
      this.active = ROUTER_INDEX[to.name]
    }
  },
  mounted () {
    this.active = ROUTER_INDEX[this.$route.name]
  }
}
</script>
