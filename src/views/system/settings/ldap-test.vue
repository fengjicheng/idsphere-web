<template>
  <el-form ref="form" :model="form" :rules="rules" :validate-on-rule-change="false" label-position="right" label-width="100px" style="width: 95%;padding-top: 20px;">
    <el-form-item label="用户名：" prop="username">
      <el-input v-model="form.username" autocomplete="off" clearable />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" type="password" show-password autocomplete="off" clearable />
    </el-form-item>
    <el-form-item>
      <div>
        <el-button size="mini" @click="cancel">取 消</el-button>
        <el-button type="primary" size="mini" :loading="loading" @click="handleSubmit">确 定</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'LoginForm',
  props: {
    form: {
      type: Object,
      default() {
        return {
          password: '',
          username: ''
        }
      }
    }
  },
  data() {
    return {
      loading: false,
      rules: {
        password: [
          { required: true, message: '请输入登录新密码', trigger: 'change' }
        ],
        username: [
          { required: true, message: '请重输入登录用户名', trigger: 'change' }
        ]
      }
    }
  },
  methods: {

    /* 提交表单 */
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return
        }
        // 执行登录测试
        this.loading = true
        this.loading = false
      })
    },

    /* 关闭表单 */
    cancel() {
      this.$emit('close')
    }
  }
}
</script>
