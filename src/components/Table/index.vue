<template>
  <div v-loading="loading">
    <slot :tableData="tableData" />
    <div v-show="isShowPagination" class="pagebar">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100, 200, 300, 400]"
        :page-size="page.limit"
        :total="Number(total)"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="changeSize"
        @current-change="changePage" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataSource: {
      type: Function,
      default: () => {
        return null
      }
    },
    defaultPageSize: {
      type: Number,
      default: () => {
        return 10
      }
    }
  },
  data() {
    return {
      loading: false,
      isShowPagination: false,
      tableData: [],
      total: 0,
      page: {
        start: 0,
        limit: 10
      }
    }
  },
  computed: {
    currentPage() {
      return (this.page.start / this.page.limit) + 1
    }
  },
  mounted() {
    this.page.limit = this.defaultPageSize
    this.fetchData()
  },
  methods: {
    async fetchData(newParams) {
      if (this.dataSource.call) {
        this.loading = true
        const { results, total } = await this.dataSource({
          ...this.page,
          ...newParams
        })
        this.loading = false
        this.tableData = results
        this.total = total
        this.isShowPagination = total > 10
      }
    },
    changePage(index) {
      this.page.start = (index - 1) * this.page.limit
      this.fetchData()
    },
    changeSize(limit) {
      this.page.limit = limit
      this.fetchData()
    }
  }
}
</script>

<style scoped lang="scss">
.pagebar {
  display: flex;
  flex-direction: row-reverse;
  margin-top: 20px;
}
</style>
