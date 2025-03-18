<template>
  <div>
    <el-alert
      type="warning"
      show-icon
    >
      <slot name="title">
        如果域名是从域名服务商处同步过来的，请忽在此处进行修改，请使用《同步》功能将域名信息与本地保持同步。
      </slot>
    </el-alert>
    <el-form ref="form" :model="form" :rules="rules" :validate-on-rule-change="false" size="small" label-position="right" label-width="120px" style="width: 95%;padding-top: 20px;">
      <el-form-item label="证书：" prop="cert">
        <el-input v-model="form.cert" autocomplete="off" clearable />
      </el-form-item>
      <el-form-item label="私钥：" prop="key">
        <el-input v-model="form.key" autocomplete="off" clearable />
      </el-form-item>
      <el-form-item>
        <div>
          <el-button size="mini" @click="cancel">取 消</el-button>
          <el-button type="primary" size="mini" :loading="loading" @click="handleSubmit">确 定</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CertificateCreateForm',
  props: {
    form: {
      type: Object,
      default() {
        return {
          cert: '',
          key: ''
        }
      }
    },
    loading: {
      type: Boolean
    }
  },
  data() {
    return {
      rules: {
        cert: [
          { required: true, message: '请输入域名名称', trigger: 'change' }
        ],
        key: [
          { required: true, message: '请选择注册时间', trigger: 'change' }
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
        this.$emit('submit', this.form)
      })
    },

    /* 关闭表单 */
    cancel() {
      this.$emit('close')
    }
  }
}
</script>
