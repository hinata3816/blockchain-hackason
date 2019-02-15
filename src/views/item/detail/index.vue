<template>
  <div class="app-container">
    <el-card style="margin-bottom: 20px;">
      <div class="btns">
        <el-button type="primary" size="small" class="m-b-20" @click="handleAddFileBtnClick">添加材料</el-button>
        <uploadDialog ref="uploadDialog" @refresh="refreshList" />
      </div>
      <Table :dataSource="resourcesList" ref="table">
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
          <el-table-column label="文件名称" align="left" width="200">
            <template slot-scope="scope">
              {{ scope.row.title }}
            </template>
          </el-table-column>
          <el-table-column label="描述" align="left">
            <template slot-scope="scope">
              {{ scope.row.description }}
            </template>
          </el-table-column>
          <el-table-column label="文件类型" align="center" width="200">
            <template slot-scope="scope">
              {{ scope.row.type | typeMap }}
            </template>
          </el-table-column>
          <el-table-column label="上传时间" align="center" width="200">
            <template slot-scope="scope">
              <i class="el-icon-time"/>
              <span>{{ scope.row.create_time }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="200">
            <template slot-scope="scope">
              <el-button type="primary" size="mini"  @click="open(scope.row.hash)" >查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </Table>
    </el-card>
  </div>
</template>

<script>
import { resourcesList } from '@/api/item'
import Table from '@/components/Table'
import uploadDialog from './uploadDialog'

export default {
  components: {
    Table,
    uploadDialog
  },
  filters: {
    typeMap(type) {
      const typeMap = {
        0: '研究笔记',
        1: '研究数据',
        2: '操作履历'
      }
      return typeMap[type] || type
    }
  },
  methods: {
    handleAddFileBtnClick() {
      this.$refs.uploadDialog.dialogVisible = true
    },
    refreshList() {
      console.log(12312312)
      this.$refs.table.changePage(1)
    },
    resourcesList(params) {
      return resourcesList({ ...params, projectId: this.$route.params.id}).then((res) => {
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
