<template>
  <div class="app-container">
    <!-- 只有主催者可以点击添加项目 -->
    <el-card v-if="roles == 'sponsor'" style="margin-bottom: 20px;">
      <div class="btns"><el-button type="primary" size="small" class="m-b-20" @click="$router.push(`add`)">添加项目</el-button></div>
    </el-card>
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
        <el-table-column label="项目名称" align="center">
          <template slot-scope="scope">
            <!-- 如果是研究者点击项目详情的时候需要输入key才可以访问项目进行上传文件,主催者可以直接进入 -->
            <span  v-if="roles == 'investigator'" ><el-button type="text" @click="open(scope.row.id)">{{ scope.row.project_name }}</el-button></span>
            <router-link v-else target="_blank" :to="{ name: 'itemDetail', params: { id: scope.row.id }}">{{ scope.row.project_name }}</router-link>
          </template>
        </el-table-column>
        <!-- 只有主催者可以看到key并复制给其他用户 -->
        <el-table-column v-if="roles == 'sponsor'" align="center" prop="created_at" label="key">
          <template slot-scope="scope">
            <span>{{ scope.row.key }}</span>
          </template>
        </el-table-column>
        <el-table-column label="研究者" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.loginName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span v-if = "scope.row.status == 0">完善资料中</span>
            <span v-else-if = "scope.row.status == 1">公开</span>
            <span v-else>未知状态</span>
          </template>
        </el-table-column>
      </el-table>
    </Table>
  </div>
</template>

<script>
import { getList } from '@/api/item'
import Table from '@/components/Table'
import { mapGetters } from 'vuex'


export default {
  components: {
    Table,
    ...mapGetters([
      'name',
      'roles'
    ])
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
    open(index) {
      this.$prompt('请输入项目Key', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        // this.$message({
        //   type: 'success',//error
        //   message: '你的邮箱是: ' + value
        // });
        this.$router.push({ name: 'itemDetail', params: { id: '123' }})
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });       
      });
    }
  },
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
