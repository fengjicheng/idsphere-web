<template>
  <el-form ref="form" :model="form" :rules="rules" :validate-on-rule-change="false" label-position="right" label-width="100px" style="width: 95%;padding-top: 20px;">
    <el-form-item label="收件地址：" prop="reciver">
      <el-input v-model="form.reciver" autocomplete="off" clearable />
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
  name: 'MailTestForm',
  props: {
    form: {
      type: Object,
      default() {
        return {
          reciver: ''
        }
      }
    }
  },
  data() {
    return {
      loading: false,
      rules: {
        reciver: [
          { required: true, message: '请输入收件人地址', trigger: 'change' }
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
