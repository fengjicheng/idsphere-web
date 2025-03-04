<template>
  <el-form ref="form" :model="form" :rules="rules" :validate-on-rule-change="false" size="small" label-position="right" label-width="120px" style="width: 95%">
    <el-form-item label="服务商名称：" prop="name">
      <el-input v-model="form.name" autocomplete="off" clearable />
      <div class="help-block" style="color: #999; font-size: 12px">此名称不具备实际的意义，主要用于用户识别</div>
    </el-form-item>
    <el-form-item label="服务商类型：" prop="type">
      <el-radio-group v-model="form.type">
        <el-radio :label="1">阿里云</el-radio>
        <el-radio :label="2">华为云</el-radio>
        <el-radio :label="3">腾讯云</el-radio>
        <el-radio :label="4">其它</el-radio>
      </el-radio-group>
      <div class="help-block" style="color: #999; font-size: 12px">需要确保与实际的对应</div>
    </el-form-item>
    <el-form-item label="AccessKey：" prop="access_key">
      <el-input v-if="showAccessKey || form.id === undefined" v-model="form.access_key" show-password autocomplete="off" type="password" clearable />
      <el-button v-else type="primary" size="mini" @click="handleAccessKey">点击更新</el-button>
      <div class="help-block" style="color: #999; font-size: 12px">用于 API 对接，实现域名同步和域名记录管理，目前仅支持阿里云、华为云和腾讯云</div>
    </el-form-item>
    <el-form-item label="SecretKey：" prop="secret_key">
      <el-input v-if="showSecretKey || form.id === undefined" v-model="form.secret_key" show-password autocomplete="off" type="password" clearable />
      <el-button v-else type="primary" size="mini" @click="handleSecretKey">点击更新</el-button>
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
  name: 'DomainProviderAddForm',
  props: {
    form: {
      type: Object,
      default() {
        return {
          name: '',
          type: 1,
          access_key: null,
          secret_key: null
        }
      }
    },
    loading: {
      type: Boolean
    }
  },
  data() {
    return {
      showAccessKey: false,
      showSecretKey: false,
      rules: {
        name: [
          { required: true, message: '请输入服务商名称', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择服务商类型', trigger: 'change' }
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

    /* 修改 AccessKey */
    handleAccessKey() {
      this.showAccessKey = true
    },

    /* 修改 SecretKey */
    handleSecretKey() {
      this.showSecretKey = true
    },

    /* 关闭表单 */
    cancel() {
      this.$emit('close')
    }
  }
}
</script>
