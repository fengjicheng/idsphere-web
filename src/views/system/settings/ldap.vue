<template>
  <div>
    <h3>LDAP 设置</h3>
    <el-form ref="form" :model="form" label-position="top" label-width="100px">
      <el-form-item label="服务器地址">
        <el-input v-model="form.ldapAddress" autocomplete="off" size="small" clearable />
        <div class="help-block" style="color: #999; font-size: 12px">访问地址，格式为：ldap[s]://&lt;host&gt;:&lt;port&gt;，如果使用 Windows AD，建议使用 ldaps 协议连接，否则无法通过 IDSphere 平台更改 Windows AD 用户密码。</div>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="14">
          <el-form-item label="用户查找范围">
            <el-input v-model="form.ldapSearchDn" autocomplete="off" size="small" clearable />
            <div class="help-block" style="color: #999; font-size: 12px">设置允许登录的 OU 范围，如果你需要配置多个 OU，不同 OU 之间需要使用 & 间隔。</div>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="密码过期时间">
            <el-input v-model="form.ldapUserPasswordExpireDays" autocomplete="off" size="small" clearable>
              <template slot="append">单位（天）</template>
            </el-input>
            <div class="help-block" style="color: #999; font-size: 12px">仅针对 Windows AD，需与 AD 中实际设置的策略保持一致。</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="Bind 用户">
            <el-input v-model="form.ldapBindDn" autocomplete="off" size="small" clearable />
            <div class="help-block" style="color: #999; font-size: 12px">格式如：cn=admin,dc=idsphere,dc=cn，请确保该用户具有足够的权限。</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Bind 用户密码">
            <el-input v-model="form.ldapBindPassword" type="password" show-password autocomplete="off" size="small" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用户属性">
            <el-input v-model="form.ldapFilterAttribute" autocomplete="off" size="small" clearable />
            <div class="help-block" style="color: #999; font-size: 12px">如果是 OpenLDAP 则属性为 uid，如果是 Windows AD 则属于为 sAMAccountName。</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <div>
          <el-button size="mini" @click="handleTest">登录测试</el-button>
          <el-button type="primary" size="mini" @click="handleSubmit">确 定</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'LdapForm',
  props: {
    form: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    handleTest() {
      this.$emit('test', this.form)
    },
    /* 提交表单 */
    handleSubmit() {
      const { ldapAddress, ldapSearchDn, ldapBindDn, ldapBindPassword, ldapFilterAttribute, ldapUserPasswordExpireDays } = this.form
      const data = {
        ldapAddress: ldapAddress,
        ldapSearchDn: ldapSearchDn,
        ldapBindDn: ldapBindDn,
        ldapFilterAttribute: ldapFilterAttribute,
        ldapUserPasswordExpireDays: String(ldapUserPasswordExpireDays)
      }
      if (ldapBindPassword) {
        data.ldapBindPassword = ldapBindPassword
      }
      this.$emit('submit', data)
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
