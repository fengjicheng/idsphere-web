<template>
  <el-table :data="tableData" tooltip-effect="dark" style="width: 100%; margin-top:10px;" size="mini" border>
    <el-table-column type="selection" width="40" />
    <el-table-column show-overflow-tooltip prop="domain" label="域名" min-width="4%" />
    <el-table-column :formatter="dateFormat" prop="start_at" label="开始时间" min-width="3%" />
    <el-table-column :formatter="dateFormat" prop="expiration_at" label="过期时间" min-width="3%" />
    <el-table-column prop="type" label="证书类型" min-width="2%">
      <template slot-scope="scope">
        <el-tag v-if="scope.row.type === 1" size="mini" type="info" effect="dark">DV 证书</el-tag>
        <el-tag v-if="scope.row.type === 2" size="mini" effect="dark">OV 证书 </el-tag>
        <el-tag v-if="scope.row.type === 3" size="mini" type="success" effect="dark">EV 证书 </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="server_type" label="服务器类型" min-width="2%">
      <template slot-scope="scope">
        <el-tag v-if="scope.row.server_type === 1" size="mini" effect="plain">NGINX</el-tag>
        <el-tag v-if="scope.row.server_type === 2" size="mini" effect="plain">IIS </el-tag>
        <el-tag v-if="scope.row.server_type === 3" size="mini" effect="plain">Apache</el-tag>
        <el-tag v-if="scope.row.server_type === 4" size="mini" effect="plain">Tomcat</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="status" label="状态" min-width="2%" />
    <el-table-column label="操作" min-width="5%" align="center">
      <template slot-scope="scope">
        <el-button :loading="scope.row.loading" size="mini" type="text" @click="handleDownload(scope.row)">下载</el-button>
        <el-button size="mini" type="text" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import moment from 'moment'

export default {
  name: 'CertificateListTable',
  props: {
    tableData: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  methods: {

    /* 下载 */
    handleDownload(value) {
      this.$set(value, 'loading', true)
      this.$emit('download', value, (success) => {
        this.$set(value, 'loading', false)
      })
    },

    /* 删除 */
    handleDelete(value) {
      this.$emit('delete', value)
    },

    /* 日期时间格式化 */
    dateFormat: function(row, column) {
      const date = row[column.property]
      if (date === undefined || date === null) {
        return ''
      } else {
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  }
}
</script>
