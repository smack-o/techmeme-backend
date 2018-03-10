<template lang="html">
  <div class="">
    <el-breadcrumb class="bread-wrapper" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'Recommends' }">推荐列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{ type === 'create' ? '添加': '编辑'}}推荐文章</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ type === 'create' ? '添加': '编辑'}}推荐文章</span>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="130px" label-position="top">
        <el-form-item label="文章主标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="文章副标题" prop="subtitle">
          <el-input v-model="form.subtitle"></el-input>
        </el-form-item>
        <el-form-item label="推荐理由" prop="reason">
          <el-input type="textarea" v-model="form.reason"></el-input>
        </el-form-item>
        <el-form-item label="推荐文章（餐厅/去处）" prop="reason">
          <ul>
            <li v-for="(article, index) in form.articles" :key="index">
              <router-link :to="{ name: 'Restaurant', params: { id: article.id }}"><el-button type="text" class="button">文章：{{article.name}}</el-button></router-link>
            </li>
            <el-button type="button" name="button" @click="addRecommendArticle">添加文章</el-button>
          </ul>
        </el-form-item>
        <el-form-item prop="pictures">
          <span slot="label">上传封面图片（可拖拽，可多张）</span>
          <el-upload
            :multiple="true"
            :drag="true"
            action="/api/media/"
            list-type="picture-card"
            :file-list="form.pictures"
            :on-preview="handlePictureCardPreview"
            :on-success="handlePictureSuccess"
            :on-remove="handlePictureRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">{{ type === 'create' ? '立即添加': '确定修改'}}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog title="推荐文章" :visible.sync="recommendArticleVisible">
      <el-form ref="articleForm" :model="currentRecommendArticle" :rules="articleFormRules">
        <el-form-item label="文章" prop="id">
          <!-- <el-input v-model="currentRecommendArticle.id"></el-input> -->
          <el-cascader
            :options="options"
            @active-item-change="handleItemChange"
            :props="cascaderProps"
            @change="onCascaderChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="推荐理由" prop="reason">
          <el-input type="textarea" v-model="currentRecommendArticle.reason"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="recommendArticleVisible = false">取 消</el-button>
        <el-button type="primary" @click="onRecommendArticleSubmit">提交</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'RestaurantEdit',
  data () {
    const validatePictures = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('请上传至少一张文章图片'))
      } else {
        callback()
      }
    }
    return {
      cascaderProps: {
        value: 'value',
        children: 'articles'
      },
      options: [],
      type: 'create',
      form: {
        title: '',
        subtitle: '',
        reason: '',
        restaurants: '',
        articles: [],
        pictures: []
      },
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ],
        subtitle: [
          { required: true, message: '请输入文章副标题', trigger: 'blur' }
        ],
        reason: [
          { required: true, message: '请输入推荐理由', trigger: 'blur' }
        ],
        pictures: [
          { required: true, validator: validatePictures, trigger: 'blur' }
        ]
      },
      articleFormRules: {
        id: [
          { required: true, message: '请选择文章', trigger: 'blur' }
        ],
        reason: [
          { required: true, message: '请输入推荐理由', trigger: 'blur' }
        ]
      },
      dialogImageUrl: '',
      dialogVisible: false,
      recommendArticleVisible: false,
      currentRecommendArticleIndex: undefined,
      currentRecommendArticle: {
        id: '',
        reason: '',
        data: {}
      }
    }
  },
  computed: {
    ...mapGetters('topic', {
      topicList: 'list'
    })
  },
  async created () {
    const id = this.$route.params.id
    this.getTopics().then(() => {
      this.options = this.topicList.map(item => ({
        label: item.name,
        value: item._id,
        articles: []
      }))
    })
    if (id === 'create') {
      this.type = 'create'
      return
    }
    this.type = 'edit'
    let restaurantData = this.$store.state.recommend.list.find(item => item._id === id)
    if (!restaurantData) {
      restaurantData = await this.getRecommend({ id })
    }

    if (!restaurantData) {
      this.$message.error('未找到文章信息')
      this.$router.replace({
        name: 'Recommends'
      })
      return
    }

    this.form = {
      ...this.form,
      ...restaurantData
    }
  },
  methods: {
    ...mapActions('restaurant', [
      'getList'
    ]),
    ...mapActions('recommend', [
      'addRecommend',
      'getRecommend',
      'updateRecommend'
    ]),
    ...mapActions('topic', [
      'getTopics'
    ]),
    onCascaderChange (val) {
      this.currentRecommendArticle.id = val[1]
    },
    handleItemChange (val) {
      this.getList({
        topic: val[0]
      }).then(result => {
        if (result.data && result.data.list) {
          this.options = this.options.map(item => {
            if (item.value === val[0]) {
              return {
                ...item,
                articles: result.data.list.map(l => ({
                  value: `${l._id}__${l.name}`,
                  label: l.name
                }))
              }
            }
            return item
          })
          console.log(this.options)
        }
      })
    },
    addRecommendArticle () {
      this.recommendArticleVisible = true
      this.$nextTick(() => {
        this.$refs.articleForm.resetFields()
        this.currentRecommendArticle = undefined
        this.currentRecommendArticle = {}
      })
    },
    onRecommendArticleSubmit () {
      if (this.currentRecommendArticleIndex === undefined) {
        this.$refs.articleForm.validate(valid => {
          if (valid) {
            console.log(this.currentRecommendArticle)
            const ids = this.currentRecommendArticle.id.split('__')
            this.form.articles.push({
              ...this.currentRecommendArticle,
              id: ids[0],
              name: ids[1]
            })
            console.log(this.form.articles)
            this.recommendArticleVisible = false
          }
        })
      }
    },
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const data = {
            ...this.form,
            pictures: this.form.pictures.map(picture => picture.name)
          }

          if (this.type === 'create') {
            return this.addRecommend(data).then((result) => {
              if (result) {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
                this.$router.push({
                  name: 'Recommends'
                })
                return
              }
              this.$message.error('添加失败')
            })
          }
          return this.updateRecommend({
            ...data,
            id: this.form._id
          }).then((result) => {
            if (result) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              return
            }
            this.$message.error('修改失败')
          })
        }
        console.log('error submit!!')
        this.$message({
          message: '信息未填完',
          type: 'warning'
        })
        return false
      })
    },
    handlePictureRemove (file, fileList) {
      console.log(file, fileList, this.form.pictures)
      this.form.pictures = this.form.pictures.filter(item => item.url !== file.url)
    },
    handlePictureSuccess (response, file, fileList) {
      this.form.pictures.push({
        name: response.data.data.filename,
        url: file.url
      })
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>
