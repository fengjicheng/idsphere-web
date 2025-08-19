<template>
  <el-form ref="form" :model="form" :rules="rules" :validate-on-rule-change="false" label-position="right" label-width="120px" style="width: 95%" size="small">
    <el-form-item label="集群名称：" prop="name">
      <el-input v-model="form.name" autocomplete="off" clearable style="width: 400px" />
    </el-form-item>
    <el-form-item label="认证模式：" prop="auth_type">
      <el-radio-group v-model="form.auth_type">
        <el-radio :label="1">kubeconfig 文件</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Kubeconfig：">
      <div style="display: flex; align-items: flex-end;">
        <el-input v-model="form.kubeconfig" type="textarea" :rows="5" placeholder="请将文件内容粘贴在此或通过文件上传" autocomplete="off" clearable style="width: 410px;padding-right: 10px;" />
        <el-upload
          ref="kubeconfigUpload"
          class="upload-demo"
          action=""
          accept="*"
          :multiple="false"
          :limit="1"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="handleKubeconfigUpload"
        >
          <el-button slot="trigger" icon="el-icon-upload2" size="mini" type="primary">上传文件</el-button>
        </el-upload>
      </div>
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
  name: 'ClusterAddForm',
  props: {
    form: {
      type: Object,
      default() {
        return {
          name: '',
          auth_type: 1,
          kubeconfig: ''
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
        name: [
          { required: true, message: '请输入集群名称', trigger: 'change' }
        ],
        kubeconfig: [
          { required: true, message: '请上传 Kubeconfig 配置文件', trigger: 'change' }
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

    /* 读取证书文件 */
    handleKubeconfigUpload(file) {
      const reader = new FileReader()
      reader.onload = e => {
        this.form.kubeconfig = e.target.result.trim()
      }
      reader.readAsText(file.raw)
      this.$refs.kubeconfigUpload.clearFiles()
      return false
    },

    /* 关闭表单 */
    cancel() {
      this.$emit('close')
    }
  }
}
</script>
