<template>
  <div>
    <h3>企业微信应用</h3>
    <el-form ref="form" :model="form" label-position="top" label-width="100px">
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
  methods: {
    /* 提交表单 */
    handleSubmit() {
      this.$emit('submit', this.form)
    }
  }
}
</script>
