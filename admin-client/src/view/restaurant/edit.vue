<template lang="html">
  <div class="">
    <el-breadcrumb class="bread-wrapper" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'RestaurantList' }">文章列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{ type === 'create' ? '添加': '编辑'}}文章</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ type === 'create' ? '添加': '编辑'}}文章</span>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="130px" label-position="top">
        <el-form-item label="文章主题" prop="topic">
          <el-select v-model="form.topic" placeholder="请选择">
            <el-option
              v-for="item in topicList"
              :key="item._id"
              :label="item.name"
              :value="item._id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="文章英文名称" prop="name_en">
          <el-input v-model="form.name_en"></el-input>
        </el-form-item>
        <el-form-item label="平均消费（人民币/人）" prop="price">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="推荐理由" prop="reason">
          <el-input type="textarea" v-model="form.reason"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="contact">
          <el-input v-model="form.contact"></el-input>
        </el-form-item>
        <el-form-item label="营业时间" prop="business_hours">
          <el-time-picker
            v-model="form.business_hours[0]"
            placeholder="营业开始时间">
          </el-time-picker>
          <el-time-picker
            arrow-control
            v-model="form.business_hours[1]"
            :picker-options="{
              minTime: form.business_hours[0]
            }"
            placeholder="营业结束时间">
          </el-time-picker>
        </el-form-item>
        <el-form-item prop="lng_lat">
          <span slot="label">
            <span>经纬度</span>
            <span>（请去<a target="_blank" href="http://api.map.baidu.com/lbsapi/getpoint/index.html">百度地图</a>标记地点，将经纬度复制到此输入框）</span>
          </span>
          <el-input v-model="form.lng_lat"></el-input>
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
    const validateBusinessHours = (rule, value, callback) => {
      if (!value[0] || !value[1]) {
        callback(new Error('请填写营业时间'))
      } else {
        callback()
      }
    }
    const validateLngLat = (rule, value, callback) => {
      if (value.split(',').length === 2) {
        callback()
      } else {
        callback(new Error('请填写正确的经纬度信息'))
      }
    }
    return {
      type: 'create',
      form: {
        topic: '',
        name: '',
        name_en: '',
        price: '',
        reason: '',
        address: '',
        lng_lat: '',
        contact: '',
        business_hours: [new Date(2016, 9, 10, 8, 0), new Date(2016, 9, 10, 22, 0)],
        pictures: []
      },
      rules: {
        topic: [
          { required: true, message: '请选择文章主题', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入文章名称', trigger: 'blur' }
        ],
        name_en: [
          { required: true, message: '请输入文章英文名称', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入人均消费', trigger: 'blur' }
        ],
        reason: [
          { required: true, message: '请输入推荐理由', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        lng_lat: [
          { required: true, validator: validateLngLat, trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '请输入文章联系电话', trigger: 'blur' }
        ],
        pictures: [
          { required: true, validator: validatePictures, trigger: 'blur' }
        ],
        business_hours: [
          { required: true, validator: validateBusinessHours }
        ]
      },
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters('topic', {
      topicList: 'list'
    })
  },
  async created () {
    const id = this.$route.params.id
    this.getTopics()
    if (id === 'create') {
      this.type = 'create'
      return
    }
    this.type = 'edit'
    let restaurantData = this.$store.state.restaurant.list.find(item => item._id === id)
    if (!restaurantData) {
      restaurantData = await this.getRestaurant({ id })
    }

    if (!restaurantData) {
      this.$message.error('未找到文章信息')
      this.$router.replace({
        name: 'RestaurantList'
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
      'getRestaurant',
      'addRestaurant',
      'updateRestaurant'
    ]),
    ...mapActions('topic', [
      'getTopics'
    ]),
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const data = {
            // topic: this.form.topic,
            // name: this.form.name,
            // name_en: this.form.name_en,
            // price: this.form.price,
            // reason: this.form.reason,
            // address: this.form.address,
            // lng_lat: this.form.lng_lat,
            // contact: this.form.contact,
            // business_hours: this.form.business_hours,
            ...this.form,
            pictures: this.form.pictures.map(picture => picture.name)
          }

          if (this.type === 'create') {
            return this.addRestaurant(data).then((result) => {
              if (result) {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
                this.$router.push({
                  name: 'RestaurantList'
                })
                return
              }
              this.$message.error('添加失败')
            })
          }
          return this.updateRestaurant({
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
