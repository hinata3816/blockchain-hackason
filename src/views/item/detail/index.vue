<template>
  <div class="app-container">
    <el-card style="margin-bottom: 20px;">
      <div class="btns">
        <el-button type="primary" size="small" class="m-b-20" @click="handleAddFileBtnClick">添加材料</el-button>
        <uploadDialog ref="uploadDialog" @refresh="refreshList" />
      </div>
      <Table :dataSource="getList">
        <el-table
          slot-scope="data"
          :data="data.tableData"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row>
          <el-table-column align="center" label="序号" width="50">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>
          <el-table-column label="文件名称" align="left">
            <template slot-scope="scope">
              <router-link :to="{ name: 'itemDetail', params: { id: scope.row.index }}" target="_blank">{{ scope.row.login_name }}</router-link>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="200">
            <template slot-scope="scope">
              <el-button type="primary" size="mini"  @click="open('QmfMZ5fVBhkdXiohmC6mZAyjcEuayt6Sd3g7aLX81khcdi')" >查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </Table>
    </el-card>
  </div>
</template>

<script>
import { getList } from '@/api/redBag'
import Table from '@/components/Table'
import uploadDialog from './uploadDialog'

export default {
  components: {
    Table,
    uploadDialog
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
    handleAddFileBtnClick() {
      this.$refs.uploadDialog.dialogVisible = true
    },
    refreshList() {
      console.log(12312312)
    },
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
    },
    open(hash) {
      window.open(`http://localhost:8080/ipfs/${hash}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .pagination {
    float: right;
    padding-top: 10px;
  }
  .btns {
    display: flex;
    justify-content: flex-end;
  }
</style>
