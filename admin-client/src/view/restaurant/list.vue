<template lang="html">
  <div class="">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>餐厅列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="list-wrapper">
      <el-card class="list-item" v-for="(item, index) in list" :key="index" :body-style="{ padding: '0px' }">
        <img :src="item.pictures[0]" class="image">
        <div class="list-info" style="padding: 14px;">
          <span>{{item.name}}</span>
          <time class="time">更新时间：{{ handleTime(item.updatedAt) }}</time>
          <div class="bottom">
            <router-link :to="{ name: 'Restaurant', params: { id: item._id }}"><el-button type="text" class="button">编辑</el-button></router-link>
            <!-- <el-button type="text" class="button">操作按钮</el-button> -->
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<style media="screen" scoped lang="less">
  .list-wrapper {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 50px;
    .list-item {
      width: 300px;
      margin: 20px;

      .image {
        width: 100%;
      }
    }
    .time {
      font-size: 13px;
      color: #999;
    }
    .list-info {
      display: flex;
      flex-direction: column;

      .bottom {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
</style>
<script>
import { mapActions } from 'vuex'
import moment from 'moment'

export default {
  name: 'RestaurantEdit',
  data () {
    return {
    }
  },
  computed: {
    list () {
      return this.$store.state.restaurant.list
    }
  },
  created () {
    this.getList({
      page_size: 10
    })
  },
  methods: {
    ...mapActions('restaurant', [
      'getList'
    ]),
    handleTime (date) {
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>
