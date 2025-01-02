<template>
  <div>
    <h3>安全设置</h3>
    <el-form ref="form" :model="form" label-position="top" label-width="100px">
      <el-form-item label="双因素认证">
        <el-switch v-model="form.mfa" />
        <div class="help-block" style="color: #999; font-size: 12px;">建议开启，开启后登录时需要使用身份验证器验证的验证码, 也可以通过该验证码重置自己的密码和获取账号资产密码信息。</div>
      </el-form-item>
      <el-form-item label="提供商名称">
        <el-input v-model="form.issuer" autocomplete="off" size="small" clearable style="width: 600px" />
        <div class="help-block" style="color: #999; font-size: 12px">身份验证器扫码后显示的名称，也作为 SSO  提供商对外信息展示。</div>
      </el-form-item>
      <el-form-item>
        <div>
          <el-button type="primary" size="mini" @click="handleSubmit">确 定</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SecurityForm',
  props: {
    form: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    /* 提交表单 */
    handleSubmit() {
      const { mfa, issuer } = this.form
      this.$emit('submit', { mfa: mfa ? 'true' : 'false', issuer: issuer })
    }
  }
}
</script>
