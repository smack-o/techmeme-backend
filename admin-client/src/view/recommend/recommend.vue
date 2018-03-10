<template lang="html">
  <div class="">
    <el-breadcrumb class="bread-wrapper" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>推荐文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="list-wrapper">
      <el-pagination
        class="list-pagination"
        layout="total, prev, pager, next, jumper"
        :page-size="pageSize"
        :total.sync="total"
        :current-page.sync="currentPage"
        >
      </el-pagination>
      <router-link class="button-create" :to="{ name: 'Recommend', params: { id: 'create' }}"><el-button type="primary">新建推荐文章</el-button></router-link>
      <el-card class="list-item" v-for="(item, index) in list" :key="index" :body-style="{ padding: '0px' }">
        <div class="top-icon" v-if="item.top === 1">
          置顶
        </div>
        <div class="image-wrapper">
          <img :src="item.pictures[0].url" class="image">
        </div>
        <div class="list-info" style="padding: 14px;">
          <span>{{item.title}}</span>
          <span class="time">{{item.subtitle}}</span>
          <time class="time">更新时间：{{ handleTime(item.updatedAt) }}</time>
          <div class="bottom">
            <router-link :to="{ name: 'Recommend', params: { id: item._id }}"><el-button type="text" class="button">编辑</el-button></router-link>
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
      currentPage: 1,
      title: '',
      total: 0,
      query: {}
    }
  },
  watch: {
    currentPage (val) {
      this.handleGetList()
      this.$router.replace({
        query: {
          ...this.$route.query,
          page_num: val
        }
      })
    },
    $route (val) {
      this.handleGetList()
    }
  },
  computed: {
    list () {
      return this.$store.state.recommend.list
    }
  },
  created () {
    if (this.$route.query.page_num) {
      this.currentPage = Number(this.$route.query.page_num)
    }
    this.handleGetList()
  },
  methods: {
    ...mapActions('recommend', [
      'getList',
      'removeRecommend'
    ]),
    onRemove (id) {
      this.$confirm('此操作将永久删除所有信息，包括评论点赞等, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.removeRecommend({ id })
        this.handleGetList()
      })
    },
    async handleGetList () {
      const searchQuery = { ...this.$route.query }
      delete searchQuery.page_num
      delete searchQuery.page_size
      const query = { ...searchQuery }

      const results = await this.getList({
        ...this.$route.query,
        page_num: this.currentPage,
        page_size: this.pageSize,
        ...query
      })
      this.total = results.data.count
    },
    handleTime (date) {
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>
<style media="screen" src="@/assets/restaurant-list.less" scoped lang="less">
</style>
