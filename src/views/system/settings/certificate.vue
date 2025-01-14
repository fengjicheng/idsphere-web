<template>
  <div>
    <h3>密钥证书管理</h3>
    <el-form ref="form" :model="form" :rules="rules" :validate-on-rule-change="false" status-icon label-position="top" label-width="100px">
      <el-alert
        title="警告"
        type="error"
        show-icon
        description="更换证书会导致使用 SAML2 协议接入的站点无法登录，需要对 SAML2 SP 进行手动替换。可能会导致用户密码无法解密（影响登录）、系统配置中的敏感信息无法解密（如：LDAP 绑定用户密码、发件邮箱密码等）和资产账号密码无法解密，在替换新证书前请务必手工完成旧证书和数据库的备份。"
        style="margin-bottom: 10px;"
      />
      <el-alert
        title="重要提示"
        type="warning"
        show-icon
        style="margin-bottom: 10px;"
      >
        <slot name="description">
          证书和密钥将影响数据库敏感信息加密和 SAML2 认证，如果未上传证书和密钥，IDSphere 平台将会使用默认的证书和密钥。为避免敏感信息泄露，生产环境强烈建议使用自定义的证书和密钥，可以使用《<a href="https://www.qvdv.net/tools/qvdv-csrpfx.html" target="_blank" style="color: red">在线生成工具</a>》制作自定义证书及密钥。
        </slot>
      </el-alert>
      <el-form-item label="证书" prop="certificate">
        <el-input v-model="form.certificate" type="textarea" :rows="7" autocomplete="off" clearable style="width: 660px;padding-right: 10px;" />
        <el-button type="primary" icon="el-icon-upload2" size="mini">证书上传</el-button>
        <div class="help-block" style="color: #999; font-size: 12px">证书文件通常以<span class="gray-bg">-----BEGIN CERTIFICATE-----</span>开头，以<span class="gray-bg">-----END CERTIFICATE-----</span>结尾。</div>
      </el-form-item>
      <el-form-item label="私钥（不能外泄的私有密钥）" prop="privateKey">
        <el-input v-model="form.privateKey" type="textarea" :rows="7" autocomplete="off" clearable style="width: 660px;padding-right: 10px;" />
        <el-button type="primary" icon="el-icon-upload2" size="mini">私钥上传</el-button>
        <div class="help-block" style="color: #999; font-size: 12px">私钥文件通常以<span class="gray-bg">-----BEGIN PRIVATE KEY-----</span>开头，以<span class="gray-bg">-----END PRIVATE KEY-----</span>结尾。</div>
      </el-form-item>
      <el-form-item label="公钥（对外公开的密钥）" prop="publicKey">
        <el-input v-model="form.publicKey" type="textarea" :rows="7" autocomplete="off" clearable style="width: 660px;padding-right: 10px;" />
        <el-button type="primary" icon="el-icon-upload2" size="mini">公钥上传</el-button>
        <div class="help-block" style="color: #999; font-size: 12px">公钥文件通常以<span class="gray-bg">-----BEGIN PUBLIC KEY-----</span>开头，以<span class="gray-bg">-----END PUBLIC KEY-----</span>结尾。</div>
      </el-form-item>
      <el-form-item>
        <div>
          <el-button size="mini" :loading="loading" @click="handleTest">密钥及证书测试</el-button>
          <el-button type="primary" size="mini" @click="handleSubmit">确 定</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { certTest } from '@/api/system/settings'

export default {
  name: 'CertificateForm',
  props: {
    form: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      loading: false,
      rules: {
        certificate: [
          { required: true, message: '请上传证书', trigger: 'change' }
        ],
        publicKey: [
          { required: true, message: '请上传私钥', trigger: 'change' }
        ],
        privateKey: [
          { required: true, message: '请上传公钥', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    /* 密钥测试 */
    handleTest() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return
        }
        this.loading = true // 开启加载状态
        const { certificate, publicKey, privateKey } = this.form
        certTest({ certificate: certificate, publicKey: publicKey, privateKey: privateKey }).then(res => {
          if (res.code === 0) {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1000
            })
          }
        }).catch(res => {}).finally(() => {
          this.loading = false
        })
      })
    },

    /* 提交表单 */
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return
        }
        const { certificate, publicKey, privateKey } = this.form
        this.$emit('submit', { certificate: certificate, publicKey: publicKey, privateKey: privateKey }, (result) => {})
      })
    }
  }
}
</script>
<style scoped>
.help-block {
  margin-top: 4px;
  margin-bottom: 4px;
  line-height: 1.5;
}
.gray-bg {
  background-color: #f0f0f0;
  border-radius: 4px;
  padding: 0 2px;
  margin: 2px;
}
</style>
