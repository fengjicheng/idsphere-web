<template>
  <div>
    <h3>站点基本配置</h3>
    <el-form ref="form" :model="form" :rules="rules" :validate-on-rule-change="false" status-icon label-position="top" label-width="100px">
      <el-form-item label="访问站点 URL" prop="externalUrl">
        <el-input v-model="form.externalUrl" autocomplete="off" size="small" clearable />
        <div class="help-block" style="color: #999; font-size: 12px">重要，应设置为实际外部访问的 URL, 用于系统回调和 SSO 相关功能, 格式为: http[s]://&lt;address&gt;[:&lt;port&gt;]，你还可以尝试点击《<el-link :underline="false" type="primary" style="font-size: 12px" @click="handleGetBaseUrl">获取</el-link>》当前访问 URL。</div>
      </el-form-item>
      <el-form-item label="站点 Logo">
        <el-upload
          ref="uploadLogo"
          name="logo"
          class="logo-uploader"
          accept="image/jpeg,image/jpg,image/png"
          :headers="{ Authorization: `Bearer ${token}` }"
          :action="uploadUrl('logo')"
          :limit="1"
          :multiple="false"
          :auto-upload="true"
          :file-list="logoFileList"
          :show-file-list="false"
          :on-success="handleLogoSuccess"
        >
          <img v-if="form.logo !== null" :src="form.logo" class="logo">
          <img v-else src="../../../assets/logo.png" class="logo">
        </el-upload>
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
import { getToken } from '@/utils/auth'

export default {
  name: 'SiteForm',
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
      baseUrl() {
        const port = window.location.port ? `:${window.location.port}` : ''
        return `${window.location.protocol}//${window.location.hostname}${port}`
      },
      token: getToken(),
      logoFileList: [],
      rules: {
        externalUrl: [
          { required: true, message: '请输入站点访问URL', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    baseUploadUrl() {
      if (process.env.VUE_APP_BASE_API === '/') {
        const port = window.location.port ? `:${window.location.port}` : ''
        return `${window.location.protocol}//${window.location.hostname}${port}/api/v1/settings/`
      } else {
        return process.env.VUE_APP_BASE_API + `/api/v1/settings/`
      }
    }
  },
  methods: {
    uploadUrl(type) {
      return this.baseUploadUrl + `${type}Upload`
    },

    /* 获取站点访问 URL */
    handleGetBaseUrl() {
      this.form.externalUrl = this.baseUrl()
    },

    /* Logo 上传成功回调 */
    handleLogoSuccess(res, file, fileList) {
      if (res.code === 0) {
        this.$message({
          message: res.msg,
          type: 'success',
          duration: 1000
        })
        // 预览
        this.form.logo = res.path
      } else {
        this.$message({
          message: res.msg,
          type: 'error',
          duration: 1000
        })
      }
      // 清空fileList，否则无法更改图片
      this.$refs.uploadLogo.clearFiles()
    },

    /* 提交表单 */
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return
        }
        const data = { externalUrl: this.form.externalUrl }
        this.$emit('submit', data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// 图片样式
.logo-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    .logo {
      width: 108px;
      height: 108px;
      display: block;
    }
  }
  .el-upload:hover {
    border-color: #409EFF;
  }
}
</style>
<style scoped>
.help-block {
  margin-top: 4px;
  margin-bottom: 4px;
  line-height: 1.5;
}
</style>
