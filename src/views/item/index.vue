<template>
  <div class="app-container">
    <el-card style="margin-bottom: 20px;">
      <div class="btns"><el-button type="primary" size="small" class="m-b-20" @click="$router.push(`add`)">添加项目</el-button></div>
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
          <el-table-column label="项目名称" width="200" align="center">
            <template slot-scope="scope">
              <router-link target="_blank" :to="{ name: 'itemDetail', params: { id: scope.row.index }}">{{ scope.row.login_name }}</router-link>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="key" width="400">
            <template slot-scope="scope">
              <i class="el-icon-time"/>
              <span>{{ scope.row.index }}</span>
            </template>
          </el-table-column>
          <el-table-column label="研究者" width="200" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.login_name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="100" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.login_name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="mini"  @click="open(scope.index)" >公开</el-button>
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
    },
    open(row) {
      this.$confirm(
        '<strong>确定要公开此项目么？</strong><div style="color:#C0C0C0">公开后，所有用户均可查看</div>',
        "公开项目",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true
        }
      )
        .then(() => {
          // const params = {
          //   uIds: row.id,
          // };
          //console.log(params);
          // return freezeUser(params).then(res => {
          //   if (Number(res.code) === 0) {
              this.$message.success("公开成功")
          //     this.$refs.table.fetchData();
          //   } else {
          //     this.$message.error(res.msg);
          //   }
          // })
        })
        .catch(() => {
          this.$message.info("已取消公开")
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
  .btns {
    display: flex;
    justify-content: flex-end;
  }
</style>
