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
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="time"
          label="主题创建时间"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="主题状态"
          align="center"
          header-align="center"
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
          align="center"
          header-align="center"
        ></el-table-column>
        <el-table-column
          label="操作"
          align="center"
          header-align="center"
        >
          <template slot-scope="scope">
            <el-button @click="handleActive(scope.row)" type="text" size="small">{{ scope.row.status === 0 ? '激活' : '取消激活' }}</el-button>
            <el-button @click="onRemove(scope.row._id)" type="text" class="delete" size="small">删除</el-button>
          </template>
        </el-table-column>
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
      'getTopics',
      'removeTopic'
    ]),
    onRemove (id) {
      this.$confirm('此操作将永久删除该主题所有信息，包括对应文章的主题，评论点赞等, 建议取消激活，不要直接删除，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.removeTopic({ id })
        this.getTopics()
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
