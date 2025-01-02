<template>
  <div>
    <h3>用户密码策略</h3>
    <el-form ref="form" :model="form" label-position="top" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="密码有效期">
            <el-input v-model="form.passwordExpireDays" autocomplete="off" size="small" clearable>
              <template slot="append">单位（天）</template>
            </el-input>
            <div class="help-block" style="color: #999; font-size: 12px">仅本地数据库中的用户受此影响。</div>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="设置密码最小长度">
            <el-input v-model="form.passwordLength" autocomplete="off" size="small" clearable>
              <template slot="append">单位（位）</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="设置密码复杂度（必须包含以下）">
        <el-checkbox-group v-model="form.passwordComplexity">
          <el-checkbox label="numbers">数字（0-9）</el-checkbox>
          <el-checkbox label="lowercase">小写字母（a-z）</el-checkbox>
          <el-checkbox label="uppercase">大写字母（A-Z）</el-checkbox>
          <el-checkbox label="specialCharacters">特殊字符（@、#、$、%、^、& 等）</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="到期修改密码提醒">
        <el-input v-model="form.passwordExpiryReminderDays" autocomplete="off" size="small" clearable style="width: 300px">
          <template #prepend>密码将在到期前</template>
          <template #append>天提醒</template>
        </el-input>
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
  methods: {
    /* 提交表单 */
    handleSubmit() {
      const { passwordExpireDays, passwordLength, passwordComplexity, passwordExpiryReminderDays } = this.form
      const data = {
        passwordExpireDays: String(passwordExpireDays),
        passwordLength: String(passwordLength),
        passwordComplexity: JSON.stringify(passwordComplexity),
        passwordExpiryReminderDays: String(passwordExpiryReminderDays)
      }
      this.$emit('submit', data)
    }
  }
}
</script>
