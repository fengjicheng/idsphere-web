<template>
  <div>
    <h3>发件服务器</h3>
    <el-form ref="form" :model="form" label-position="top" label-width="100px">
      <el-form-item>
        <div>
          <el-button size="mini" @click="handleTest">发件测试</el-button>
          <el-button type="primary" size="mini" @click="handleSubmit">确 定</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'MailForm',
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
      this.$emit('submit', this.form)
    }
  }
}
</script>
