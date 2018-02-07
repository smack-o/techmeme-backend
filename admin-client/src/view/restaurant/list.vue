<template lang="html">
  <div class="">
    <el-breadcrumb class="bread-wrapper" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>餐厅列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="list-wrapper">
      <el-pagination
        class="list-pagination"
        layout="total, prev, pager, next, jumper"
        :page-size="pageSize"
        :total="12"
        :current-page.sync="currentPage"
        >
      </el-pagination>
      <router-link class="button-create" :to="{ name: 'Restaurant', params: { id: 'create' }}"><el-button type="primary">新建餐厅</el-button></router-link>
      <el-card class="list-item" v-for="(item, index) in list" :key="index" :body-style="{ padding: '0px' }">
        <div class="image-wrapper">
          <img :src="`/img/${item.pictures[0]}`" class="image">
        </div>
        <div class="list-info" style="padding: 14px;">
          <span>{{item.name}}</span>
          <time class="time">更新时间：{{ handleTime(item.updatedAt) }}</time>
          <div class="bottom">
            <router-link :to="{ name: 'Restaurant', params: { id: item._id }}"><el-button type="text" class="button">编辑</el-button></router-link>
            <el-button type="text" @click="onRemove(item._id)" class="button button-delete">删除</el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import moment from 'moment'
const PAGE_SIZE = 9

export default {
  name: 'RestaurantEdit',
  data () {
    return {
      pageSize: PAGE_SIZE,
      currentPage: 1
    }
  },
  watch: {
    currentPage (val) {
      this.getList({
        page_num: val,
        page_size: this.pageSize
      })
      this.$router.replace({
        query: {
          page_num: val
        }
      })
    }
  },
  computed: {
    list () {
      return this.$store.state.restaurant.list
    },
    total () {
      return this.$store.state.restaurant.total
    }
  },
  created () {
    if (this.$route.query.page_num) {
      this.currentPage = Number(this.$route.query.page_num)
    }
    this.getList({
      page_num: this.currentPage,
      page_size: this.pageSize
    })
  },
  methods: {
    ...mapActions('restaurant', [
      'getList',
      'removeRestaurant'
    ]),
    onRemove (id) {
      this.$confirm('此操作将永久删除该餐厅所有信息，包括评论点赞等, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.removeRestaurant({ id })
        this.getList({
          page_num: this.currentPage,
          page_size: this.pageSize
        })
      })
    },
    handleTime (date) {
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>
<style media="screen" src="@/assets/restaurant-list.less" scoped lang="less">
</style>
