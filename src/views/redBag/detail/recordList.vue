<template>
  <div class="record">
    <el-card>
      <div slot="header" style="text-align: left;">
        <span>红包分发记录</span>
      </div>
      <el-table
        :data="data"
        border
        fit
        highlight-current-row>
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <!-- <el-table-column label="流水" width="300" align="center">
          <template slot-scope="scope">
            {{ scope.row.index }}
          </template>
        </el-table-column> -->
        <el-table-column align="center" prop="created_at" label="时间" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"/>
            <span>{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="接收方" width="200" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.login_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="金额" align="center">
          <template slot-scope="scope">
            {{ Number(scope.row.cash).toFixed(2) }}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
