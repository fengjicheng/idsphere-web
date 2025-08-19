<template>
  <el-table :data="tableData" tooltip-effect="dark" style="width: 100%; margin-top:10px;" size="mini" border>
    <el-table-column type="selection" width="40" />
    <el-table-column prop="status" label="集群状态" min-width="3%" />
    <el-table-column prop="name" label="集群名称" min-width="5%" />
    <el-table-column prop="version" label="版本" min-width="3%" />
    <el-table-column label="控制台" min-width="3%" align="center">
      <template slot-scope="scope">
        <el-button size="mini" type="primary" plain @click="handleConsole(scope.row)">管理控制台</el-button>
      </template>
    </el-table-column>
    <el-table-column label="操作" min-width="10%" align="center">
      <template slot-scope="scope">
        <el-button size="mini" type="text" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button size="mini" type="text" @click="handleDelete(scope.row)">删除</el-button>
        <el-button size="mini" type="text">授权</el-button>
        <el-button size="mini" type="text">同步</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'ClusterTable',
  props: {
    tableData: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  methods: {
    /* 编辑按钮 */
    handleEdit(value) {
      this.$emit('edit', value)
    },

    /* 删除按钮 */
    handleDelete(value) {
      this.$emit('delete', value)
    },

    /* 控制台按钮 */
    handleConsole(value) {
      sessionStorage.setItem(value.name, value.uuid)
      const clusterName = encodeURIComponent(value.name)
      window.open(`/kubernetes/cluster/dashboard?cluster=${clusterName}`, '_blank')
    }
  }
}
</script>

<style scoped>
.el-button-text {
    border-color: transparent;
    color: #606266;
    background: transparent;
    padding-left: 0;
    padding-right: 0;
}
</style>
