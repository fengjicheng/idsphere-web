<template>
  <div>
    <h3>飞书应用</h3>
    <el-form ref="form" :model="form" :rules="rules" :validate-on-rule-change="false" status-icon label-position="top" label-width="100px">
      <el-form-item label="Corp ID" prop="wechatCorpId">
        <el-input v-model="form.wechatCorpId" autocomplete="off" size="small" clearable style="width: 600px;" />
      </el-form-item>
      <el-form-item label="Agent ID" prop="wechatAgentId">
        <el-input v-model="form.wechatAgentId" autocomplete="off" size="small" clearable style="width: 600px;" />
      </el-form-item>
      <el-form-item label="Secret" prop="wechatSecret">
        <el-input v-if="showPassword" v-model="form.wechatSecret" type="password" show-password autocomplete="off" size="small" clearable style="width: 600px;" />
        <el-button v-else type="primary" size="mini" @click="handlePasswordUpdate">点击设置 AppSecret</el-button>
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
  name: 'WechatForm',
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
      showPassword: false,
      rules: {
        wechatCorpId: [
          { required: true, message: '请输入企业微信应用 CorpId', trigger: 'change' }
        ],
        wechatAgentId: [
          { required: true, message: '请输入企业微信应用 AgentId', trigger: 'change' }
        ],
        wechatSecret: [
          { required: false, message: '请输入企业微信应用 Secret', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    'showPassword'(val) {
      if (val) {
        this.rules.wechatSecret[0].required = true
      } else {
        this.rules.wechatSecret[0].required = false
        this.$refs.form.clearValidate()
      }
    }
  },
  methods: {

    /* 更新AppSecret */
    handlePasswordUpdate() {
      this.showPassword = true
    },

    /* 提交表单 */
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return
        }
        const { wechatCorpId, wechatAgentId, wechatSecret } = this.form
        const data = {
          wechatCorpId: wechatCorpId,
          wechatAgentId: wechatAgentId
        }
        if (wechatSecret) {
          data.wechatSecret = wechatSecret
        }
        this.$emit('submit', data, (result) => {
          if (result.code === 0) {
            this.showPassword = false
          }
        })
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
</style>
