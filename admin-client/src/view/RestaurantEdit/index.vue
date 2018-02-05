<template lang="html">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>添加餐厅</span>
    </div>
    <el-form ref="form" :model="form" :rules="rules" label-width="130px" label-position="top">
      <el-form-item label="餐厅名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="餐厅英文名称" prop="name_en">
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
      <el-form-item label="联系电话" prop="concat">
        <el-input v-model="form.concat"></el-input>
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
          action="api/media/"
          list-type="picture-card"
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
        <el-button type="primary" @click="onSubmit">立即添加</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<style media="screen" lang="less">
  .el-upload-dragger {
    width: unset;
    height: unset;
    border: 0;
  }
</style>
<script>
import { addRestaurant } from '@/services/restaurant'
console.log(addRestaurant)
export default {
  name: 'RestaurantEdit',
  data () {
    const validatePictures = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('请上传至少一张餐厅图片'))
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
    return {
      form: {
        name: '',
        name_en: '',
        price: '',
        reason: '',
        address: '',
        lng_lat: '',
        concat: '',
        business_hours: [new Date(2016, 9, 10, 8, 0), new Date(2016, 9, 10, 22, 0)],
        pictures: []
      },
      rules: {
        name: [
          { required: true, message: '请输入餐厅名称', trigger: 'blur' }
        ],
        name_en: [
          { required: true, message: '请输入餐厅英文名称', trigger: 'blur' }
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
          { required: true, message: '请输入餐厅经纬度', trigger: 'blur' }
        ],
        concat: [
          { required: true, message: '请输入餐厅联系电话', trigger: 'blur' }
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
  methods: {
    onSubmit () {
      console.log(this.form)
      this.$refs.form.validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handlePictureRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureSuccess (response, file, fileList) {
      this.form.pictures.push({
        name: response.data.filename,
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
