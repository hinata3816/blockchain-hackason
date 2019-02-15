<template>
  <div class="red-bag-detail" v-loading="loading">
    <el-card style="margin-bottom: 20px;">
      <div slot="header" style="text-align: left;">
        <span>基本信息</span>
      </div>
      <el-row>
        <el-col :span="8" :xs="24">
          <dl class="dl-horizontal">
            <dt>发送人：</dt>
            <dd>{{ detail.hbInfo.login_name }}</dd>
            <dt>链接：</dt>
            <dd>
              <el-button type="primary" size="mini" @click="copyToClipboard" >复制</el-button>
              <input type="file" @change="handleFileChange" ref="file" style="display: none">
            </dd>
          </dl>
        </el-col>
        <el-col :span="8" :xs="24">
          <dl class="dl-horizontal">
            <dt>时间：</dt>
            <dd>{{ detail.hbInfo.create_time }}</dd>
            <dt>总金额：</dt>
            <dd>{{ detail.hbInfo.cash }}YTA</dd>
          </dl>
        </el-col>
        <el-col :span="8" :xs="24">
          <dl class="dl-horizontal">
            <dt>个数（剩余/总数）：</dt>
            <dd>{{ detail.hbInfo.num - detail.hbInfo.receiveNum }}/{{ detail.hbInfo.num }}</dd>
            <dt>附言：</dt>
            <dd>{{ detail.hbInfo.describe || "(无)" }}</dd>
          </dl>
        </el-col>
      </el-row>
    </el-card>
    <RecordList :data="detail.receiveList"/>
  </div>
</template>

<script>
import { getDetail } from '@/api/redBag'
import { uploadFile } from '@/api/ipfs'
import RecordList from './recordList'

export default {
  components: {
    RecordList
  },
  data() {
    return {
      loading: false,
      detail: {
        hbInfo: {},
        receiveList: []
      }
    }
  },
  computed: {
    index() {
      return this.$route.params.index
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    copyToClipboard() {
      console.log(this)
      this.$refs.file.click()
    },
    handleFileChange (e) {
      const file = e.target.files[0]
      console.log(file)
      uploadFile(file).then(res => {
        console.log(res)
      }) 
    },
    async getDetail() {
      this.loading = true
      const res = await getDetail({ index: this.index })
      this.loading = false
      this.detail = res.data
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.red-bag-detail {
  padding: 20px;
}
</style>
