<template>
  <div class="app-container">
    <!-- 只有主催者可以点击添加项目 -->
    <el-card  style="margin-bottom: 20px;">
      <div v-if="token && roles == 'sponsor'" class="btns"><el-button type="primary" size="small" class="m-b-20" @click="$router.push(`add`)">添加项目</el-button></div>
      <Table :dataSource="getList">
        <el-table
          slot-scope="data"
          :data="data.tableData"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row>
          <el-table-column align="center" label="No." width="50">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>
          <el-table-column label="プロジェクト名" align="center">
            <template slot-scope="scope">
              {{ scope.row.project_name }}
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
          <el-table-column label="ステータス" align="center">
            <template slot-scope="scope">
              <span v-if = "scope.row.status == 0">進行中</span>
              <span v-else-if = "scope.row.status == 1">公開</span>
              <span v-else>不明</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button  v-if="roles == 'investigator'" type="text" size="small" @click="open(scope.row.id)">プレビュー</el-button>
                <router-link v-else target="_blank" :to="{ name: 'itemDetail', params: { id: scope.row.id }}">
                  <el-button  type="text" size="small" >プレビュー</el-button>
                </router-link>
              </template>
          </el-table-column>
        </el-table>
      </Table>
    </el-card>
  </div>
</template>

<script>
import { getList,verifyKey} from '@/api/item'
import Table from '@/components/Table'
import { mapGetters } from 'vuex'


export default {
  components: {
    Table
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'token'
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
  mounted() {
    console.log(111111, this.roles)
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
    open(id) {
      this.$prompt('プロジェクトキーを入力してください。', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: 'キャンセル',
      }).then(({ value }) => {
        const data = {
          projectId: id,
          key: value
        }
        if (!value) {
          return this.$message.error('プロジェクトキーを入力してください。！')
        }
        verifyKey(data).then((res) => {
          if (Number(res.code) === 0) {
            this.$message.success(res.msg)
            this.$router.push({ name: 'itemDetail', params: { id: id }})
          }else {
            this.$message.error(res.msg)
          }
        })
      }).catch((err) => {
        // debugger
      })
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
