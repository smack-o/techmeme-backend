<template lang="html">
  <div class="">
    <el-breadcrumb class="bread-wrapper" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>主题列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" @click="createTopic">添加新主题</el-button>
    <div class="list-wrapper">
      <el-table
        :data="list"
        style="width: 100%">
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
        >
          <template slot-scope="scope">
            <router-link :to="{ name: 'Restaurants', query: { topic: scope.row._id }}"> {{scope.row.articlesCount}} (查看)</router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          header-align="center"
        >
          <template slot-scope="scope">
            <el-button @click="onUpdate(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="handleActive(scope.row)" type="text" size="small">{{ scope.row.status === 0 ? '上线' : '下线' }}</el-button>
            <el-button @click="onRemove(scope.row._id)" type="text" class="delete" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="`${dialogTitle}主题`" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="主题名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="是否上线该主题">
          <el-radio-group v-model="form.status">
            <el-radio v-model="form.status" :label="0">不上线</el-radio>
            <el-radio v-model="form.status" :label="1">上线</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onTopicSubmit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'

const STATUS = {
  0: '主题未上线',
  1: '主题已上线'
}

export default {
  name: 'RestaurantEdit',
  data () {
    return {
      tableData: [],
      STATUS,
      dialogTitle: '创建',
      dialogFormVisible: false,
      form: {
        name: '',
        status: 0
      },
      updateId: '',
      rules: {
        name: [
          { required: true, message: '请输入主题名称', trigger: 'blur' }
        ]
      }
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
      'removeTopic',
      'addTopic',
      'updateTopic'
    ]),
    onUpdate (topic) {
      this.dialogFormVisible = true
      this.dialogTitle = '编辑'
      this.$nextTick(() => {
        this.$refs.form.resetFields()
        this.form = {
          name: topic.name,
          status: topic.status
        }
        this.updateId = topic._id
      })
    },
    createTopic () {
      this.dialogFormVisible = true
      this.dialogTitle = '创建'
      this.$nextTick(() => {
        this.$refs.form.resetFields()
      })
    },
    onTopicSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.dialogTitle === '创建') {
            this.addTopic(this.form).then((result) => {
              if (result) {
                this.dialogFormVisible = false
                this.getTopics()
              }
            })
          } else {
            this.updateTopic({
              ...this.form,
              id: this.updateId
            }).then((result) => {
              if (result) {
                this.dialogFormVisible = false
                this.getTopics()
              }
            })
          }
        }
      })
    },
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
