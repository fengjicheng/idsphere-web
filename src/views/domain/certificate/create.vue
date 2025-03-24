<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" :validate-on-rule-change="false" size="small" label-position="right" label-width="120px" style="width: 95%;padding-top: 20px;">
      <el-form-item label="证书平台：" prop="platform">
        <el-select v-model="form.platform" placeholder="请选择证书平台" clearable style="width: 100%;">
          <el-option v-for="item in platform" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱地址：">
        <el-input v-model="form.email" placeholder="请输入邮箱地址" autocomplete="off" clearable />
        <div class="help-block" style="color: #999; font-size: 12px">如果为空，则默认使用当前用户邮箱，用于创建ACME账户</div>
      </el-form-item>
      <el-form-item label="加密算法：" prop="encrypt">
        <el-select v-model="form.encrypt" placeholder="请选择加密算法" clearable style="width: 100%;">
          <el-option v-for="item in encrypt" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="申请域名：" prop="domain">
        <el-input v-model="form.domain" placeholder="支持通配符域名" autocomplete="off" clearable />
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
  name: 'CertificateRequestForm',
  props: {
    form: {
      type: Object,
      default() {
        return {
          platform: 1,
          domain: null,
          encrypt: 1,
          email: ''
        }
      }
    },
    loading: {
      type: Boolean
    }
  },
  data() {
    return {
      platform: [{
        value: 1,
        label: 'Let\'s Encrypt '
      }],
      encrypt: [{
        value: 1,
        label: 'RSA-2048'
      }],
      rules: {
        platform: [
          { required: true, message: '请选择证书注册平台', trigger: 'change' }
        ],
        domain: [
          { required: true, message: '请输入申请的域名', trigger: 'change' }
        ],
        encrypt: [
          { required: true, message: '请选择证书加密算法', trigger: 'change' }
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
