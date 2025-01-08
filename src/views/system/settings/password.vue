<template>
  <div>
    <h3>用户密码策略</h3>
    <el-form ref="form" :model="form" :rules="rules" :validate-on-rule-change="false" status-icon label-position="top" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="密码有效期" prop="passwordExpireDays">
            <el-input v-model="form.passwordExpireDays" autocomplete="off" size="small" clearable>
              <template slot="append">单位（天）</template>
            </el-input>
            <div class="help-block" style="color: #999; font-size: 12px">仅本地数据库中的用户受此影响，建议大于或等于 30 天。</div>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="设置密码最小长度" prop="passwordLength">
            <el-input v-model="form.passwordLength" autocomplete="off" size="small" clearable>
              <template slot="append">单位（位）</template>
            </el-input>
            <div class="help-block" style="color: #999; font-size: 12px">建议密码长度应至少大于 6 位。</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="设置密码复杂度（必须包含以下）" prop="passwordComplexity">
        <el-checkbox-group v-model="form.passwordComplexity">
          <el-checkbox label="numbers">数字（0-9）</el-checkbox>
          <el-checkbox label="lowercase">小写字母（a-z）</el-checkbox>
          <el-checkbox label="uppercase">大写字母（A-Z）</el-checkbox>
          <el-checkbox label="specialCharacters">特殊字符（@、#、$、%、^、& 等）</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="到期修改密码提醒" prop="passwordExpiryReminderDays">
        <el-input v-model="form.passwordExpiryReminderDays" autocomplete="off" size="small" clearable style="width: 500px">
          <template #prepend>密码将在到期前</template>
          <template #append>天提醒</template>
        </el-input>
        <div class="help-block" style="color: #999; font-size: 12px">密码过期提醒将以邮件的形式，需要配置发件服务器，设置为 99999 表示不提醒。</div>
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
  name: 'PasswordForm',
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
      rules: {
        passwordExpireDays: [
          { required: true, message: '请设置密码有效期', trigger: 'change' }
        ],
        passwordLength: [
          { required: true, message: '请设置密码最小长度', trigger: 'change' }
        ],
        passwordComplexity: [
          { required: true, message: '请设置密码复杂度', trigger: 'change' }
        ],
        passwordExpiryReminderDays: [
          { required: true, message: '请设置密码过期天数', trigger: 'change' }
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
        const { passwordExpireDays, passwordLength, passwordComplexity, passwordExpiryReminderDays } = this.form
        const data = {
          passwordExpireDays: String(passwordExpireDays),
          passwordLength: String(passwordLength),
          passwordComplexity: JSON.stringify(passwordComplexity),
          passwordExpiryReminderDays: String(passwordExpiryReminderDays)
        }
        this.$emit('submit', data, (result) => {})
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
