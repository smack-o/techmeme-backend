<template>
  <div class="login-wrapper">
      <div @keyup.enter="submitForm('ruleForm')" class="grid-content">
        <el-form ref="ruleForm" :label-position="labelPosition" label-width="100px" :model="formLabelAlign" :rules="rules">
          <el-form-item label="账号" prop="username">
            <el-input v-model="formLabelAlign.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="formLabelAlign.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
          </el-form-item>
        </el-form>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      labelPosition: 'top',
      formLabelAlign: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions('user', [
      'login',
      'getUser'
    ]),
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login({
            username: this.formLabelAlign.username,
            password: this.formLabelAlign.password
          }).then(() => {
            this.getUser().then(success => {
              if (success) {
                this.$message('登陆成功')
                this.$router.push('/')
              }
            })
          })
          console.log('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
        return true
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login-wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-form-item__content {
    margin: 0 auto;
  }

</style>
