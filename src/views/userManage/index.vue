<template>
  <div class="app-container">
    <Table :dataSource="getList">
      <el-table
        slot-scope="data"
        :data="data.tableData"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row>
        <el-table-column align="center" label="ID" width="95">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="用户名" width="200" align="center">
          <template slot-scope="scope">
            {{ scope.row.login_name }}
          </template>
        </el-table-column>
        <el-table-column label="微信号" width="200" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.wechat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="钱包地址" align="center">
          <template slot-scope="scope">
            {{ scope.row.purse }}
          </template>
        </el-table-column>
        <el-table-column label="邮箱" width="200" align="center">
          <template slot-scope="scope">
            {{ scope.row.email }}
          </template>
        </el-table-column>
        <el-table-column label="余额" width="200" align="center">
          <template slot-scope="scope">
            {{ scope.row.balance }}
          </template>
        </el-table-column>
        <!-- <el-table-column class-name="status-col" label="状态" width="110" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column> -->
        <el-table-column align="center" prop="created_at" label="注册时间" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"/>
            <span>{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>
      </el-table>
    </Table>
  </div>
</template>

<script>
import { getList } from '@/api/user'
import Table from '@/components/Table'

export default {
  components: {
    Table
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  methods: {
    getList(params) {
      return getList(params).then((res) => {
        if (Number(res.code) === 0) {
          return {
            total: res.total,
            results: res.data
          }
        }
        this.$message.error(res.msg)
        return {}
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .pagination {
    float: right;
    padding-top: 10px;
  }
</style>

