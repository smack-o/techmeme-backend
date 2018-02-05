<template lang="html">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>添加餐厅</span>
    </div>
    <el-form ref="form" :model="form" label-width="130px" label-position="top">
      <el-form-item label="餐厅名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="餐厅英文名称">
        <el-input v-model="form.name_en"></el-input>
      </el-form-item>
      <el-form-item label="平均消费（人民币/人）">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="推荐理由">
        <el-input type="textarea" v-model="form.reason"></el-input>
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item>
        <div slot="label">
          <span>经纬度</span>
          <span>（请去<a target="_blank" href="http://api.map.baidu.com/lbsapi/getpoint/index.html">百度地图</a>标记地点，将经纬度复制到此输入框）</span>
        </div>
        <el-input v-model="form.lng_lat"></el-input>
      </el-form-item>
      <el-upload
        action="api/media/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" size="tiny">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即添加</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { addRestaurant } from '@/services/restaurant'
console.log(addRestaurant)
export default {
  name: 'RestaurantEdit',
  data () {
    return {
      form: {
        name: '',
        name_en: '',
        reason: '',
        address: '',
        lng_lat: ''
      },
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>
