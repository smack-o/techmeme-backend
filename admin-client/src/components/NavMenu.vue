<template>
  <div class="navmenu-wrapper">
    <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>主题管理</span>
        </template>
        <router-link tag="div" class="button-create" :to="{ name: 'Topic' }"><el-menu-item index="1-1">主题列表</el-menu-item></router-link>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
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
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
