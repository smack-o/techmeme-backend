<template lang="html">
  <div class="">
    <el-breadcrumb class="bread-wrapper" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>主题列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="list-wrapper">
      <el-table
        :data="list"
        style="width: 100%"
        height="250">
        <el-table-column
          fixed
          prop="name"
          label="主题名称"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="time"
          label="主题创建时间"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="主题状态"
        >
        <template slot-scope="scope">
          <span :class="[
            'table-status',
            {
              actived: scope.row.status === 1
            }
          ]">
            {{ STATUS[scope.row.status] }}
          </span>
        </template>
        </el-table-column>
        <el-table-column
          prop="articles"
          label="该主题下所有文章"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'

const STATUS = {
  0: '主题未激活',
  1: '主题已激活'
}

export default {
  name: 'RestaurantEdit',
  data () {
    return {
      tableData: [],
      STATUS
    }
  },
  computed: {
    ...mapGetters('topic', {
      list: 'list'
    })
  },
  created () {
    this.getTopics()
  },
  methods: {
    ...mapActions('topic', [
      'getTopics'
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
<style media="screen" src="@/assets/topic.less" scoped lang="less">
</style>
