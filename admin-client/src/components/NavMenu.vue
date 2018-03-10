<template>
  <div class="navmenu-wrapper">
    <el-menu
      :default-active="active"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>主题管理</span>
        </template>
        <router-link tag="div" :to="{ name: 'Topic' }"><el-menu-item index="1-1">主题列表</el-menu-item></router-link>
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
          <span>推荐管理</span>
        </template>
        <router-link tag="div" :to="{ name: 'Recommends' }"><el-menu-item index="2-1">推荐列表</el-menu-item></router-link>
        <router-link tag="div" :to="{ name: 'Recommends', query: { top: 1 }}"><el-menu-item index="2-2">
        首页展示推荐文章</el-menu-item></router-link>
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
    padding: 30px 0;
    height: 100%;
  }
</style>
<script>
const ROUTER_INDEX = {
  'Restaurants': '1-2',
  'Topic': '1-1',
  'Recommends': '2-1'
}
export default {
  data () {
    return {
      active: '1-1'
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
  created () {
    this.active = ROUTER_INDEX[this.$route.name]
  }
}
</script>
